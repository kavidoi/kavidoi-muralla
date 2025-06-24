const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  frameStyle: { type: String },
  category: { type: String }
}, { timestamps: true });

let conn = null;
let Poster = null;

async function connectDB() {
  if (conn) return;
  conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  Poster = mongoose.models.Poster || mongoose.model('Poster', PosterSchema);
}

exports.handler = async function(event, context) {
  await connectDB();
  if (event.httpMethod === 'GET') {
    try {
      const posters = await Poster.find();
      return {
        statusCode: 200,
        body: JSON.stringify(posters)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server error' })
      };
    }
  }
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      const newPoster = new Poster(data);
      const savedPoster = await newPoster.save();
      return {
        statusCode: 201,
        body: JSON.stringify(savedPoster)
      };
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid data' })
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' })
  };
};
