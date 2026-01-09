'use client';

import React, { useState } from 'react';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from 'lucide-react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<'locataire' | 'proprietaire'>('locataire');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    console.log('Register:', { ...formData, accountType });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      {/* Colonne gauche - Image/Contenu */}
      {/* Colonne gauche - Image de fond */}
<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
  {/* Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600')",
    }}
  />

  {/* Overlay sombre */}
  <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />

  {/* Contenu */}
<div className="relative z-10 flex items-start justify-center p-16 pt-24">
    <div className="max-w-lg">
      <h2 className="font-serif text-5xl mb-6 leading-tight">
        Rejoignez
        <br />
        <span className="text-secondary-500">Deukeulma</span>
      </h2>

      <p className="text-xl text-white/60 leading-relaxed mb-8">
        Créez votre compte et accédez à des milliers de propriétés au Sénégal.
        Que vous soyez locataire ou propriétaire, nous avons la solution pour vous.
      </p>

      {/* Avantages */}
      <div className="space-y-4">
        {[
          'Inscription gratuite et sans engagement',
          'Accès à 2500+ logements vérifiés',
          'Gestion simplifiée de vos annonces',
          'Support client 24/7',
        ].map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-secondary-500 rounded-full" />
            <span className="text-white/80">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Colonne droite - Formulaire */}
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
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Créer un
              <br />
              <span className="text-secondary-500">compte</span>
            </h1>
            <p className="text-white/60 text-lg">
              Commencez votre expérience immobilière dès maintenant
            </p>
          </div>

          {/* Type de compte */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-white/80 mb-3">
              Je suis...
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAccountType('locataire')}
                className={`py-3 px-4 rounded-lg border transition-all duration-300 ${
                  accountType === 'locataire'
                    ? 'bg-secondary-500/10 border-secondary-500 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                <div className="text-sm font-semibold">Locataire</div>
                <div className="text-xs text-white/40 mt-1">Je cherche un logement</div>
              </button>
              <button
                onClick={() => setAccountType('proprietaire')}
                className={`py-3 px-4 rounded-lg border transition-all duration-300 ${
                  accountType === 'proprietaire'
                    ? 'bg-secondary-500/10 border-secondary-500 text-white'
                    : 'border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                <div className="text-sm font-semibold">Propriétaire</div>
                <div className="text-xs text-white/40 mt-1">Je propose un bien</div>
              </button>
            </div>
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
          <div className="space-y-5">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Jean Dupont"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+221 XX XXX XX XX"
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* CGU */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-white/5 mt-1"
              />
              <span className="text-sm text-white/60">
                J'accepte les{' '}
                <a href="#" className="text-secondary-500 hover:text-secondary-400">conditions d'utilisation</a>
                {' '}et la{' '}
                <a href="#" className="text-secondary-500 hover:text-secondary-400">politique de confidentialité</a>
              </span>
            </label>

            {/* Bouton d'inscription */}
            <button
              onClick={handleSubmit}
              className="group w-full py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Créer mon compte</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Connexion */}
          <p className="mt-8 text-center text-white/60">
            Vous avez déjà un compte ?{' '}
            <a href="/connexion" className="text-secondary-500 hover:text-secondary-400 font-semibold transition-colors">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}