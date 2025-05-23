const { verifyToken } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

exports.requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    // Find or create user in our database
    let user = await User.findOne({ clerkId: payload.sub });
    if (!user) {
      // Create new user with default role
      user = await User.create({
        clerkId: payload.sub,
        name: `${payload.first_name || ''} ${payload.last_name || ''}`.trim() || payload.email_address,
        email: payload.email_address,
        role: 'student',
      });
    } else {
      // Update existing user's data from Clerk
      user.name = `${payload.first_name || ''} ${payload.last_name || ''}`.trim() || payload.email_address;
      user.email = payload.email_address;
      await user.save();
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Clerk Auth Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based Access Control Middleware
exports.requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }
  next();
};
