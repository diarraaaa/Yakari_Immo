'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 lg:px-20 bg-dark-800/50 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          {/* Titre */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
            Prêt à commencer ?
          </h2>
          
          {/* Description */}
          <p className="text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
            Rejoignez des milliers d'utilisateurs qui font confiance à Deukeulma pour leurs besoins immobiliers
          </p>

          {/* Boutons */}
          <div className="flex flex-wrap gap-4">
            <button className="group inline-flex items-center gap-3 bg-secondary-500 hover:bg-secondary-600 transition px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold">
              Créer un compte
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="inline-flex items-center gap-3 border-2 border-white/20 hover:border-secondary-500 hover:bg-secondary-500/10 transition px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold">
              Contacter le support
            </button>
          </div>

          {/* Ligne décorative */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>Inscription gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}