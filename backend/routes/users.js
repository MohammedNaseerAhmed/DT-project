const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Get or create user profile
router.get(
  '/profile',
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      let user = await User.findOne({ clerkId: req.user.clerkId });
      
      // If user doesn't exist, create one
      if (!user) {
        user = new User({
          clerkId: req.user.clerkId,
          email: req.user.email,
          name: req.user.name,
          role: 'student' // Default role
        });
        await user.save();
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error fetching/creating user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  })
);

// Update user role
router.patch(
  '/profile',
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { role } = req.body;
      console.log('Received role update request:', { 
        role, 
        userId: req.user.clerkId,
        body: req.body,
        headers: req.headers,
        roleType: typeof role,
        roleValue: role,
        roleTrimmed: role?.trim(),
        roleLowerCase: role?.toLowerCase()
      });

      // Validate request body
      if (!req.body || typeof req.body !== 'object') {
        console.error('Invalid request body:', req.body);
        return res.status(400).json({ 
          message: 'Invalid request body' 
        });
      }

      // Validate role
      const validRoles = ['student', 'teacher', 'course_provider', 'scholarship_provider'];
      
      // Check if role is provided
      if (!role) {
        console.error('Role is missing');
        return res.status(400).json({ 
          message: 'Role is required' 
        });
      }

      // Check if role is a string
      if (typeof role !== 'string') {
        console.error('Role is not a string:', { role, type: typeof role });
        return res.status(400).json({ 
          message: 'Role must be a string' 
        });
      }

      // Trim and normalize role
      const normalizedRole = role.trim().toLowerCase();

      // Check if role is valid
      if (!validRoles.includes(normalizedRole)) {
        console.error('Invalid role value:', { 
          providedRole: role,
          normalizedRole,
          validRoles,
          type: typeof role
        });
        return res.status(400).json({ 
          message: `Invalid role. Must be one of: ${validRoles.join(', ')}` 
        });
      }

      let user = await User.findOne({ clerkId: req.user.clerkId });
      console.log('Found user:', { 
        userId: user?._id,
        currentRole: user?.role,
        exists: !!user
      });
      
      // If user doesn't exist, create one
      if (!user) {
        console.log('Creating new user for role update');
        user = new User({
          clerkId: req.user.clerkId,
          email: req.user.email,
          name: req.user.name,
          role: 'student' // Default role
        });
      }

      // Update role
      const oldRole = user.role;
      user.role = normalizedRole;
      
      try {
        await user.save();
        console.log('Role updated successfully:', { 
          userId: user._id, 
          oldRole, 
          newRole: normalizedRole 
        });

        res.json({ 
          message: `Successfully updated role from ${oldRole} to ${normalizedRole}`,
          role: user.role 
        });
      } catch (saveError) {
        console.error('Error saving user:', saveError);
        if (saveError.name === 'ValidationError') {
          const validationErrors = Object.values(saveError.errors).map(err => err.message);
          console.error('Validation errors:', validationErrors);
          return res.status(400).json({ 
            message: validationErrors.join(', ')
          });
        }
        throw saveError;
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ 
        message: 'Failed to update user role',
        error: error.message 
      });
    }
  })
);

module.exports = router; 