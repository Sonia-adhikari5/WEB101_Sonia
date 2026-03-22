# Reflection on Practical 2 – WEB101

This document presents my reflection on the Weather API practical. It explains what I learned, the challenges I encountered, and how I resolved them.

---

### 1. Understanding RESTful APIs

#### What I Learned

I learned how RESTful APIs work and how different HTTP methods such as GET, POST, PUT, and DELETE are used in real-world applications. I also understood how APIs allow communication between frontend applications and external services.

#### Challenges Faced

Initially, I found it difficult to understand the difference between each HTTP method and when to use them. The concept of sending and receiving JSON data was also confusing.

#### How I Overcame Them

I reviewed examples and practiced using fetch() multiple times. By testing each request separately, I was able to clearly understand how each method works.

---

### 2. Working with the OpenWeatherMap API

#### What I Learned

I learned how to fetch real-time weather data using an external API. I also understood how API keys are used for authentication and how to structure API requests.

#### Challenges Faced

I faced issues with incorrect API responses due to missing or invalid API keys. Sometimes the data was not displayed correctly.

#### How I Overcame Them

I carefully checked the API key and ensured it was correctly added in the code. I also used console.log() to debug and understand the API response structure.

---

### 3. Implementing CRUD Operations

#### What I Learned

I learned how to perform Create, Read, Update, and Delete operations using JavaScript. This helped me understand how web applications manage data.

#### Challenges Faced

The PUT and DELETE operations were confusing, especially updating the UI after making changes. I also struggled with tracking which item needed to be edited.

#### How I Overcame Them

I implemented an ID system and used variables to track the selected item. I also improved my understanding of DOM manipulation to update elements dynamically.

---

### 4. User Interface Design

#### What I Learned

I learned how to design a simple and functional user interface using HTML and CSS. I also understood how tab navigation improves user experience.

#### Challenges Faced

I found it difficult to manage multiple sections on one page. Ensuring only one tab is active at a time was also challenging.

#### How I Overcame Them

I used JavaScript to control visibility of sections. By adding and removing classes, I was able to manage tab switching effectively.

---

### 5. Debugging and Problem Solving

#### What I Learned

I learned how to debug JavaScript code using browser developer tools. I understood the importance of checking errors and testing code step-by-step.

#### Challenges Faced

There were multiple errors related to API calls, incorrect data handling, and UI updates. It was sometimes difficult to identify the exact problem.

#### How I Overcame Them

I used console logs and error messages to trace issues. Breaking down the code into smaller parts helped me identify and fix problems more efficiently.

---

### Overall Reflection

This practical helped me gain a strong understanding of how web applications interact with APIs. I learned how to implement different HTTP methods and update the UI dynamically.

Although I faced several challenges, especially with API integration and debugging, I was able to overcome them through practice and persistence.

---

### Future Improvements

In the future, I would like to:

- Improve UI design using advanced CSS frameworks
- Add better error handling for API requests
- Store data using a real database instead of a mock API
- Enhance user experience with animations and feedback messages

This practical has helped build a solid foundation for developing more advanced web applications.