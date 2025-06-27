const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.patch('/:id/status', async (req, res) => {
  try {
    const driver = await User.findById(req.params.id);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ error: 'Driver not found' });
    }
    driver.availability = req.body.availability;
    await driver.save();
    res.status(200).json({ message: 'Availability updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;