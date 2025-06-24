const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Poster = require('../src/models/poster')

;(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  const result = await Poster.deleteMany({})
  console.log(`Deleted ${result.deletedCount} posters`)
  mongoose.disconnect()
})()
