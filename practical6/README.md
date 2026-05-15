# Practical 6 – State Management with Zustand
### Todo List Application Report

---

## Project Overview

This practical involved building a **Todo List application** using **React** and **Zustand** as the state management library. The goal was to understand how Zustand simplifies state sharing across components compared to traditional approaches like prop drilling or the Context API.

**Tech Stack:** React + Vite, Zustand, CSS

---

## What Was Built

A fully functional Todo List app with the following features:

- Add new todos via a text input
- Mark todos as complete/incomplete using checkboxes
- Delete individual todos
- Clear all completed todos at once
- View live counts of total and completed todos
- **Persistence** — todos are saved to `localStorage` and survive page refreshes

---

## Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx      # Input form for adding todos
│   ├── TodoItem.jsx       # Single todo row with checkbox & delete
│   └── TodoList.jsx       # Renders all todos + clear button
├── store/
│   └── todoStore.js       # Zustand store (state + actions)
├── App.jsx                # Root component with stats display
└── App.css                # Styling
```

---

## Steps Followed

1. Scaffolded the project using `create-vite` with the React template
2. Installed Zustand via npm
3. Created the store in `todoStore.js` with four actions: `addTodo`, `toggleTodo`, `removeTodo`, `clearCompleted`
4. Built the `TodoInput` component (controlled input, form submit handler)
5. Built the `TodoItem` component (checkbox toggle, delete button)
6. Built the `TodoList` component (renders list, conditional "Clear Completed" button)
7. Wired everything together in `App.jsx` with live stats
8. Added the `persist` middleware from `zustand/middleware` to save state to `localStorage`

---

## Key Concepts Understood

**Zustand vs Context API:**
Zustand doesn't require wrapping the app in a Provider. Any component can call `useTodoStore()` and subscribe to just the slice of state it needs. This means less boilerplate and more targeted re-renders.

**Selectors:**
Instead of pulling the entire store, each component selects only what it needs:
```js
const addTodo = useTodoStore(state => state.addTodo)
```
This prevents unnecessary re-renders in components that don't care about the changed state.

**The `set` function:**
Zustand's `set` receives a callback with the current state and returns the updated slice — similar to `setState` in class components but more flexible.

**Persist Middleware:**
Wrapping the store in `persist(...)` with a `name` key automatically handles reading from and writing to `localStorage`. No manual `useEffect` or `JSON.stringify` needed.

---

## Difficulties Faced and How I Overcame Them

### 1. `App.jsx` already existed — couldn't create the file
When trying to create `App.jsx`, Vite had already generated it as part of the template. Attempting to write the file failed with a "file already exists" error.

**Solution:** Used a shell `cat >` overwrite command instead of the file creation tool, which replaced the template content with the correct App component.

---

### 2. Understanding when to use `persist` vs basic `create`
The practical introduced `persist` only in Step 8 as an enhancement, but it wasn't immediately clear whether to start without it and refactor, or jump straight to the persisted version.

**Solution:** Built the store directly with `persist` from the start, since it's a wrapper around the same logic. This avoided having to rewrite `todoStore.js` twice and made the final result cleaner.

---

### 3. `clearCompleted` showing even when no todos are completed
In the initial `TodoList` implementation, the "Clear Completed" button was shown whenever `todos.length > 0`, meaning it appeared even if nothing was actually completed.

**Solution:** Changed the condition to `todos.some(todo => todo.completed)`, so the button only appears when there's at least one completed todo to clear.

---

### 4. Vite's default template imports conflicting with the new structure
Vite's generated `App.jsx` imported its own CSS and included demo content (Vite/React logos, counter component). Leaving these in caused style conflicts and unused import warnings during the build.

**Solution:** Replaced the entire file and removed `index.css` import references that no longer matched, keeping only `App.css`.

---

## Build Output

```
✓ 25 modules transformed
dist/index.html         0.46 kB
dist/assets/index.css   3.48 kB
dist/assets/index.js  195.41 kB

✓ built in 543ms — 0 errors, 0 warnings
```

---

## How to Run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Reflection

Zustand lives up to its reputation as a lightweight state manager. The entire global state for this app — including four actions — fits in under 30 lines. Compared to setting up Context with a reducer and Provider, the difference in boilerplate is significant. The `persist` middleware was particularly impressive: one wrapper and a name string was all it took to add localStorage persistence with zero extra code.
