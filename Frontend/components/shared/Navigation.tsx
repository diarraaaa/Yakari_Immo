'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Menu, X, ArrowRight } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '#' },
    { label: 'Avantages', href: '#features' },
    { label: 'Fonctionnement', href: '#how-it-works' },
    { label: 'Diaspora', href: '#diaspora' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${
          scrolled
            ? 'bg-dark-900/95 backdrop-blur-2xl border-white/10'
            : 'bg-dark-900/50 backdrop-blur-xl border-white/5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-secondary-500 transition-colors">
              Deukeulma
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/connexion"
              className="px-6 py-2 text-sm font-semibold text-white/60 hover:text-white
                         border border-white/10 hover:border-white/20 rounded-full
                         transition-all duration-300"
            >
              Connexion
            </Link>

            <Link
              href="/inscription"
              className="group px-6 py-2 bg-secondary-500 hover:bg-secondary-600
                         rounded-full font-semibold text-sm text-white
                         transition-all duration-300 flex items-center gap-2"
            >
              <span>S'inscrire</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center
                       text-white/60 hover:text-white border border-white/10
                       hover:border-white/20 rounded-lg transition-all duration-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-dark-900/98 backdrop-blur-2xl border-t border-white/10">
          <div className="px-6 py-6 space-y-1">

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base text-white/60
                           hover:text-white hover:bg-white/5
                           rounded-lg transition-all duration-300"
              >
                {item.label}
              </a>
            ))}

            <div className="h-px bg-white/10 my-4"></div>

            {/* Mobile CTA */}
            <Link
              href="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 text-sm font-semibold
                         text-white/60 border border-white/10
                         hover:border-white/20 rounded-lg
                         transition-all duration-300"
            >
              Connexion
            </Link>

            <Link
              href="/inscription"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full group px-6 py-3 bg-secondary-500 hover:bg-secondary-600
                         rounded-lg font-semibold text-sm text-white
                         transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>S'inscrire gratuitement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
