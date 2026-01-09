'use client';

import React from 'react';
import { Home, Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-900 py-20 px-6 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
          {/* Logo et description */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Deukeulma</span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed max-w-sm">
              La plateforme immobilière de référence au Sénégal. Trouvez ou louez votre logement idéal en toute confiance.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              {[
                { Icon: FaFacebookF, href: '#', label: 'Facebook' },
                { Icon: FaInstagram, href: '#', label: 'Instagram' },
                { Icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
                { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-secondary-500 hover:bg-secondary-500/10 text-white/60 hover:text-secondary-500 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Liens rapides */}
          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold text-white mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Rechercher', href: '#' },
                { label: 'Publier', href: '#' },
                { label: 'Tarifs', href: '#pricing' },
                { label: 'Blog', href: '#' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold text-white mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Centre d\'aide', href: '#' },
                { label: 'FAQ', href: '#' },
                { label: 'Contact', href: '#' },
                { label: 'CGU', href: '#' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-[0.2em] font-semibold text-white mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/80">+221 XX XXX XX XX</p>
                  <p className="text-white/40 text-xs mt-1">Lun-Sam, 8h-20h</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/80">contact@deukeulma.sn</p>
                  <p className="text-white/40 text-xs mt-1">Réponse sous 24h</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white/80">Dakar, Sénégal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Ligne de séparation */}
        <div className="h-px bg-white/10 mb-8"></div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/40 text-sm">
            © 2025 Deukeulma. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <span className="text-white/20">•</span>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}