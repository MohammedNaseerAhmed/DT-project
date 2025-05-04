const express = require('express');
const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');
const { requireAuth, requireRole } = require('../middleware/auth');
const router = express.Router();

// Only teachers can upload videos
router.post(
  '/',
  requireAuth,
  requireRole('teacher'),
  asyncHandler(async (req, res) => {
    const video = new Video({ ...req.body, uploadedBy: req.user._id });
    await video.save();
    res.status(201).json(video);
  })
);

// Anyone can view videos
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const videos = await Video.find().populate('uploadedBy', 'name');
    res.json(videos);
  })
);

module.exports = router;
