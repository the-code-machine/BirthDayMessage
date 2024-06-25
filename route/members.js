const express = require('express');
const router = express.Router();
const Member = require('../models/members');

// Create a new member
router.post('/', async (req, res) => {
  try {
    const { name, dob, amountDonated ,description,number} = req.body;

    const newMember = new Member({
      name,
      dob,
      number,
      amountDonated,
      description
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
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
