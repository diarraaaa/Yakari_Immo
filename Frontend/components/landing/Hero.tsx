'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const slides = [
  {
    title: `Trouver un logement\nsimplement,\nen toute confiance`,
    subtitle: 'Découvrez des milliers de propriétés vérifiées',

  },
  {
    title: `Une plateforme pensée\npour le Sénégal\net le monde entier`,
    subtitle: 'Accessible depuis le Sénégal et partout dans le monde',
  
  },
  {
    title: `Propriétaires et locataires\nconnectés\nen toute transparence`,
    subtitle: 'Un écosystème de confiance et de simplicité',

  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / 60); // 6 secondes = 60 frames
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setIndex((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }
  }, [progress]);

  const handleSlideChange = (newIndex: number) => {
    setIndex(newIndex);
    setProgress(0);
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background avec gradient animé */}
      <div className="absolute inset-0">
        {/* Video/Image placeholder avec overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920')] bg-cover bg-center opacity-30"></div>
        
        {/* Gradient overlay animé */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000`}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />

        {/* Animated blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Barre latérale gauche avec réseaux sociaux */}
      <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-8">
        {/* Trait vertical animé */}
        <div className="relative h-32 w-px bg-white/20 overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent"
            style={{
              height: '50%',
              animation: 'slideDown 3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Icônes sociales */}
        <div className="flex flex-col gap-5">
          {[
            { Icon: FaFacebookF, href: '#', color: 'hover:text-blue-400' },
            { Icon: FaInstagram, href: '#', color: 'hover:text-pink-400' },
            { Icon: FaLinkedinIn, href: '#', color: 'hover:text-blue-500' },
            { Icon: FaTwitter, href: '#', color: 'hover:text-sky-400' }
          ].map(({ Icon, href, color }, i) => (
            <a
              key={i}
              href={href}
              className={`text-white/60 ${color} transition-all duration-300 hover:scale-125 transform`}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Trait vertical bas */}
        <div className="h-32 w-px bg-white/20" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-screen flex items-center px-6 lg:px-20">
        <div className="max-w-6xl ml-10 lg:ml-32">
          {/* Badge animé */}
      
          {/* Titre principal avec animation */}
          <h1
            key={index}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight mb-6 animate-slide-up"
          >
            {slides[index].title.split('\n').map((line, i) => (
              <span 
                key={i} 
                className="block"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  animation: 'fadeInUp 0.8s ease forwards'
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Sous-titre */}
          <p 
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {slides[index].subtitle}
          </p>

          {/* Boutons CTA */}
          <div 
            className="flex flex-wrap gap-4 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
          
         
          </div>
        </div>
      </div>

      {/* Navigation des slides (bas droite) */}
      <div className="absolute bottom-12 right-12 z-20 flex items-center gap-8">
        <div className="flex items-center gap-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSlideChange(i)}
              className="group flex flex-col items-center gap-2"
            >
              <span className={`text-sm font-mono tracking-widest transition-all duration-300 ${
                i === index ? 'text-white text-base' : 'text-white/40 hover:text-white/70'
              }`}>
                0{i + 1}
              </span>
              {/* Barre de progression */}
              {i === index && (
                <div className="w-12 h-0.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Séparateur */}
        <div className="w-24 h-px bg-white/20" />

        {/* Indicateur de slide */}
        <div className="flex items-baseline gap-2 font-mono text-sm">
          <span className="text-white text-2xl">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/40">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-white/60">Défiler</span>
        <ChevronDown className="w-5 h-5 text-white/60" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease forwards;
        }

        .animate-slide-up {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}