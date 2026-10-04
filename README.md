# NRI Remote Voting System

A web-based **NRI Remote Voting System** designed as a college project prototype to provide a digital workflow for voter registration, biometric authentication, online vote casting, and constituency-wise election result management.

## 🚀 Live Demo

**Website:** https://nri-voting-6gf-blue.vercel.app

> **Note:** This is an academic prototype and is not an official election/voting platform.

## 📌 Features

### 👨‍💼 Admin Module
- Admin login and authentication
- Create and register voters
- Capture/store biometric authentication reference
- View registered voter details
- Manage election information
- View constituency-wise election results

### 👤 User Module
- Aadhaar-based registration check
- Biometric authentication
- View registered voter details
- View constituency information
- Cast a vote
- Select only one party
- Vote confirmation
- Prevent duplicate voting

### 📊 Election Results
- Select constituency/place
- View total registered voters
- View total votes cast
- View party-wise vote counts
- Display election statistics

## 🏗️ System Workflow

```text
Entry Page
    │
    ├── Admin Login
    │      │
    │      └── Admin Dashboard
    │             ├── Create User
    │             ├── Registered Users
    │             └── Election Results
    │
    └── User Login
           │
           ├── Enter Aadhaar Number
           ├── Verify Registration
           ├── Biometric Authentication
           ├── View User Details
           ├── Cast Vote
           ├── Confirm Vote
           └── Vote Recorded
```

## 🛠️ Technologies Used

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MySQL

### Authentication
- Aadhaar-based registration check
- Biometric fingerprint authentication
- Admin authentication

### Deployment
- Vercel

## 📂 Main Modules

```text
NRI Remote Voting System
│
├── Admin Authentication
├── Voter Registration
├── Biometric Authentication
├── Voter Login
├── Voter Details
├── Constituency Mapping
├── Online Voting
├── Vote Confirmation
└── Election Results
```

## 🔐 Security Concept

The system is designed with multiple authentication and validation stages:

1. Admin authentication
2. Aadhaar registration verification
3. Biometric authentication
4. One-vote-per-user validation
5. Vote confirmation
6. Admin-controlled result access

**Important:** In a real-world election system, biometric data must be handled using certified hardware, secure biometric protocols, encryption, government-approved infrastructure, and applicable election/privacy regulations. This project demonstrates the concept for academic purposes.

## 🗳️ Voting Process

```text
Enter Aadhaar Number
        ↓
Check Registration
        ↓
Biometric Authentication
        ↓
Authentication Successful
        ↓
Display Voter Details
        ↓
Cast Your Vote
        ↓
Select Party
        ↓
Confirm Selection
        ↓
Vote Recorded
```

## 📍 Constituency Mapping

During voter registration, the user's Indian permanent-address pincode can be used to determine the corresponding constituency using an appropriate pincode/constituency dataset or API.

```text
Indian Pincode
      ↓
Location / Constituency Mapping
      ↓
Voter Registration
      ↓
Constituency-specific Results
```

## 💻 Local Development

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd nri-remote-voting
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start frontend

```bash
npm run dev
```

### 4. Install backend dependencies

```bash
cd ../backend
npm install
```

### 5. Start backend

```bash
npm start
```

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nri_voting

JWT_SECRET=your_secret_key
```

Never upload your actual `.env` file or database credentials to GitHub.

## 📈 Future Enhancements

- Real fingerprint scanner SDK integration
- Secure biometric verification
- Face authentication
- Stronger encryption
- Blockchain-based vote auditing
- Advanced election monitoring dashboard
- Cloud-based deployment
- Mobile application
- Enhanced accessibility and multilingual support

## 🎓 Project Purpose

This project is developed as an **academic demonstration of a remote voting workflow for Non-Resident Indians (NRIs)**. It demonstrates how frontend, backend, database, authentication, biometric integration concepts, and election-result management can be combined into a full-stack application.

## 👨‍💻 Developer

**Mohammed Abubakkar I**

**B.E. Computer Science Engineering (Honors)**

---

⭐ If you find this project useful, consider giving the repository a star.
