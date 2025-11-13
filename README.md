🛒 LoopCart – Dynamic Secondhand Marketplace
<p align="center"> <img src="https://via.placeholder.com/1200x400/ff4d94/ffffff?text=LoopCart+-+Secondhand+Marketplace" alt="LoopCart Banner"> </p>

A modern, full-stack secondhand marketplace combining a vanilla JavaScript frontend with a Node.js + Express + MongoDB backend, providing a smooth, React-like shopping experience.

✨ Featured On
<p> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=nodedotjs" /> <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" /> <img src="https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript" /> <img src="https://img.shields.io/badge/Design-Responsive-blue?style=for-the-badge" /> </p>
📸 Preview
<table> <tr> <td align="center"><img src="https://via.placeholder.com/300x200/667eea/ffffff?text=Home+Page"/><br><b>Home Page</b></td> <td align="center"><img src="https://via.placeholder.com/300x200/ff4d94/ffffff?text=Wishlist"/><br><b>Wishlist</b></td> <td align="center"><img src="https://via.placeholder.com/300x200/764ba2/ffffff?text=Cart"/><br><b>Cart</b></td> </tr> </table>
🎯 Key Features
🛍️ Shopping Experience

Real-time cart & wishlist

Heart icon toggle

Advanced product filtering (category, location, price)

WhatsApp seller contact

Smooth UI interactions

💾 Persistent State

Wishlist & cart saved with LocalStorage

Auto-syncs with frontend UI

🖥️ Backend Features

Node.js + Express REST API

MongoDB product database

Fully integrated frontend serving

Production-ready setup

🛠️ Tech Stack
Frontend

Vanilla JavaScript (ES6+)

Bootstrap 5 + Custom CSS

LocalStorage API

Responsive UI

Backend

Node.js

Express.js

MongoDB + Mongoose

🚀 Quick Start — Run the Full Project Locally

The backend automatically serves the frontend at:

👉 http://localhost:5000

1️⃣ Clone the Repository
git clone https://github.com/PoojaS0305/loopcart-project-1.git
cd loopcart-project-1

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Create .env File

Inside backend/, create a file named .env:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/loopcart


Start your MongoDB server before running the backend.

4️⃣ Start the Server
node server.js


You should see:

🚀 Server running on http://localhost:5000
📁 Serving frontend from: ../frontend
✅ Connected to MongoDB

5️⃣ Open the App
http://localhost:5000


Or specific sections:

Cart → http://localhost:5000/#cart-section

Wishlist → http://localhost:5000/#wishlist-section

📂 Project Structure
loopcart-project/
│
├── backend/
│     ├── server.js
│     ├── package.json
│     ├── .env
│
└── frontend/
      ├── index.html
      ├── styles.css
      ├── script.js
      ├── assets/

🙌 Author

🎀 Developed by Pooja S
