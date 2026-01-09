'use client';

import React, { useState } from 'react';
import { Users, Home, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'locataires' | 'proprietaires'>('locataires');

  const locatairesSteps = [
    { step: "1", text: "Créez votre compte gratuitement" },
    { step: "2", text: "Recherchez par ville, quartier et budget" },
    { step: "3", text: "Contactez le propriétaire ou réservez en ligne" },
    { step: "4", text: "Signez le contrat et payez en toute sécurité" }
  ];

  const proprietairesSteps = [
    { step: "1", text: "Inscrivez-vous et vérifiez votre identité" },
    { step: "2", text: "Publiez votre annonce avec photos et vidéos" },
    { step: "3", text: "Recevez des demandes de locataires qualifiés" },
    { step: "4", text: "Gérez tout depuis votre tableau de bord" }
  ];

  const steps = activeTab === 'locataires' ? locatairesSteps : proprietairesSteps;

  return (
    <section id="how-it-works" className="relative py-32 px-6 lg:px-20 bg-dark-800/50 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header minimaliste */}
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Un processus simple en 4 étapes pour trouver ou louer votre logement
          </p>
        </div>

        {/* Toggle minimaliste */}
        <div className="flex gap-8 mb-16 border-b border-white/10">
          <button
            onClick={() => setActiveTab('locataires')}
            className={`pb-4 text-sm uppercase tracking-[0.2em] font-semibold transition-all relative ${
              activeTab === 'locataires'
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Pour les locataires
            {activeTab === 'locataires' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-500"></span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('proprietaires')}
            className={`pb-4 text-sm uppercase tracking-[0.2em] font-semibold transition-all relative ${
              activeTab === 'proprietaires'
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Home className="w-5 h-5 inline mr-2" />
            Pour les propriétaires
            {activeTab === 'proprietaires' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-500"></span>
            )}
          </button>
        </div>

        {/* Steps Grid - Style minimaliste */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((item, idx) => (
            <div key={idx} className="group flex items-start space-x-6">
              {/* Numéro */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 border-2 border-secondary-500 rounded-full flex items-center justify-center text-secondary-500 font-bold text-xl group-hover:bg-secondary-500 group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
              </div>

              {/* Contenu */}
              <div className="pt-2 flex-1">
                <p className="text-xl text-white/90 leading-relaxed group-hover:text-white transition-colors">
                  {item.text}
                </p>
                
                {/* Ligne décorative */}
                <div className="relative mt-4">
                  <div className="h-px bg-white/10 w-full"></div>
                  <div 
                    className="absolute top-0 left-0 h-px bg-secondary-500 w-0 group-hover:w-20 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA en bas */}
        <div className="mt-24 flex gap-4">
          <button className="inline-flex items-center gap-3 bg-secondary-500 hover:bg-secondary-600 transition px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold">
            Commencer
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="inline-flex items-center gap-3 border-2 border-white/20 hover:border-secondary-500 hover:bg-secondary-500/10 transition px-8 py-4 text-sm uppercase tracking-[0.2em] font-semibold">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
}