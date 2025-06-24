/*
  Scan public/posters directory and insert any images not yet in the Posters collection.
  Usage: node server/scripts/bulkAddPosters.js
*/
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const Poster = require('../src/models/poster')

const PUBLIC_DIR = path.join(__dirname, '../../muralla-dashboard/public/posters')

const categories = ['Diversidad', 'Arte Urbano', 'Cultura Pop']
const artists = ['Ana Vega', 'Carlos Ruiz', 'Marta Díaz', 'Luis Gómez']

const adjectives = ['Brillante', 'Eterno', 'Vibrante', 'Místico', 'Radiante', 'Silente', 'Audaz', 'Sereno']
const nouns = ['Horizonte', 'Sueño', 'Eco', 'Visión', 'Destino', 'Latido', 'Recuerdo', 'Esencia']
function randomTitle () {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adj} ${noun}`
}

async function run () {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  const files = fs.readdirSync(PUBLIC_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  const existing = await Poster.find({}).select('imageUrl -_id').lean()
  const existingFilenames = new Set(existing.map((p) => path.basename(p.imageUrl)))

  const toInsert = []
  files.forEach((file) => {
    if (existingFilenames.has(file)) return
    const title = randomTitle()
    const poster = {
      title,
      artist: artists[Math.floor(Math.random() * artists.length)],
      price: 14900 + Math.floor(Math.random() * 7000), // random price 14.9k–21.9k
      imageUrl: `/posters/${file}`,
      frameStyle: 'black',
      category: categories[Math.floor(Math.random() * categories.length)]
    }
    toInsert.push(poster)
  })

  if (toInsert.length === 0) {
    console.log('No new posters found.')
    return process.exit(0)
  }

  await Poster.insertMany(toInsert)
  console.log(`Inserted ${toInsert.length} new posters.`)
  mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
