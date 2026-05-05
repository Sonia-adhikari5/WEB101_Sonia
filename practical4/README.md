# Practical 4: Connecting TikTok Frontend to Backend

## Overview

This practical focused on connecting the Next.js frontend (WEB101) to the Express.js backend (WEB102) built in previous practicals. The goal was to implement user authentication, video display, and social interactions such as following users and viewing personalized feeds.

---

## What Was Implemented

### Part 1: API Configuration and Authentication

- Created a centralized Axios API client at `src/lib/api-config.js` with request and response interceptors to automatically attach JWT tokens to every request and handle token expiration (401 errors).
- Set up environment variables in `.env.local` to store the backend API URL.
- Created an `AuthContext` at `src/contexts/authContext.jsx` to manage global authentication state (user login/logout/register) using React Context API and `jwt-decode`.
- Wrapped the entire app with `AuthProvider` in `src/app/layout.js` and added `react-hot-toast` for notifications.
- Built reusable UI components for authentication: `Modal.jsx`, `AuthForms.jsx` (login and register forms), and `AuthModal.jsx`.
- Updated `MainLayout.jsx` to conditionally show Login/Sign Up or Logout buttons based on authentication state, and to show protected navigation links (Following, Upload) only when logged in.

### Part 2: Video Feed Integration

- Created `src/services/videoService.js` to handle all video-related API calls (fetch all videos, fetch following feed, like/unlike, comments).
- Created `src/services/userService.js` to handle all user-related API calls (get profile, follow/unfollow, get followers/following).
- Updated `VideoCard.jsx` to display real video data from the backend with working like/unlike functionality.
- Updated `VideoFeed.jsx` to fetch and display real videos from the backend with proper loading and error states.

### Part 3: User Discovery, Following, and Upload

- Created `src/app/following/page.jsx` — a personalized feed showing videos only from followed users.
- Created `src/app/explore-users/page.jsx` — a page to discover and follow/unfollow other users.
- Created `src/app/profile/[userId]/page.jsx` — a dynamic profile page showing a user's info and their videos.
- Created `src/app/upload/page.jsx` with a full upload form supporting video and thumbnail file selection with preview.
- Created `src/services/uploadService.js` to send video files to the backend using `multipart/form-data`.
- Updated the backend `videoController.js` to handle file uploads using `multer`, saving files to an `uploads/` folder and storing the file URL in the PostgreSQL database via Prisma.
- Added `multer` middleware at `src/middleware/upload.js` in the backend.
- Configured the backend to serve uploaded files statically via `app.use('/uploads', express.static('uploads'))`.

---

## Difficulties Faced and How They Were Resolved

### 1. Working in the Wrong Project Folder

**Problem:** At the start of the practical, `npm install` was accidentally run inside a newly created `practical4` folder instead of the existing TikTok frontend project (`practical1`). This meant all new files were created in the wrong location, causing repeated "Module not found" errors when the app was run from `practical1`.

**Resolution:** All files created in `practical4` were moved into the correct `practical1` folder. The packages were reinstalled inside `practical1` using `npm install axios jwt-decode react-hot-toast`. The empty `practical4` folder was then deleted.

### 2. Wrong Backend Port in Environment Variables

**Problem:** The `.env.local` file was initially empty, so the frontend was trying to reach the backend at the wrong address, causing all API calls to fail silently with "Failed to load videos" on the home page.

**Resolution:** The correct backend URL was added to `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
The frontend was restarted after the change for it to take effect.

### 3. Auth Routes Not Found (404)

**Problem:** The `authContext.jsx` was calling `/auth/login` and `/auth/register`, but the backend had no `/api/auth` routes. Login and registration returned 404 errors.

**Resolution:** By inspecting `userRoutes.js`, it was found that the auth routes were registered under `/api/users`. The API calls in `authContext.jsx` were updated to `/users/login` and `/users/register`.

### 4. File Capitalisation Issues on Windows

**Problem:** Files such as `AuthForms.jsx` were saved with lowercase names (`authforms.jsx`) due to Windows being case-insensitive. Next.js on the other hand is case-sensitive in its module resolution, causing "Module not found" errors even though the file appeared to exist.

**Resolution:** The affected files were deleted and recreated with the correct capitalised names (`AuthForms.jsx`, `AuthModal.jsx`) to force the file system to register the correct casing.

### 5. Video Upload — Backend Expected URL, Not File

**Problem:** The original `createVideo` function in `videoController.js` expected `{ title, description, url, thumbnail }` as plain text fields in the request body. The frontend upload form was sending a `multipart/form-data` request with actual video files, causing a 500 server error.

**Resolution:** The backend was updated to support file uploads using `multer`. A new middleware file `src/middleware/upload.js` was created to configure `multer` with disk storage. The `videoRoutes.js` was updated to apply the multer middleware on the POST `/api/videos` route. The `createVideo` controller was updated to read the uploaded file from `req.files`, construct a localhost URL for the file, and store it in the database using Prisma.

### 6. `router.push()` Called During Render

**Problem:** The upload page was calling `router.push('/')` directly inside the component body when the user was not authenticated. This caused a React error: "Cannot update a component while rendering a different component."

**Resolution:** The redirect was moved into a `useEffect` hook so it only runs after the component has rendered:
```jsx
useEffect(() => {
  if (!user) router.push('/');
}, [user]);

if (!user) return null;
```

### 7. Prisma Schema Field Mismatch

**Problem:** The frontend and updated backend code were using field names like `caption` and `videoUrl`, but the Prisma schema defined the Video model with fields `title`, `description`, `url`, and `thumbnail`. This caused Prisma errors when trying to create a video.

**Resolution:** The Prisma schema was checked and all field names in the controller and frontend service were aligned to match exactly — using `title`, `description`, `url`, and `thumbnail`.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework |
| React Context API | Global authentication state |
| Axios | HTTP client for API calls |
| jwt-decode | Decoding JWT tokens on the frontend |
| react-hot-toast | User notification toasts |
| react-icons | UI icons for the upload page |
| Express.js | Backend API framework |
| Prisma ORM | Database access layer |
| PostgreSQL | Relational database |
| Multer | File upload middleware for Node.js |
| JSON Web Tokens (JWT) | Authentication tokens |

---

## How to Run

### Backend (WEB102)
```bash
cd WEB102_Sonia/practical4/server
npm run dev
# Server runs on http://localhost:5000
```

### Frontend (WEB101)
```bash
cd WEB101_Sonia/practical1
npm run dev
# App runs on http://localhost:3000
```

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Axios Documentation](https://axios-http.com/)
- [JWT Authentication](https://jwt.io/)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Multer Documentation](https://github.com/expressjs/multer)
