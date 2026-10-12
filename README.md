# Shubham Ramje — MERN Full Stack Developer Portfolio

A production-ready, fully responsive, dynamic personal portfolio website engineered with the complete **MERN Stack** (MongoDB, Express.js, React.js, Node.js). 

This is not a static HTML portfolio; it is a full-stack web application featuring RESTful APIs, Mongoose data modeling, JWT-authenticated admin message management, Nodemailer email alerts, rate limiting, and light/dark theme switching.

---

## 🌟 Technology Stack

### Frontend
- **React.js 18+ (Vite)**: Component-driven Single Page Application (SPA).
- **React Router DOM v7**: Client-side routing with clean URLs and protected admin views.
- **Axios**: Promised-based HTTP client with request/response interceptors.
- **Lucide React & Custom SVG**: Lightweight, modern developer icons.
- **Modern Responsive CSS3**: CSS custom properties (variables), Glassmorphism, smooth scrolling, and mobile-first responsive breakpoints.
- **Dark & Light Mode**: Theme switching with automatic preference detection and `localStorage` persistence.

### Backend
- **Node.js & Express.js**: RESTful API server.
- **Mongoose ODM**: Structured database modeling and schema-level validation.
- **JSON Web Tokens (JWT)** & **Bcrypt.js**: Secure token-based authentication and salted password hashing for the admin portal.
- **Nodemailer**: Email dispatch pipeline with branded HTML templates and auto-responder capabilities.
- **Helmet**: Secures Express apps by setting various HTTP headers.
- **CORS**: Cross-Origin Resource Sharing configured for local development and production domains.
- **Express-Rate-Limit**: Defends the contact API against bot spam and abuse.

### Database
- **MongoDB**: Compatible with local MongoDB service or MongoDB Atlas cloud cluster.

---

## 📂 Project Directory Structure

```
portfolio/
├── client/                      # React Frontend (Vite)
│   ├── public/
│   │   ├── favicon.svg          # Custom <SR/> branded favicon
│   │   └── ...
│   ├── src/
│   │   ├── assets/              # Static media assets
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Sticky navbar with blur & scroll spy
│   │   │   ├── Footer.jsx       # Branded footer with social & admin links
│   │   │   ├── ThemeToggle.jsx  # Sun / Moon theme switcher
│   │   │   ├── Toast.jsx        # Success/Error notification alerts
│   │   │   ├── Icons.jsx        # Custom SVG icons (GitHub, LinkedIn)
│   │   │   ├── DeveloperIllustration.jsx # Interactive code window visual
│   │   │   ├── ProjectModal.jsx # Project deep-dive modal
│   │   │   └── CertificateModal.jsx # Certificate credential modal
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx # Dark/Light theme state
│   │   │   └── AuthContext.jsx  # Admin JWT auth state
│   │   ├── data/
│   │   │   └── portfolioData.js # Centralized configuration for all portfolio content
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Single-page portfolio assembly
│   │   │   ├── AdminLogin.jsx   # Admin authentication page
│   │   │   ├── AdminDashboard.jsx # Contact messages management dashboard
│   │   │   └── NotFound.jsx     # 404 handler
│   │   ├── sections/            # Portfolio page sections
│   │   │   ├── Hero.jsx         # Headline, CTAs, dev visual, resume download
│   │   │   ├── About.jsx        # BCA background, recruiter summary, stats
│   │   │   ├── Skills.jsx       # Filterable skills cards with icons
│   │   │   ├── Experience.jsx   # Ypsilon IT Solutions internship timeline
│   │   │   ├── Projects.jsx     # StorageWars & BizManager projects
│   │   │   ├── Education.jsx    # DAVV BCA timeline & academic score
│   │   │   ├── Certifications.jsx # ADCA, MS Excel, Skill India certificates
│   │   │   ├── Services.jsx     # 5 core MERN services
│   │   │   └── Contact.jsx      # Live contact form with validation & API
│   │   ├── services/
│   │   │   └── api.js           # Axios instance & API endpoints
│   │   ├── index.css            # Complete CSS design system
│   │   ├── App.jsx              # Routing & Context providers
│   │   └── main.jsx             # React entry point
│   ├── index.html               # SEO metadata & Google Fonts
│   ├── vite.config.js           # Vite server & proxy configuration
│   └── package.json
│
├── server/                      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection handler
│   ├── controllers/
│   │   ├── contactController.js # Contact form validation & email trigger
│   │   └── adminController.js   # JWT login & message CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT Bearer token protection
│   │   ├── errorMiddleware.js   # 404 & centralized error handling
│   │   └── rateLimiter.js       # Rate limiter for contact form & APIs
│   ├── models/
│   │   ├── Contact.js           # Contact inquiry Mongoose schema
│   │   └── Admin.js             # Admin user schema with bcrypt hashing
│   ├── routes/
│   │   ├── contactRoutes.js     # POST /api/contact
│   │   └── adminRoutes.js       # /api/admin/* endpoints
│   ├── utils/
│   │   └── sendEmail.js         # Nodemailer transporter & HTML email templates
│   ├── server.js                # Express app initialization & admin seeder
│   ├── .env                     # Backend environment configuration
│   ├── .env.example
│   └── package.json
│
├── .env.example                 # Root environment variables reference
├── .gitignore
├── package.json                 # Root script runner (concurrently)
└── README.md
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** (v18.x or later)
- **npm** (v9.x or later)
- **MongoDB** (Local MongoDB instance running on `localhost:27017` or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Step 1: Install Dependencies
Run from the root directory:
```bash
npm run install-all
```
*(This automatically installs dependencies across root, server, and client folders)*

### Step 2: Configure Environment Variables

1. In the `server` directory, ensure `.env` is configured:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Initial Admin User Credentials (auto-seeded on first run)
ADMIN_EMAIL=admin@shubhamramje.dev
ADMIN_PASSWORD=Admin@123456

# Nodemailer Contact Configuration
CONTACT_EMAIL=ramjeshubham@gmail.com

# Optional SMTP Settings (leave blank for local simulation)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

# Client URL
CLIENT_URL=http://localhost:5173
```

