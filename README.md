# 🚀 Employee Management System (EMS)

A full-stack Employee Management System built with the MERN stack and deployed using a complete DevOps pipeline on AWS.

This project demonstrates real-world implementation of CI/CD automation, containerization, cloud deployment, and secure authentication.

---

## 📌 Project Overview

The Employee Management System (EMS) is a role-based web application designed to manage employees efficiently within an organization.

It includes two separate panels:

- 🔐 Admin Panel
- 👤 Employee Panel

---

## ✨ Features

### 🔑 Authentication & Security
- JWT-based Authentication
- Secure Login & Signup
- Role-Based Access Control (Admin / Employee)
- Protected Routes

### 🧑‍💼 Admin Features
- Add / Update / Delete Employees
- Salary Management
- Leave Management
- Notice Board Management

### 👨‍💻 Employee Features
- View Personal Profile
- Apply for Leave
- View Salary Details
- View Notices

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication

### DevOps & Deployment
- Docker (Containerization)
- Jenkins (CI/CD Pipeline)
- GitHub Webhook Integration
- AWS EC2 (Cloud Hosting)
- Nginx (Reverse Proxy)

---

## 🏗️ Infrastructure as Code (Terraform)

Infrastructure is provisioned using Terraform.

Terraform is used to:

- Create AWS EC2 instance
- Configure security groups
- Manage networking rules
- Automate infrastructure setup

This ensures:

- Reproducible infrastructure
- Version-controlled cloud setup
- Scalable and automated provisioning

---

## 🐳 Docker Architecture

The application is fully containerized:

- Frontend Container
- Backend Container
- MongoDB Database
- Nginx Reverse Proxy

Docker ensures:
- Consistent environment
- Easy deployment
- Scalability
- Isolation of services

---

## 🔄 CI/CD Pipeline (Jenkins)

The project uses a fully automated CI/CD pipeline:

1. Developer pushes code to GitHub
2. GitHub Webhook triggers Jenkins
3. Jenkins builds Docker images
4. Containers are restarted
5. Application updates automatically on AWS EC2

This ensures:
- Fast deployment
- Automated build process
- Reduced manual errors

---

## ☁️ Deployment

- Hosted on AWS EC2
- Nginx configured as reverse proxy
- Environment variables managed securely
- Production build optimized

---

## 🏗️ Project Structure

```
EMS/
│
├── frontend/
├── backend/
├── nginx/
├── docker-compose.yml
└── Jenkinsfile
```

---

## 🚀 Installation (Local Setup)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/helaniU/DevopsProject-Employee_Management_System
cd DevopsProject-Employee_Management_System
```

### 2️⃣ Setup Environment Variables
Create a `.env` file inside backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3️⃣ Run Using Docker
```bash
docker-compose up --build
```

---

## 🔐 Authentication Flow

- User logs in
- Server verifies credentials
- JWT token is generated
- Token stored in frontend
- Protected routes validated using middleware

---

## 📚 What I Learned

- CI/CD automation using Jenkins
- GitHub Webhook integration
- Docker containerization
- Cloud deployment on AWS
- Nginx reverse proxy configuration
- Secure authentication using JWT
- Production-level system design

---

## 📌 Future Improvements

- Add email notifications
- Implement dashboard analytics
- Improve UI/UX

---

## 👩‍💻 Author

Helani Ambalangodage  
Undergraduate | Full Stack Developer | DevOps Enthusiast  

---

## 📄 License

This project is for educational and demonstration purposes.
