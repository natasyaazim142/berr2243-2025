const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.delete('/users/:id', async (req, res) => {
  const adminId = req.header('x-admin-id'); // Fake check for example
  const admin = await User.findById(adminId);
  if (!admin || admin.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.isBlocked = true;
  await user.save();
  res.status(204).send();
});

module.exports = router;