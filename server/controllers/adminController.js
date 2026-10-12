const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'shubham_ramje_portfolio_jwt_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * @desc    Authenticate admin & obtain JWT token
 * @route   POST /api/admin/login
 * @access  Public
 */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('[Admin Controller] Login Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
    });
  }
};

/**
 * @desc    Get contacts list with search, filter, and pagination
 * @route   GET /api/admin/contacts
 * @access  Protected (Admin only)
 */
const getContacts = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;

    const query = {};

    // Filter by read/unread status
    if (status === 'read') {
      query.isRead = true;
    } else if (status === 'unread') {
      query.isRead = false;
    }

    // Search by name, email, or subject
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { subject: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Contact.countDocuments(query),
    ]);

    // Calculate quick counts for dashboard
    const [unreadCount, totalCount] = await Promise.all([
      Contact.countDocuments({ isRead: false }),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
      stats: {
        total: totalCount,
        unread: unreadCount,
        read: totalCount - unreadCount,
      },
    });
  } catch (error) {
    console.error('[Admin Controller] Get Contacts Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages.',
    });
  }
};

/**
 * @desc    Get a single contact message by ID and optionally mark as read
 * @route   GET /api/admin/contacts/:id
 * @access  Protected (Admin only)
 */
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    // Auto mark as read on view if desired
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('[Admin Controller] Get Contact By ID Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve message details.',
    });
  }
};

/**
 * @desc    Update contact read/unread status
 * @route   PATCH /api/admin/contacts/:id
 * @access  Protected (Admin only)
 */
const updateContactStatus = async (req, res) => {
  try {
    const { isRead } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    if (typeof isRead === 'boolean') {
      contact.isRead = isRead;
    } else {
      contact.isRead = !contact.isRead;
    }

    await contact.save();

    return res.status(200).json({
      success: true,
      message: `Message marked as ${contact.isRead ? 'read' : 'unread'}.`,
      data: contact,
    });
  } catch (error) {
    console.error('[Admin Controller] Update Status Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update message status.',
    });
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/admin/contacts/:id
 * @access  Protected (Admin only)
 */
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error) {
    console.error('[Admin Controller] Delete Contact Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message.',
    });
  }
};

module.exports = {
  adminLogin,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
