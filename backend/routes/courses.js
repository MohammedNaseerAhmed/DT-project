const express = require('express');
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const { requireAuth, requireRole } = require('../middleware/auth');
const router = express.Router();
// Only course providers can upload courses
router.post(
  '/',
  requireAuth,
  requireRole('course_provider'),
  asyncHandler(async (req, res) => {
    const course = new Course({ ...req.body, provider: req.user._id });
    await course.save();
    res.status(201).json(course);
  })
);

// Anyone can view courses
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.find().populate('provider', 'name');
    res.json(courses);
  })
);

module.exports = router;
