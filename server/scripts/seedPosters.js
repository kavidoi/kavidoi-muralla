const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Poster = require('../src/models/poster');

const posters = [
  {
    title: 'Orgullo Ancestral',
    artist: 'Luisa Mena, artista Quechua',
    price: 14900,
    imageUrl: '/posters/orgullo-ancestral.jpg',
    frameStyle: 'black',
    category: 'Diversidad'
  },
  {
    title: 'Amor Sin Etiquetas',
    artist: 'Carlos Gutiérrez, colectivo LGBTQ+',
    price: 12500,
    imageUrl: '/posters/amor-sin-etiquetas.jpg',
    frameStyle: 'white',
    category: 'Arte Queer'
  },
  {
    title: 'Resistencia Mapuche',
    artist: 'Ana Rayen, artista Mapuche',
    price: 18900,
    imageUrl: '/posters/resistencia-mapuche.jpg',
    frameStyle: 'natural',
    category: 'Cultura Indígena'
  },
  {
    title: 'Fronteras Imaginarias',
    artist: 'Juan Morales, artista migrante',
    price: 22500,
    imageUrl: '/posters/fronteras-imaginarias.jpg',
    frameStyle: 'gold',
    category: 'Diversidad'
  },
  {
    title: 'Cuerpos Libres',
    artist: 'Camila Trans, activista trans',
    price: 16900,
    imageUrl: '/posters/cuerpos-libres.jpg',
    frameStyle: 'minimal',
    category: 'Feminismo'
  },
  {
    title: 'Raíces Afro',
    artist: 'Bemba Santos, colectivo afrodescendiente',
    price: 14900,
    imageUrl: '/posters/raices-afro.jpg',
    frameStyle: 'black',
    category: 'Diversidad'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Poster.deleteMany();
  await Poster.insertMany(posters);
  console.log('Posters de ejemplo agregados!');
  mongoose.disconnect();
}

seed();
