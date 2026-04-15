const usermodel = require('../../config/models/userschema');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
  }

  try {
    const foundUser = await usermodel.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ status: 'error', message: 'No account found with that email.' });
    }

    // NOTE: For production, compare hashed passwords with bcryptjs.
    if (foundUser.password !== password) {
      return res.status(401).json({ status: 'error', message: 'Incorrect password.' });
    }

    return res.status(200).json({
      status: 'ok',
      message: 'Login successful',
      user: {
        id: foundUser._id,
        first_name: foundUser.first_name,
        email: foundUser.email,
        username: foundUser.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Server error. Please try again.' });
  }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email is required.' });
  }

  try {
    const foundUser = await usermodel.findOne({ email });
    // Always return success to avoid exposing whether an email exists (security best practice).
    if (!foundUser) {
      return res.status(200).json({
        status: 'ok',
        message: 'If an account with that email exists, a reset link has been sent.',
      });
    }

    // TODO: Integrate an email service (e.g. Nodemailer + Gmail) to send a real reset link.
    return res.status(200).json({
      status: 'ok',
      message: 'If an account with that email exists, a reset link has been sent.',
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Server error. Please try again.' });
  }
};

module.exports = { login, forgotPassword };
