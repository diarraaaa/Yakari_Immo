'use client';

import React, { useState } from 'react';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Logique de connexion ici
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      {/* Colonne gauche - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Deukeulma</span>
          </a>

          {/* Titre */}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Bon retour
              <br />
              <span className="text-secondary-500">parmi nous</span>
            </h1>
            <p className="text-white/60 text-lg">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Boutons sociaux */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg transition-all duration-300">
              <FaGoogle className="w-5 h-5" />
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg transition-all duration-300">
              <FaFacebookF className="w-5 h-5" />
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          {/* Séparateur */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-900 text-white/40">Ou avec votre email</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Se souvenir / Mot de passe oublié */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5"
                />
                <span className="text-sm text-white/60">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-secondary-500 hover:text-secondary-400 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              onClick={handleSubmit}
              className="group w-full py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Se connecter</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Inscription */}
          <p className="mt-8 text-center text-white/60">
            Pas encore de compte ?{' '}
            <a href="/inscription" className="text-secondary-500 hover:text-secondary-400 font-semibold transition-colors">
              Créer un compte
            </a>
          </p>
        </div>
      </div>

      {/* Colonne droite - Image/Contenu */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-800/50 items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="font-serif text-5xl mb-6 leading-tight">
            Trouvez votre
            <br />
            <span className="text-secondary-500">logement idéal</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed mb-8">
            Accédez à des milliers de propriétés vérifiées au Sénégal et gérez tout depuis votre tableau de bord.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-secondary-500 mb-1">2500+</div>
              <div className="text-sm text-white/60">Logements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-500 mb-1">5000+</div>
              <div className="text-sm text-white/60">Utilisateurs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-500 mb-1">98%</div>
              <div className="text-sm text-white/60">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}