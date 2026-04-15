const express = require('express');
const router = express.Router();
const { user } = require('../config/controller/usercontroller');
const { login, forgotPassword } = require('../config/controller/authcontroller');

// ── User / Registration ─────────────────────────────────────────
// POST /api/user — register a new waitlist user
router.post('/user', user);

// ── Auth ────────────────────────────────────────────────────────
// POST /api/auth/login
router.post('/auth/login', login);

// POST /api/auth/forgot-password
router.post('/auth/forgot-password', forgotPassword);

// ── Simulator ───────────────────────────────────────────────────
// POST /api/simulate — acknowledge a career simulation request
router.post('/simulate', (req, res) => {
  const { role, interest } = req.body;
  if (!role || !interest) {
    return res.status(400).json({ status: 'error', message: 'role and interest are required' });
  }
  return res.status(200).json({
    status: 'ok',
    message: `Simulation roadmap queued for role: ${role}, interest: ${interest}`,
  });
});

module.exports = router;
