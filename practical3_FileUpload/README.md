# Next.js File Upload Project

This project was created using **Next.js** with the `create-next-app` setup.

##  File Upload System

This application demonstrates how to build a robust file upload feature using React and Next.js. It covers handling multipart form submissions, validating uploaded files, tracking upload progress, and implementing a drag-and-drop interface. The project includes both client-side components and backend API routes to manage file uploads efficiently.

##  Functionality Overview

✔ Handles multipart/form-data requests  
✔ Restricts allowed file types (JPEG, PNG, PDF)  
✔ Limits file size to 5MB  
✔ Displays upload progress in real time  
✔ Supports drag-and-drop file selection  
✔ Shows previews for image files  
✔ Allows multiple files to be uploaded together  
✔ Uses a serverless API route for processing uploads  

##  Libraries Used

- **react-hook-form** – for managing form state and validation  
- **react-dropzone** – for implementing drag-and-drop uploads  
- **axios** – for sending HTTP requests with progress tracking  
- **formidable** – for parsing uploaded files on the server  

##  Requirements

Before running the project, ensure you have:

- Node.js (v14 or higher)  
- A package manager (npm, yarn, pnpm, or bun)  
- Git installed  

##  Running the App

Start the development server with one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
After that, open your browser and go to:
http://localhost:3000

🔤 Font Optimization

The project uses Next.js built-in font optimization via next/font to load the Geist font from Vercel.

📚 Learn More

To explore more about Next.js, visit:

https://nextjs.org/docs
https://nextjs.org/learn
