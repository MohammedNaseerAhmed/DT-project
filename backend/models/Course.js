const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resources: [String], // URLs or file references
});

module.exports = mongoose.model('Course', courseSchema);
