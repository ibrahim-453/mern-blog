📝 MERN Blog Platform

A full-featured MERN Stack Blogging Platform that lets users create, edit, and explore blogs with a modern UI and complete authentication system.
It includes email verification, Google login via Firebase, dark/light mode, profile customization, and a full Admin Dashboard for managing users, blogs, and comments.

Key Features
User Authentication

Sign Up with email and password

Verify Email via secure verification link

Login / Logout with JWT

Google Login using Firebase Authentication

Forgot Password – request and use reset token via email

Blog Management

Create, read, edit, and delete blogs

Rich text editor using TinyMCE

Add images within blogs

Like and unlike blogs

Fully responsive on all screen sizes

Comments

Add, edit, and delete comments on blogs

User Profile

Update profile picture

Edit personal details

Theme Mode

Toggle between light and dark modes seamlessly

Feedback

Send feedback directly from the application

Admin Dashboard

Admins can:

View all users, blogs, and comments

Edit or delete any blog or comment

Manage user accounts

View and respond to feedback

Tech Stack

Frontend:

React.js

Tailwind CSS

Firebase Authentication (Google login)

TinyMCE Editor

Backend:

Node.js

Express.js

Database:

MongoDB (via Mongoose)

Security & Utilities:

JWT Authentication

Bcrypt Password Hashing

Nodemailer (email verification + reset)

CORS and Helmet for API protection

Project Structure
mern-blog/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── src/                # Express Backend
│   ├── connection/
|   ├── contorllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
|   ├── app.js
│   ├── index.js
│   └── package.json
│

Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/mern-blog.git
cd mern-blog

2. Install Dependencies
Backend
cd server
npm install

Frontend
cd ../client
npm install

3. Configure Environment Variables
server/.env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
SMTP_API_KEY=your_api_key
SENDER_EMAIL=your_sender_email
CLIENT_URL=http://localhost:5173

client/.env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

Run the Project
Run Backend
cd server
npm run dev

Run Frontend
cd client
npm run dev


Open in browser:
👉 https://mern-blog-frontend-three.vercel.app

Admin Dashboard

Admins have access to:

All users and their details

All blogs (view, edit, delete)

All comments

Feedback management

Accessible at: /admin

Responsive Design

Built with Tailwind CSS, the UI automatically adapts to mobile, tablet, and desktop screen sizes.
Includes dark/light mode toggle for personalized viewing.
