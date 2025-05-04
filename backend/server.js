const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videos');
const teacherRoutes = require('./routes/teachers');
const courseRoutes = require('./routes/courses');
const scholarshipRoutes = require('./routes/scholarships');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes/book'));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/scholarships', scholarshipRoutes);

// Express static for uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));