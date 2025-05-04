const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const { requireAuth, requireRole } = require('../middleware/auth');
const router = express.Router();

// Any signed-in user can add a book
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const book = new Book({ ...req.body, uploadedBy: req.user._id });
    await book.save();
    res.status(201).json(book);
  })
);

// Anyone can view books
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate('uploadedBy', 'name');
    res.json(books);
  })
);

module.exports = router;
