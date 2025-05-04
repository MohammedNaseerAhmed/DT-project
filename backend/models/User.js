const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  name: String,
  fullName: String, // Add this if you want to store fullName separately
  email: String,
  role: { type: String, enum: ['student', 'teacher', 'course_provider'], default: 'student' },
  subject: { type: String, default: '' },
  experience: { type: Number, default: 1 },
  imageUrl: { type: String, default: '' },
  rating: { type: Number, default: 4.9 },
  reviews: { type: Number, default: 0 },
  freeTime: [String], // For teachers
  online: { type: Boolean, default: false }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);