import Image from 'next/image';

const artists = [
  {
    name: 'Juan Morales',
    avatar: '/artists/juan.jpg',
    bio: 'Artista migrante. Explora temas de identidad y pertenencia a través de colores vibrantes y formas geométricas.',
    interviewUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    news: [
      { title: 'Juan Morales: El arte como puente cultural', url: '#' },
      { title: 'Exhibición en Madrid rompe barreras', url: '#' }
    ]
  },
  {
    name: 'Ana Rayen',
    avatar: '/artists/ana.jpg',
    bio: 'Artista Mapuche. Fusiona técnicas ancestrales con estilos contemporáneos para visibilizar la cultura mapuche.',
    interviewUrl: '#',
    videoUrl: 'https://www.youtube.com/embed/3GwjfUFyY6M',
    news: [
      { title: 'Ana Rayen y la resistencia cultural', url: '#' },
      { title: 'Arte mapuche en la escena global', url: '#' }
    ]
  },
];

export default function ArtistSpotlight() {
  return (
    <section className="py-24 bg-gray-50" id="artist-spotlight">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Conoce al artista</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Entrevistas a fondo, videos y noticias sobre los creadores que inspiran nuestra colección.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {artists.map((artist, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <Image src={artist.avatar} alt={artist.name} width={120} height={120} className="rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{artist.name}</h3>
                <p className="text-gray-700 mb-4">{artist.bio}</p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <a href={artist.interviewUrl} className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition" target="_blank" rel="noopener noreferrer">Leer entrevista</a>
                  <a href={artist.videoUrl} className="inline-block border-2 border-black px-4 py-2 rounded hover:bg-black hover:text-white transition" target="_blank" rel="noopener noreferrer">Ver video</a>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Noticias recientes:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {artist.news.map((item, i) => (
                      <li key={i}><a href={item.url} className="hover:underline" target="_blank" rel="noopener noreferrer">{item.title}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
