const express = require('express');
const router = express.Router();
const CustomMessage = require('../models/customMessage');

// Create a new member
router.post('/', async (req, res) => {
  try {
    const {message} = req.body;

    const newMember = new CustomMessage({
     message
    });

    const savedMember = await newMember.save();
    res.json(savedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all members
router.get('/', async (req, res) => {
  try {
    const message = await CustomMessage.find();
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
