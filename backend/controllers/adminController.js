const Admin = require('../models/Admin');
const { sendEmail } = require('../utils/notificationService');

// @route   POST /api/admin/register
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if exists
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ message: 'Admin already exists' });

    // Save new admin
    admin = new Admin({ name, email, password });
    await admin.save();
    
    // Return token so user is automatically logged in after registering
    res.status(201).json({ 
      message: 'Admin registered successfully', 
      token: 'admin_jwt_token_' + admin._id,
      admin: { id: admin._id, name, email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful', 
      token: 'admin_jwt_token_' + admin._id,
      admin: { id: admin._id, name: admin.name, email: admin.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   POST /api/admin/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Return success even if not found to prevent email enumeration
      return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // In a real app, generate a JWT token or random hash, save it to DB with expiration.
    // For this MVP, we just send a link with the email as a parameter.
    
    // Determine frontend URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174';
    
    const resetLink = `${frontendUrl}/admin/reset-password?email=${encodeURIComponent(email)}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center;">MediSlot AI Admin</h2>
        <p>Hello ${admin.name},</p>
        <p>You recently requested to reset your password for your MediSlot AI Admin account.</p>
        <p>Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #64748b; font-size: 14px; text-align: center;">If you did not request a password reset, please ignore this email.</p>
      </div>
    `;

    // Send the email
    await sendEmail(admin.email, 'Password Reset - MediSlot AI', emailHtml);
    
    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @route   POST /api/admin/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Invalid request' });
    }

    // Update password (in a real app, hash this first)
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password has been successfully reset.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
