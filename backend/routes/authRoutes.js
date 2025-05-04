const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middleware/auth');
const User = require('../models/User');
// Add Clerk webhooks or custom auth logic here if needed

router.patch('/profile', requireAuth, async (req, res) => {
  try {
    const { role, subject, experience, imageUrl } = req.body;
    if (role && !['student', 'teacher', 'course_provider'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role) user.role = role;
    if (subject !== undefined) user.subject = subject;
    if (experience !== undefined) user.experience = experience;
    if (imageUrl !== undefined) user.imageUrl = imageUrl;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