2. In the `client` directory, ensure `.env` contains:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Run the Full Application Concurrently
From the root directory:
```bash
npm run dev
```

This launches both:
- **Backend Express Server**: `http://localhost:5000`
- **Frontend React Application**: `http://localhost:5173`

---

## 🛠️ Available Development Commands

| Command | Action |
|---|---|
| `npm run dev` | Runs backend and frontend concurrently in development mode |
| `npm run server` | Runs Express backend with live file-watching (`node --watch server.js`) |
| `npm run client` | Starts Vite React frontend development server |
| `npm run build` | Compiles optimized, production-ready frontend bundle into `client/dist` |
| `npm run start` | Starts Express backend in production mode |

---

## 📬 Contact API & Email Notification System

### Contact Submission Flow
1. Visitor fills out the form at `#contact`.
2. Client performs instant validation (checks required fields, email format, message length).
3. React dispatches `POST /api/contact` with:
   ```json
   {
     "name": "Jane Recruiter",
     "email": "jane@techcompany.com",
     "phone": "+91 9876543210",
     "subject": "Full Stack MERN Developer Role",
     "message": "Hello Shubham, we reviewed your projects and would like to invite you for an interview."
   }
   ```
4. Backend verifies and sanitizes fields to prevent XSS / injections.
5. Saves inquiry into MongoDB `contacts` collection (`isRead: false`).
6. Triggers Nodemailer to send a styled HTML notification to `ramjeshubham@gmail.com`.
7. Sends an automated acknowledgment email to the sender.
8. Returns clean JSON response:
   ```json
   {
     "success": true,
     "message": "Your message has been sent successfully."
   }
   ```

*Note: If SMTP credentials are not yet configured in `.env`, the server logs the full notification directly to the terminal without failing the visitor request.*

---

## 🔐 Admin Contact Management Portal

The portfolio includes a secure, protected administrative system for reviewing and managing submitted inquiries:

- **Portal URL**: `http://localhost:5173/admin/login` (or click the shield icon in the navbar/footer).
- **Default Admin Credentials**:
  - **Email**: `admin@shubhamramje.dev`
  - **Password**: `Admin@123456`
  *(These credentials are automatically seeded into MongoDB on initial startup if no admin exists).*

### Admin Features
- **Statistics Dashboard**: Real-time counts of Total Inquiries, Unread Inquiries, and Read/Resolved Inquiries.
- **Search & Filtering**: Search by sender name, email, or subject; filter by All, Unread, or Read.
- **Message Modal**: View complete message details, submission date/time, sender phone, and one-click "Reply via Email" mailto link.
- **Read Status Toggle**: Toggle inquiries between Read and Unread.
- **Delete Inquiries**: Permanently remove resolved or spam submissions with confirmation.

### Protected Admin REST Endpoints
- `POST /api/admin/login` — Public endpoint to exchange credentials for JWT token.
- `GET /api/admin/contacts` — Protected endpoint (requires `Authorization: Bearer <token>`).
- `GET /api/admin/contacts/:id` — Protected endpoint.
- `PATCH /api/admin/contacts/:id` — Protected endpoint to toggle `isRead`.
- `DELETE /api/admin/contacts/:id` — Protected endpoint to delete message.

---

## 🎨 Personalizing Content

All portfolio content is decoupled from JSX and stored cleanly inside:
👉 `client/src/data/portfolioData.js`

To update:
- **Personal Details & Social Links**: Modify `personalInfo` object.
- **About Bio & Highlights**: Update `aboutData`.
- **Education Entries**: Add or edit objects in `educationData`.
- **Experience Timeline**: Add new roles to `experienceData`.
- **Skills**: Add or modify skills and categories in `skillsData`.
- **Projects**: Add new full-stack projects to `projectsData`.
- **Certifications**: Add new verified credentials to `certificationsData`.
- **Services**: Update offerings in `servicesData`.

---

## 🚀 Production Deployment Guide

### Deploying Frontend (Vercel / Netlify)
1. Push your repository to GitHub.
2. Connect your GitHub repository to Vercel or Netlify.
3. Configure build settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://api.yourdomain.com/api`).

### Deploying Backend (Render / Railway / DigitalOcean)
1. In your cloud provider dashboard, create a new Web Service pointing to your repository.
2. Configure settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
3. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection URI (`mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
   - `JWT_SECRET`: A strong random string
   - `ADMIN_EMAIL`: Your custom admin email
   - `ADMIN_PASSWORD`: Your custom admin password
   - `CONTACT_EMAIL`: `ramjeshubham@gmail.com`
   - `CLIENT_URL`: Your deployed frontend URL
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Your production email service credentials (e.g. Gmail App Password, Brevo, SendGrid)

---

## 📄 License
© 2026 Shubham Ramje. All Rights Reserved.
