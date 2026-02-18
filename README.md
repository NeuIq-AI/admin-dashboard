# High-Performance Admin Dashboard

A performant and responsive **User Management Admin Dashboard** built with React, designed to handle large datasets (10,000+ users) efficiently without UI lag.

## 🚀 Tech Stack

- React (Latest)
- TypeScript
- Tailwind CSS
- React Router (for URL state sync)
- Virtualization (windowing for performance)

## 📌 Key Features

### ✅ Virtualized Data Grid
- Efficiently renders 10,000+ records
- Only visible rows are mounted (windowing)
- Smooth scrolling with no browser freeze

### ✅ URL-Synced State
Application state persists across refresh:

- `?q=jane` → Search query
- `?sort=name&order=asc` → Sorting state

Refreshing the page restores the exact same state.

### ✅ Debounced Global Search
- Filters by **Name** and **Email**
- 300ms debounce to prevent UI blocking

### ✅ Sorting
- Sort by Name, Email, or Status
- Works correctly on filtered results
- Synced with URL query parameters

### ✅ Optimistic UI Updates
- Toggle user status (Active / Inactive)
- Immediate UI update
- Simulated API delay (1 second)
- 10% random failure simulation
- Automatic rollback + Toast error message

### ✅ Light / Dark Mode
- Implemented using React Context
- Theme preference saved in localStorage
- Fully styled dark theme UI

## 📂 Project Structure
src/
├── components/
├── context/
├── hooks/
├── types/
└── App.tsx

## 📦 Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/NeuIq-AI/admin-dashboard.git

### 2️⃣ Navigate to Project
cd admin-dashboard

### 3️⃣ Install Dependencies
npm install

### 4️⃣ Run Development Server
npm run dev

Open the URL shown in the terminal (usually `http://localhost:5173`).
