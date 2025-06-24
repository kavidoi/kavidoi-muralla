import Image from 'next/image';
import { useRef, useEffect } from 'react';

const images = [
  '/insta/1.jpg',
  '/insta/2.jpg',
  '/insta/3.jpg',
  '/insta/4.jpg',
  '/insta/5.jpg',
  '/insta/6.jpg',
];

export default function InstagramCarousel() {
  const carouselRef = useRef();

  useEffect(() => {
    let animationId;
    let pos = 0;
    const speed = 0.15; // pixels per frame (very slow)
    function animate() {
      pos -= speed;
      if (carouselRef.current) {
        // Reset to start for infinite loop
        if (Math.abs(pos) >= carouselRef.current.scrollWidth / 2) {
          pos = 0;
        }
        carouselRef.current.style.transform = `translateX(${pos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate images for seamless infinite scroll
  const displayImages = [...images, ...images];

  return (
    <section className="py-24 bg-white" id="instagram-carousel">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="uppercase text-gray-400 font-semibold tracking-widest mb-2">Community Love</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">Join our community of 800K+ DROOL lovers</h2>
          <p className="text-gray-600 mb-4">Get inspiration on how to style DROOL prints</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-block text-2xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <div ref={carouselRef} className="flex whitespace-nowrap transition-transform duration-0" style={{willChange: 'transform'}}>
            {displayImages.map((src, i) => (
              <div key={i} className="relative w-72 h-80 md:w-96 md:h-80 flex-shrink-0">
                <Image src={src} alt={`Insta ${i+1}`} fill style={{objectFit: 'cover'}} className="rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
