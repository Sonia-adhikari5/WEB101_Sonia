# Practical Report 1 – WEB101

## Purpose of the Practical

1. This practical focuses on building a basic web application using Next.js and React.
2. It helps in understanding routing, component structure, and modern frontend development.
3. It also introduces Tailwind CSS for styling and React Hook Form for handling forms.

---

## Instructions and Solutions

### 1. Project Setup

#### 1.1 Creating the Project

* **Task:** Create a new Next.js project using the terminal.
* **Task:** Configure the project with ESLint, Tailwind CSS, and App Router.

**Solution:**

The project was created using the following command:

npx create-next-app@latest my-project --typescript --eslint --app

During setup, the required options such as Tailwind CSS and App Router were selected to match the assignment requirements.

---

#### 1.2 Installing Dependencies

* **Task:** Install required packages such as react-icons and react-hook-form.

**Solution:**

The following commands were used:

npm install react-icons  
npm install react-hook-form  

These packages were used for icons and form handling.

---

### 2. Layout and Navigation

#### 2.1 Main Layout

* **Task:** Create a MainLayout component to structure the application.
* **Task:** Add navigation links such as Home, Profile, and Upload.

**Solution:**

A MainLayout component was created inside the components folder. This layout includes a header with navigation links and a main section where page content is displayed.

---

#### 2.2 Routing Pages

* **Task:** Create multiple pages using the App Router.
* **Task:** Implement pages such as Profile and Upload.

**Solution:**

Pages were created inside the app directory using the folder-based routing system. Each folder contains a page.jsx file which represents a route.

For example:
- profile/page.jsx → /profile  
- upload/page.jsx → /upload  

---

### 3. UI Components

#### 3.1 Video Components

* **Task:** Create a VideoCard component to represent individual videos.
* **Task:** Create a VideoFeed component to display multiple videos.

**Solution:**

Reusable components were created to display video content. VideoCard represents a single video, while VideoFeed displays multiple VideoCard components in a list format.

---

### 4. Forms

#### 4.1 Login and Signup

* **Task:** Create login and signup forms using react-hook-form.
* **Task:** Implement validation such as required fields and password checks.

**Solution:**

Forms were created using react-hook-form. Input fields were registered and validated using built-in validation methods such as required and minimum length.

---

## Project Structure

src/  
 ├ app/  
 │   ├ page.js  
 │   ├ layout.js  
 │   ├ profile/page.jsx  
 │   ├ upload/page.jsx  
 │   ├ following/page.jsx  
 │   ├ explore/page.jsx  
 │   ├ live/page.jsx  
 │   ├ login/page.jsx  
 │   ├ signup/page.jsx  
 │  
 ├ components/  
 │   ├ layout/MainLayout.jsx  
 │   ├ ui/VideoCard.jsx  
 │   ├ ui/VideoFeed.jsx  

---

## Conclusion

This practical demonstrates the fundamentals of building a web application using Next.js. It shows how routing, components, and styling can be combined to create a functional and structured user interface.