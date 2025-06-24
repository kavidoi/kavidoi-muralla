import Image from 'next/image';

const posters = [
  {
    id: 'eight-legs',
    title: 'Eight Legs, No Problem',
    image: '/wall/eight-legs.jpg',
    shopUrl: '#',
  },
  {
    id: 'pot-20',
    title: 'Pot 20',
    image: '/wall/pot-20.jpg',
    shopUrl: '#',
  },
  {
    id: 'lonesome',
    title: 'Lonesome',
    image: '/wall/lonesome.jpg',
    shopUrl: '#',
  },
  {
    id: 'revolt',
    title: 'Revolt',
    image: '/wall/revolt.jpg',
    shopUrl: '#',
  },
];

export default function WallShowcase() {
  return (
    <section className="py-20 bg-white" id="wall-showcase">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-2">Vitrinea esta muralla</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Descubre y compra los posters que ves en esta composición. Haz clic en cada uno para ver más detalles o agregarlo a tu carrito.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Wall photo */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image src="/wall/room-wall.jpg" alt="Muralla de inspiración" fill style={{objectFit: 'cover'}} />
            {/* Poster hotspots (for demo: just overlay circles) */}
            <div className="absolute inset-0 flex flex-wrap items-center justify-center pointer-events-none">
              {posters.map((p, i) => (
                <span key={p.id} className="w-10 h-10 bg-white/80 border-2 border-black rounded-full flex items-center justify-center absolute" style={{top: `${20 + 18*i}%`, left: `${25 + 18*(i%2)}%`}}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2 2" /></svg>
                </span>
              ))}
            </div>
          </div>
          {/* Posters list */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-1/2">
            {posters.map(poster => (
              <div key={poster.id} className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center">
                <Image src={poster.image} alt={poster.title} width={160} height={160} className="rounded mb-2 object-cover" />
                <h3 className="font-semibold text-lg mb-1 text-center">{poster.title}</h3>
                <a href={poster.shopUrl} className="mt-2 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Shop</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
