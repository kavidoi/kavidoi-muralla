import Head from 'next/head';
import { useEffect, useState } from 'react';
import WallShowcase from '../components/WallShowcase';
import InstagramCarousel from '../components/InstagramCarousel';
import ArtistSpotlight from '../components/ArtistSpotlight';

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:5050/api/posters'
      : '/.netlify/functions/posters';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setPosters(data))
      .catch(err => console.error('Error fetching posters:', err));
  }, []);

  return (
    <>
      <Head>
        <title>Muralla | Posters con Causa</title>
        <meta name="description" content="Posters que apoyan artistas diversos" />
      </Head>
      <main className="antialiased bg-gray-50">
        {/* Navigation */}
        <nav className="fixed w-full z-50 p-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="text-xl font-bold tracking-tighter">MURALLA</a>
            {/* ... */}
          </div>
        </nav>

        {/* Hero */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
          <div className="z-10 max-w-5xl mx-auto px-8 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              ARTE CON IMPACTO <br />
              <span className="text-gray-500">EN TU PARED</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-12">
              Posters de artistas LGBTQ+, indígenas y de minorías étnicas. Cada compra apoya directamente al creador.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#gallery" className="inline-block bg-black text-white px-8 py-4 font-medium tracking-wide transition hover:bg-gray-900">
                Ver colección
              </a>
              <a href="#manifiesto" className="inline-block border-2 border-black px-8 py-4 font-medium tracking-wide transition hover:bg-black hover:text-white">
                Nuestro propósito
              </a>
            </div>
          </div>
        </section>

        {/* Wall Showcase */}
        <WallShowcase />

        {/* Instagram Carousel */}
        <InstagramCarousel />

        {/* Artist Spotlight */}
        <ArtistSpotlight />

        {/* Posters Gallery */}
        <section id="gallery" className="py-20 bg-gray-50 pt-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">GALERÍA DE POSTERS</h2>
              <p className="max-w-2xl mx-auto text-gray-600">Cada compra apoya directamente a artistas de comunidades diversas</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 poster-container">
              {posters.map(poster => (
                <div key={poster._id} className="poster-item aspect-[3/4] relative bg-white shadow rounded">
                  <img src={poster.imageUrl} alt={poster.title} className="w-full h-full object-cover" />
                  <div className="poster-frame border-8 border-black inset-0 pointer-events-none absolute"></div>
                  <div className="poster-info absolute bottom-0 left-0 right-0 bg-gradient-to-top from-black/80 to-transparent text-white p-6 opacity-0 hover:opacity-100 transition">
                    <h3 className="text-xl font-bold mb-1">{poster.title}</h3>
                    <p className="text-sm mb-4">{poster.artist}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${poster.price}</span>
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <i className="far fa-heart"></i>
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <i className="fas fa-shopping-bag"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
