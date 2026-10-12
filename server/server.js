const path = require('path');
// Load environment variables from server/.env or root/.env
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const Admin = require('./models/Admin');

const app = express();

// Connect to MongoDB
connectDB();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly fallback
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Initial Admin Seeder
const seedAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'ramjeshubham@gmail.com').toLowerCase();
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'shubham@123';
      await Admin.create({
        name: 'Shubham Ramje (Admin)',
        email: adminEmail,
        password: defaultPassword,
        role: 'admin',
      });
      console.log(`[Admin Seeder] Default admin account initialized: ${adminEmail}`);
    }
  } catch (error) {
    console.warn(`[Admin Seeder] Admin check skipped or pending DB ready: ${error.message}`);
  }
};

// Seed admin once DB connects
const mongoose = require('mongoose');
mongoose.connection.once('open', () => {
  seedAdmin();
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Shubham Ramje Portfolio Backend API',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Shubham Ramje Portfolio REST API is running.');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Portfolio Backend running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🔗 Listening on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📬 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`==================================================\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Process Error] Unhandled Rejection: ${err.message}`);
});

module.exports = app;
