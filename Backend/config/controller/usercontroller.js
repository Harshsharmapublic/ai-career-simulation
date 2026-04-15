const usermodel = require("../../config/models/userschema");

const user = async (req, res) => {
  const { first_name, last_name, email, phone_number, username, password } = req.body;

  if (!first_name || !email || !phone_number || !username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please fill in all required fields (first_name, email, phone_number, username, password).',
    });
  }

  try {
    const existing = await usermodel.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      const field = existing.email === email ? 'email' : 'username';
      return res.status(409).json({ status: 'error', message: `That ${field} is already registered.` });
    }

    // NOTE: Hash password with bcryptjs before saving in production.
    const newuser = new usermodel({ first_name, last_name, email, phone_number, username, password });
    await newuser.save();

    return res.status(201).json({ status: 'ok', message: 'Account created successfully!' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Server error. Please try again.' });
  }
};

module.exports = { user };