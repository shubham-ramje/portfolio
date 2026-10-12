const validator = require('validator');
const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/sendEmail');

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation: Required fields
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.',
      });
    }

    // Validate email format
    if (!validator.isEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty.',
      });
    }

    if (message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters long.',
      });
    }

    // Clean / sanitize input
    const cleanData = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email.trim()) || email.trim(),
      phone: phone ? validator.escape(phone.trim()) : '',
      subject: subject ? validator.escape(subject.trim()) : 'General Inquiry',
      message: message.trim(), // Keep message text readable
    };

    // Save to MongoDB
    const newContact = await Contact.create(cleanData);

    // Asynchronously trigger Nodemailer notification (without blocking response)
    sendContactNotification({
      name: cleanData.name,
      email: cleanData.email,
      phone: cleanData.phone,
      subject: cleanData.subject,
      message: cleanData.message,
      createdAt: newContact.createdAt,
    }).catch((err) => {
      console.error('[Contact Controller] Email sending error:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      data: {
        id: newContact._id,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    console.error('[Contact Controller] Submission Error:', error.message);
    // Security requirement: Never expose internal database errors to end user
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message. Please try again later.',
    });
  }
};

module.exports = {
  submitContactForm,
};
