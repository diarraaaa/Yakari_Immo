'use client';

import React from 'react';
import { Home, User, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterChoice() {
  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-16 h-16 bg-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
            <Home className="w-9 h-9 text-white" />
          </div>
          <span className="text-3xl font-bold">Deukeulma</span>
        </div>

        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">
            Rejoignez
            <br />
            <span className="text-secondary-500">Deukeulma</span>
          </h1>
          <p className="text-xl text-white/60">
            Choisissez le type de compte qui vous correspond
          </p>
        </div>

        {/* Cartes de choix */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Carte Locataire */}
          <Link
            href="/inscription/locataire"
            className="group p-8 bg-white/5 border border-white/10 hover:border-secondary-500/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 text-left block"
          >
            <div className="w-16 h-16 bg-secondary-500/20 border border-secondary-500/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary-500/30 transition-all">
              <User className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Je suis locataire</h3>
            <p className="text-white/60 mb-6">
              Je cherche un logement à louer au Sénégal
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Accès à 2500+ annonces
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Recherche personnalisée
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Alertes en temps réel
              </li>
            </ul>
          </Link>

          {/* Carte Propriétaire */}
          <Link
            href="/inscription/proprietaire"
            className="group p-8 bg-white/5 border border-white/10 hover:border-secondary-500/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 text-left block"
          >
            <div className="w-16 h-16 bg-secondary-500/20 border border-secondary-500/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary-500/30 transition-all">
              <Building2 className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Je suis propriétaire</h3>
            <p className="text-white/60 mb-6">
              Je souhaite mettre mon bien en location
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Gestion simplifiée
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Visibilité maximale
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full" />
                Outils professionnels
              </li>
            </ul>
          </Link>
        </div>

        {/* Lien connexion */}
        <p className="text-center mt-12 text-white/60">
          Vous avez déjà un compte ?{' '}
          <Link href="/connexion" className="text-secondary-500 hover:text-secondary-400 font-semibold transition-colors">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}