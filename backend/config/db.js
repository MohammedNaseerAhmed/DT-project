const mongoose = require('mongoose');

const localURI = 'mongodb://localhost:27017/edusphere';
const remoteURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(remoteURI || localURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
