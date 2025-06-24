const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  frameStyle: { type: String },
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Poster', PosterSchema);
