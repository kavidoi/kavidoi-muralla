const express = require('express');
const router = express.Router();
const Poster = require('../models/poster');

// GET all posters
router.get('/', async (req, res) => {
  try {
    const posters = await Poster.find();
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create new poster
router.post('/', async (req, res) => {
  try {
    const newPoster = new Poster(req.body);
    const savedPoster = await newPoster.save();
    res.status(201).json(savedPoster);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
