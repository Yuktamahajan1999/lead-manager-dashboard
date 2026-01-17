🚀 LeadFlow CRM - Lead Management Dashboard
A modern, high-performance Lead Management System designed to handle over 1,000 leads efficiently. This project features advanced filtering, debounced search, and real-time analytics.

✨ Key Features
Dynamic Analytics Cards: The top of the dashboard displays live counts for Total, Converted, and Lost leads.

Advanced Leads Table: Clean UI with status-based color coding (New, Converted, Lost, Contacted).

Smart Search (Debounced): Instead of calling the API on every single keypress, the search triggers 500ms after the user stops typing (Performance Optimization).

Server-Side Pagination: An efficient pagination system designed to load 1,000+ leads without UI lag.

Responsive Design: Optimized for both Desktop and Mobile using Tailwind CSS v4.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS v4, Lucide Icons, Axios.

Backend: Node.js, Express.js.

Database: MongoDB.

API Architecture: Centralized Axios Instance with Request Interceptors for token management.

🚀 Getting Started
1. Backend Setup
cd backend
npm install
npm run seed  # To generate 1,000 dummy leads
npm start     # Runs on http://localhost:3000

2. Frontend Setup
cd frontend
npm install
npm run dev    # Runs on http://localhost:5173

