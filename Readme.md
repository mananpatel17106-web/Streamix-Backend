# 🚀 Streamix Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue?style=for-the-badge&logo=cloudinary)

**Production-ready YouTube-inspired Backend built with Node.js, Express.js, MongoDB & Cloudinary**

</div>

---

# 📖 Overview

**Streamix Backend** is a scalable REST API powering a modern video-sharing platform inspired by YouTube.

The project follows industry-standard backend architecture with secure authentication, cloud-based media storage, MongoDB aggregation pipelines, pagination, and modular folder structure.

This backend can be integrated with any frontend built using React, Next.js, Vue, Flutter, Android, or iOS.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Secure Cookies
- Logout
- Change Password

---

## 👤 User

- Get Current User
- Update Account Details
- Update Avatar
- Update Cover Image
- Watch History
- Channel Profile

---

## 🎥 Videos

- Upload Video
- Update Video
- Delete Video
- Publish / Unpublish Video
- Get Video By Id
- Get All Videos
- Search Videos
- Pagination
- Sort & Filter

---

## ❤️ Likes

- Like / Unlike Video
- Like / Unlike Comment
- Like / Unlike Tweet
- Get Liked Videos

---

## 💬 Comments

- Add Comment
- Update Comment
- Delete Comment
- Get Video Comments

---

## 📝 Tweets

- Create Tweet
- Update Tweet
- Delete Tweet
- Get User Tweets

---

## 📂 Playlists

- Create Playlist
- Update Playlist
- Delete Playlist
- Add Video To Playlist
- Remove Video From Playlist
- Get Playlist

---

## 📺 Subscription

- Subscribe / Unsubscribe Channel
- Get Channel Subscribers
- Get User Subscribed Channels

---

## 📊 Dashboard

- Channel Statistics
- Channel Videos
- Total Views
- Subscribers
- Likes Analytics

---

# 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cloudinary | Media Storage |
| Multer | File Upload |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Requests |

---

# 📁 Project Structure

```
src
│
├── controllers
├── db
├── middlewares
├── models
├── routes
├── utils
│
├── app.js
├── constants.js
└── index.js
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
PORT=8000

MONGODB_URI=

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/mananpatel17106-web/Streamix-Backend.git
```

Go inside project

```bash
cd Streamix-Backend
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Start Development Server

```bash
npm run dev
```

---

# 📡 REST API Modules

```
Authentication
Users
Videos
Comments
Tweets
Playlists
Subscriptions
Likes
Dashboard
Health Check
```

---

# 🔒 Security

- JWT Authentication
- HTTP Only Cookies
- Password Hashing (bcrypt)
- Secure Token Verification
- Authentication Middleware
- Input Validation
- Centralized Error Handling

---

# 🚀 Backend Highlights

- Modular Architecture
- MVC Pattern
- Async Handler
- Custom API Response
- Custom API Error
- Aggregation Pipelines
- Aggregate Pagination
- Cloudinary Integration
- Multer File Upload
- Production Ready Structure

---

# 📌 Future Improvements

- Notifications
- Live Streaming
- Video Recommendations
- Real-time Chat
- Admin Dashboard
- AI Video Search
- Email Verification
- Two-Factor Authentication

---

# 👨‍💻 Author

**Manan Patel**

Computer Science Engineering Student

Passionate about Full Stack Development, Backend Engineering, and Scalable Web Applications.

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository.

It motivates me to build more production-ready projects.

---

<div align="center">

### Built with ❤️ using Node.js, Express.js & MongoDB

</div>