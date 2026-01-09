'use client';

import React, { useState } from 'react';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';

export default function DiasporaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    { text: "Visites virtuelles 360°" },
    { text: "Paiements internationaux" },
    { text: "Contrats digitaux" },
    { text: "Gestion locative à distance" },
    { text: "Support multilingue" },
    { text: "Annonces certifiées" }
  ];

  return (
    <section id="diaspora" className="relative py-32 px-6 lg:px-20 bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Colonne gauche - Contenu */}
          <div>
            <div className="mb-8">
              <Globe className="w-12 h-12 text-secondary-500 mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
                Spécial Diaspora
                <br />
                <span className="text-secondary-500">Sénégalaise</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed">
                Vous êtes en France, USA, Italie ou ailleurs ? Louez ou gérez votre bien au Sénégal en toute tranquillité.
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-4 mt-12">
              <button className="inline-flex items-center gap-3 bg-secondary-500 hover:bg-secondary-600 transition px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Colonne droite - Liste des bénéfices */}
          <div className="space-y-6">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-start space-x-4 pb-6 border-b border-white/10 last:border-b-0"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icône check */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredIndex === idx 
                      ? 'bg-secondary-500 scale-110' 
                      : 'border-2 border-secondary-500'
                  }`}>
                    <CheckCircle className={`w-4 h-4 transition-colors ${
                      hoveredIndex === idx ? 'text-white' : 'text-secondary-500'
                    }`} />
                  </div>
                </div>

                {/* Texte */}
                <div className="flex-1">
                  <p className={`text-lg transition-colors duration-300 ${
                    hoveredIndex === idx ? 'text-white' : 'text-white/70'
                  }`}>
                    {item.text}
                  </p>
                  
                  {/* Ligne décorative */}
                  <div className="relative mt-3">
                    <div 
                      className="h-px bg-secondary-500 transition-all duration-500"
                      style={{ width: hoveredIndex === idx ? '40px' : '0px' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats en bas (optionnel) */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-secondary-500 mb-2">45+</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Pays couverts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-secondary-500 mb-2">24/7</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Support disponible</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-secondary-500 mb-2">100%</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Sécurisé</div>
          </div>
        </div>
      </div>
    </section>
  );
}