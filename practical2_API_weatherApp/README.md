# Practical Report 2 – WEB101

## Purpose of the Practical

1. This practical focuses on developing a RESTful web application using JavaScript.
2. It helps in understanding how to interact with external APIs using HTTP methods such as GET, POST, PUT, and DELETE.
3. It introduces real-time data fetching using the OpenWeatherMap API.
4. It also demonstrates how to simulate database operations using JSONPlaceholder API.
5. The practical enhances knowledge of frontend development using HTML, CSS, and JavaScript.

---

## Instructions and Solutions

### 1. Project Setup

#### 1.1 Creating the Project Structure

* **Task:** Create a folder for the project and set up required files.

**Solution:**

A new project folder was created containing the following files:

- index.html → Used for building the user interface
- script.js → Used for implementing all JavaScript logic and API interactions

This structure ensures separation between UI and functionality.

---

#### 1.2 Understanding APIs Used

* **Task:** Identify and understand the APIs required for the application.

**Solution:**

Two APIs were used in this project:

1. **OpenWeatherMap API**
   - Used to fetch real-time weather data
   - Implements the GET request

2. **JSONPlaceholder API**
   - Used to simulate database operations
   - Implements POST, PUT, and DELETE requests

---

### 2. HTML Structure and User Interface

#### 2.1 Layout Design

* **Task:** Create a structured user interface for the application.

**Solution:**

The HTML file was designed with:

- A header section for the application title
- A tab-based navigation system
- Separate sections for each API operation
- Input fields and buttons for user interaction
- Display areas for showing results dynamically

---

#### 2.2 Tab Navigation

* **Task:** Implement tab-based navigation.

**Solution:**

Tabs were created to switch between:

- GET Weather
- POST Location
- Manage Locations (PUT & DELETE)

JavaScript functions were used to toggle visibility between sections.

---

### 3. JavaScript Functionality

#### 3.1 Event Handling

* **Task:** Handle user interactions.

**Solution:**

Event listeners were implemented using onclick functions to:

- Fetch weather data
- Save locations
- Edit existing data
- Delete entries

---

#### 3.2 GET Request (Weather Data)

* **Task:** Retrieve weather information using API.

**Solution:**

The OpenWeatherMap API was used to fetch weather data based on user input.

Steps:
- User enters a city name
- API request is sent using fetch()
- Response is converted to JSON
- Data is displayed dynamically on the webpage

---

#### 3.3 POST Request (Save Location)

* **Task:** Save a new location.

**Solution:**

The JSONPlaceholder API was used to simulate saving data.

Steps:
- User enters location details
- Data is sent using POST request
- Response is displayed and added to UI

---

#### 3.4 PUT Request (Update Location)

* **Task:** Edit existing location.

**Solution:**

A modal was implemented for editing.

Steps:
- User clicks Edit button
- Modal opens with existing data
- Updated data is sent using PUT request
- UI is updated accordingly

---

#### 3.5 DELETE Request (Remove Location)

* **Task:** Delete a saved location.

**Solution:**

Steps:
- User clicks Delete button
- DELETE request is sent to API
- Item is removed from UI

---

### 4. UI Features

#### 4.1 Dynamic Content Rendering

* Data is displayed dynamically using JavaScript DOM manipulation.
* Cards are created for each saved location.

#### 4.2 Modal Implementation

* A modal window is used for editing data.
* Improves user experience and interaction.

---

## Project Structure

project-folder/
│
├── index.html # User Interface
├── script.js # Application Logic


---

## Conclusion

This practical demonstrates how RESTful APIs can be integrated into a web application. It provides hands-on experience with HTTP methods and dynamic UI updates.

The project successfully combines frontend development with real-time data interaction, making it a strong foundation for understanding modern web applications.
