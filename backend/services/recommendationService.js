const Book = require('../models/Book');

exports.getRecommendations = async (userPreferences) => {
  return await Book.find({ genre: { $in: userPreferences.genres || [] } }).limit(10);
};