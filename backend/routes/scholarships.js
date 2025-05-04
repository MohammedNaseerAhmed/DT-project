const express = require('express');
const asyncHandler = require('express-async-handler');
const Scholarship = require('../models/Scholarship');
const router = express.Router();

// Admin or provider can add scholarships (expand as needed)
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  })
);

// Anyone can view scholarships
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  })
);

module.exports = router;
