const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

// POST /api/contact - Submit contact form with rate limiting
router.post('/', contactLimiter, submitContactForm);

module.exports = router;
