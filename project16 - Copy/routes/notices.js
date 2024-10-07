const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

// Add new notice
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    res.status(201).send('Notice added successfully');
  } catch (error) {
    res.status(500).send('Error adding notice');
  }
});

// View all notices
router.get('/view', async (req, res) => {
  const notices = await Notice.find();
  res.json(notices);
});

// Edit a notice
router.put('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  await Notice.findByIdAndUpdate(req.params.id, { title, content });
  res.send('Notice updated successfully');
});

// Delete a notice
router.delete('/delete/:id', async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.send('Notice deleted successfully');
});

module.exports = router;
