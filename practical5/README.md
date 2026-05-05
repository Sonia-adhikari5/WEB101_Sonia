# Practical 5 – Infinite Scroll (TikTok Clone)

## Overview
This practical focuses on implementing infinite scrolling in a TikTok-style video feed using cursor-based pagination on the backend and TanStack React Query on the frontend.

The goal was to improve performance and user experience by loading videos dynamically as the user scrolls instead of loading all data at once.

---

## Technologies Used
- Frontend: Next.js (App Router), React
- Backend: Node.js, Express
- Database: PostgreSQL with Prisma ORM
- Data Fetching: TanStack React Query
- Other Tools: Intersection Observer API, Axios

---

## Key Concepts Learned

### Cursor-Based Pagination
Instead of offset-based pagination, cursor-based pagination fetches data after a specific item (cursor). This prevents duplication or skipping when new data is added.

### Infinite Scrolling
Data is loaded automatically when the user reaches the bottom of the page using the Intersection Observer API.

### TanStack React Query
Used for handling API calls, caching, and managing infinite queries with better performance and cleaner code.

---

## Implementation Steps

### Backend Changes
- Updated getAllVideos to support:
  - limit
  - cursor
- Implemented the n+1 pattern (limit + 1) to detect next page
- Returned response format:

{
"videos": [...],
"nextCursor": 10,
"hasNextPage": true
}


- Created getFollowingVideos for followed users
- Updated routes to include /following

---

### Frontend Changes
- Installed required packages:

npm install @tanstack/react-query @tanstack/react-query-devtools


- Created QueryProvider to wrap the app
- Updated videoService.js to accept pageParam
- Created useIntersectionObserver hook
- Updated VideoFeed.jsx to use useInfiniteQuery

---

## Challenges Faced

### Duplicate RootLayout Error
Encountered an error where RootLayout was defined multiple times.

Solution:
- Removed duplicate function
- Combined all providers into a single layout file

---

### Cursor Type Issues
The backend failed because the cursor was treated as a string.

Solution:
- Converted cursor using parseInt() since database IDs are integers

---

### Mismatched Field Names
There was confusion between profilePicture and avatar.

Solution:
- Checked schema.prisma
- Updated all references to use avatar

---

### Mixing Module Systems
Used both export and exports in the same file.

Solution:
- Standardized everything to CommonJS (exports.functionName)

---

### Infinite Scroll Not Triggering
The next page was not loading.

Solution:
- Fixed Intersection Observer setup
- Added sentinel div with height
- Ensured getNextPageParam returns undefined correctly

---

### React Query Setup Confusion
Had difficulty understanding how useInfiniteQuery works.

Solution:
- Learned how pageParam flows between requests
- Used React Query DevTools for debugging

---

## Outcome
- Successfully implemented infinite scrolling
- Improved performance and user experience
- Gained understanding of modern data fetching techniques

---

## Conclusion
This practical helped in understanding how real-world applications handle large datasets efficiently. It demonstrated how frontend and backend must work together to implement features like infinite scrolling and improved understanding of React Query and API design.

---

## References
- TanStack React Query Documentation
- Prisma Documentation
- Next.js Documentation
- MDN Web Docs (Intersection Observer API)