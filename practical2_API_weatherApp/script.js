// Configuration and Constants
const WEATHER_API_KEY = 'cfc2030841ca18cf127456a3eeea1a90'; 
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const PLACEHOLDER_API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Global state
let savedLocations = [];

// DOM ready
document.addEventListener('DOMContentLoaded', () => {

const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {

tab.addEventListener('click', () => {

const tabId = tab.getAttribute('data-tab');

tabs.forEach(t => t.classList.remove('active'));
tab.classList.add('active');

document.querySelectorAll('.tab-content').forEach(content => {
content.classList.remove('active');
});

document.getElementById(`${tabId}-tab`).classList.add('active');

});

});

document.getElementById('get-weather').addEventListener('click', getWeather);
document.getElementById('save-location').addEventListener('click', saveLocation);

document.getElementById('update-location').addEventListener('click', updateLocation);

document.getElementById('cancel-edit').addEventListener('click', () => {
document.getElementById('edit-modal').style.display = 'none';
});

fetchSavedLocations();

});

function displayResponseInfo(method, url, status, data) {

const responseInfo = document.getElementById('response-info');

responseInfo.textContent =
`Method: ${method}
URL: ${url}
Status: ${status}
Timestamp: ${new Date().toLocaleString()}

Data:
${JSON.stringify(data,null,2)}
`;

}

// GET Weather
async function getWeather() {

const city = document.getElementById('city-input').value;

if(!city){
alert('Please enter a city name');
return;
}

const url = `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

try{

const response = await fetch(url);
const data = await response.json();

displayResponseInfo("GET", url, response.status, data);

if(response.ok){

displayWeather(data);

}else{

document.getElementById('weather-result').innerHTML =
`<p>Error: ${data.message}</p>`;

}

}catch(error){

document.getElementById('weather-result').innerHTML =
`<p>Error fetching weather data</p>`;

}

}

function displayWeather(data){

const container = document.getElementById('weather-result');

container.innerHTML = `
<div class="weather-card">

<h3>${data.name}, ${data.sys.country}</h3>

<p><strong>Temperature:</strong> ${data.main.temp} °C</p>

<p><strong>Weather:</strong> ${data.weather[0].description}</p>

<p><strong>Humidity:</strong> ${data.main.humidity}%</p>

<p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

</div>
`;

}

async function saveLocation(){

const name = document.getElementById('location-name').value;
const city = document.getElementById('location-city').value;
const country = document.getElementById('location-country').value;
const notes = document.getElementById('location-notes').value;

const locationData = {
name,
city,
country,
notes
};

try{

const response = await fetch(PLACEHOLDER_API_URL, {

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify(locationData)

});

const data = await response.json();

displayResponseInfo("POST", PLACEHOLDER_API_URL, response.status, data);

savedLocations.push({...locationData,id:data.id});

renderSavedLocations();

}catch(error){

alert('Error saving location');

}

}

async function fetchSavedLocations(){

try{

const response = await fetch(PLACEHOLDER_API_URL + '?_limit=4');

const data = await response.json();

savedLocations = data.map(item => ({
id:item.id,
name:item.title || "Location",
city:"Unknown",
country:"Unknown",
notes:"Imported"
}));

renderSavedLocations();

}catch(error){

console.log("Error fetching locations");

}

}

function renderSavedLocations(){

const container = document.getElementById('saved-locations');

container.innerHTML = '';

savedLocations.forEach(location => {

const div = document.createElement('div');

div.className = 'location-item';

div.innerHTML = `
<h4>${location.name}</h4>

<p><strong>City:</strong> ${location.city}</p>

<p><strong>Country:</strong> ${location.country}</p>

<p>${location.notes}</p>

<div class="location-actions">

<button class="btn-edit" onclick="openEditModal(${location.id})">Edit</button>

<button class="btn-delete" onclick="deleteLocation(${location.id})">Delete</button>

</div>
`;

container.appendChild(div);

});

}

function openEditModal(id){

const location = savedLocations.find(loc => loc.id === id);

if(!location) return;

document.getElementById('edit-id').value = location.id;
document.getElementById('edit-name').value = location.name;
document.getElementById('edit-city').value = location.city;
document.getElementById('edit-country').value = location.country;
document.getElementById('edit-notes').value = location.notes;

document.getElementById('edit-modal').style.display = 'block';

}

async function updateLocation(){

const id = document.getElementById('edit-id').value;

const updatedData = {

name: document.getElementById('edit-name').value,
city: document.getElementById('edit-city').value,
country: document.getElementById('edit-country').value,
notes: document.getElementById('edit-notes').value

};

const url = `${PLACEHOLDER_API_URL}/${id}`;

try{

const response = await fetch(url,{

method:'PUT',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify(updatedData)

});

const data = await response.json();

displayResponseInfo("PUT", url, response.status, data);

const index = savedLocations.findIndex(loc => loc.id == id);

savedLocations[index] = {id,...updatedData};

renderSavedLocations();

document.getElementById('edit-modal').style.display = 'none';

}catch(error){

alert("Error updating location");

}

}

async function deleteLocation(id){

const url = `${PLACEHOLDER_API_URL}/${id}`;

try{

const response = await fetch(url,{
method:'DELETE'
});

displayResponseInfo("DELETE", url, response.status, {id});

savedLocations = savedLocations.filter(loc => loc.id !== id);

renderSavedLocations();

}catch(error){

alert("Error deleting location");

}

}

