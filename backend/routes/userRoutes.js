const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get current user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile (including role)
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

    if (role) {
      user.role = role;
    }
    if (subject !== undefined) {
      user.subject = subject;
    }
    if (experience !== undefined) {
      user.experience = experience;
    }
    if (imageUrl !== undefined) {
      user.imageUrl = imageUrl;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Image upload endpoint
router.post('/profile/image', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  // Assuming your server serves /public as static
  const imageUrl = `/uploads/${req.file.filename}`;
  const user = await User.findById(req.user._id);
  user.imageUrl = imageUrl;
  await user.save();
  res.json({ imageUrl });
});

module.exports = router;
