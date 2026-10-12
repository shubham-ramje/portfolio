const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');

// POST /api/admin/login
router.post('/login', apiLimiter, adminLogin);

// Protected routes
router.use(protectAdmin);

// GET /api/admin/contacts - list and search contacts
router.get('/contacts', getContacts);

// GET /api/admin/contacts/:id - get single contact
router.get('/contacts/:id', getContactById);

// PATCH /api/admin/contacts/:id - toggle / update read status
router.patch('/contacts/:id', updateContactStatus);

// DELETE /api/admin/contacts/:id - delete contact
router.delete('/contacts/:id', deleteContact);

module.exports = router;
