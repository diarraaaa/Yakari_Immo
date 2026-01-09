'use client';

import React, { useState } from 'react';
import { Shield, Globe, Smartphone, TrendingUp, Users, Home, ArrowRight } from 'lucide-react';

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: "Sécurisé & Vérifié",
      description: "Toutes nos annonces sont vérifiées. Paiements sécurisés via Orange Money, Wave et cartes internationales."
    },
    {
      icon: Globe,
      title: "Accessible Partout",
      description: "Réservez depuis le Sénégal ou l'étranger. Visites virtuelles, paiements internationaux, gestion à distance."
    },
    {
      icon: Smartphone,
      title: "100% Digital",
      description: "Tout se fait en ligne : recherche, réservation, signature de contrat et paiement."
    },
    {
      icon: TrendingUp,
      title: "Transparent",
      description: "Prix clairs, pas de frais cachés. Système de notation pour propriétaires et locataires."
    },
    {
      icon: Users,
      title: "Support Dédié",
      description: "Notre équipe vous accompagne 7j/7 via WhatsApp, téléphone et messagerie interne."
    },
    {
      icon: Home,
      title: "Large Choix",
      description: "Studios, appartements, villas à Dakar, Thiès, Mbour, Saly et Saint-Louis."
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6 lg:px-20 bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header minimaliste */}
        <div className="mb-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
            Pourquoi choisir
            <br />
            <span className="text-secondary-500">Deukeulma</span> ?
          </h2>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
            Une solution complète pour simplifier votre recherche ou gestion immobilière
          </p>
        </div>

        {/* Grid des features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icône */}
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-secondary-500 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Titre */}
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-secondary-500 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Ligne décorative */}
                <div className="relative">
                  <div className="h-px bg-white/10 w-full"></div>
                  <div 
                    className="absolute top-0 left-0 h-px bg-secondary-500 transition-all duration-500"
                    style={{ width: hoveredIndex === idx ? '60px' : '0px' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA en bas */}
        <div className="mt-24 text-center">
        
        </div>
      </div>
    </section>
  );
}