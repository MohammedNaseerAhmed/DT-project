const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');
const router = express.Router();
// Teachers upload their free time
router.post(
  '/schedule',
  requireAuth,
  requireRole('teacher'),
  asyncHandler(async (req, res) => {
    req.user.freeTime = req.body.freeTime; // Array of strings
    await req.user.save();
    res.json({ message: 'Schedule updated' });
  })
);

// Anyone can view teachers and their free time
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const teachers = await User.find(
      { role: 'teacher' },
      'name fullName email subject experience imageUrl rating reviews freeTime online'
    );
    res.json(teachers);
  })
);

module.exports = router;
