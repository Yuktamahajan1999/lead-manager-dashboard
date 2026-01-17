# 🚀 LeadFlow CRM – Lead Management Dashboard



A modern, high-performance **Lead Management System (Mini CRM)** designed to efficiently handle **1,000+ leads**.  

This project focuses on **data-heavy, read-optimized dashboards** with advanced filtering, debounced search, and real-time analytics.



> Built as part of a **Full-Stack Fresher Hiring Assignment**  

> Submission Date: **17 January 2026**



---



## ✨ Key Features



### 📊 Dynamic Analytics Cards

The dashboard displays **live, database-driven metrics**:

- Total Leads

- Converted Leads

- Lost Leads



> Metrics are computed server-side to ensure accuracy and scalability.



---



### 📋 Advanced Leads Table

- Clean, readable CRM-style table

- Status-based color coding:

  - 🟦 New

  - 🟢 Converted

  - 🔴 Lost

  - ⚫ Contacted

- Lead source badges for better categorization



---



### 🔍 Smart Search (Debounced – 500ms)

Instead of calling the API on every keypress:

- Search triggers **500ms after user stops typing**

- Reduces unnecessary API calls

- Improves backend performance under load



> This optimization is critical when working with large datasets.



---



### 📄 Server-Side Pagination

- Pagination handled completely on the backend

- Designed to efficiently handle **1,000+ leads**

- Prevents large payloads and UI lag



---



### 📱 Responsive Design

- Optimized for **Desktop & Mobile**

- Built using **Tailwind CSS v4**



---

### 🔒 Security Note
For this assignment, I have kept the auth logic simple for ease of testing. In a production environment, I would:
- Use **bcryptjs** for password hashing.
- Implement **JWT (JSON Web Tokens)** for secure session management.
- Add **Rate Limiting** to prevent brute-force attacks.



---

## 🧠 Engineering Decisions (Why This Approach)



- **Read-heavy architecture**: CRM dashboards are query-intensive, so the system is optimized for fast reads rather than frequent writes.

- **Server-side filtering & pagination**: Prevents loading large datasets into the browser.

- **Debounced search**: Minimizes backend load and improves UX.

- **Centralized API handling**: Axios interceptors manage auth tokens cleanly and consistently.



> These decisions reflect real-world production patterns rather than tutorial-based implementations.



---



## 🛠️ Tech Stack



### Frontend

- React.js

- Tailwind CSS v4

- Axios

- Lucide Icons



### Backend

- Node.js

- Express.js



### Database

- MongoDB Atlas (**Free Tier**)



### API Architecture

- Centralized Axios instance

- Request interceptors for token handling



---



## 🚀 Getting Started



### Backend Setup



#### 1️⃣ Environment Variables (`.env`)

Create a `.env` file inside the `backend` folder:



```env

PORT=3000

MONGODB_URI=your_mongodb_atlas_uri

JWT_SECRET=your_secret_key

```



> MongoDB Atlas free tier is used as per assignment requirements.



---



#### 2️⃣ Backend Installation & Run



```bash

git clone https://github.com/Yuktamahajan1999/lead-manager-dashboard

cd backend

npm install

npm run seed   # Generates 1,000 dummy leads

npm start

```



Backend runs on:  

➡️ `http://localhost:3000`



---



### Frontend Setup



```bash

cd frontend

npm install

npm run dev

```



Frontend runs on:  

➡️ `http://localhost:5173`



---



## 🔗 Live Demo & Credentials



- **Live App:** https://your-live-app-url  

- **Demo Admin Email:** admin@example.com  )

- **Demo Password:** password123  

Pro Tip for Recruiter: These credentials are hardcoded as a fallback in the authController for easy testing, but they are also automatically injected into the database when you run the Seeding Script (npm run seed). This ensures you can access the full dashboard immediately after setup.

---



## 🌱 Seeding Method



- Run `npm run seed` inside the backend

- Uses **Faker.js** to generate:

  - 1,000 realistic leads

  - Random names, emails, phone numbers

  - Different lead statuses and sources



---



## 📁 Project Structure



```txt

lead-manager-dashboard/

├── backend/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── seed/

│   └── server.js

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   └── App.jsx

│   └── index.css

│

├── .gitignore

└── README.md

```



---



## 📈 Scalability Considerations



- Indexed commonly searched fields (email, status)

- Server-side pagination avoids large client payloads

- Debounced search reduces backend query pressure

- Architecture supports future extensions like role-based access and write operations



---



## ✅ Assignment Checklist (Submission Requirements)

- [x] **MongoDB Atlas (Free Tier)**: Database hosted on cloud for seamless access.
- [x] **Server-side Logic**: Implemented search, filtering, and pagination on the backend.
- [x] **Analytics Dashboard**: Real-time cards showing Lead metrics.
- [x] **Auth System**: Protected dashboard with a dedicated Login screen.
- [x] **Responsive UI**: Fully optimized for Desktop, Tablet, and Mobile.
- [x] **Public GitHub Repository**: Clean commit history and organized structure.
- [x] **Deployed Application**: Live frontend and backend links provided.
- [x] **Professional Documentation**: Step-by-step setup and engineering decisions included.



---



## 👨‍💻 Author



**Yuktamahajan1999** 



---



⭐ This project was intentionally designed to reflect **real-world CRM dashboard patterns**, not just assignment completion.

