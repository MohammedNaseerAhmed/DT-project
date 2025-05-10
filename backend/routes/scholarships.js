const express = require('express');
const asyncHandler = require('express-async-handler');
const Scholarship = require('../models/Scholarship');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');

// Validation middleware
const validateScholarship = (req, res, next) => {
  const { title, description, deadline, amount, requirements, link } = req.body;
  const errors = [];

  if (!title) errors.push('Title is required');
  if (!description) errors.push('Description is required');
  if (!deadline) errors.push('Deadline is required');
  if (!amount) errors.push('Amount is required');
  if (!requirements) errors.push('Requirements are required');
  if (!link) errors.push('Application link is required');

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(', ') });
  }

  // Validate date format
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).json({ message: 'Invalid deadline date format' });
  }

  // Validate URL format
  try {
    new URL(link);
  } catch (e) {
    return res.status(400).json({ message: 'Invalid application link URL' });
  }

  next();
};

// Admin or provider can add scholarships
router.post(
  '/',
  requireAuth,
  requireRole(['admin', 'scholarship_provider']),
  validateScholarship,
  asyncHandler(async (req, res) => {
    try {
      const scholarship = new Scholarship({
        ...req.body,
        createdBy: req.user._id
      });
      await scholarship.save();
      res.status(201).json(scholarship);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: Object.values(error.errors).map(err => err.message).join(', ')
        });
      }
      throw error;
    }
  })
);

// Anyone can view scholarships
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const scholarships = await Scholarship.find()
        .sort({ deadline: 1 }) // Sort by deadline ascending
        .populate('createdBy', 'name email');
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch scholarships' });
    }
  })
);

module.exports = router;
