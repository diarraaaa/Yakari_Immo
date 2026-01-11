'use client';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, MapPin, Search, Shield } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

export default function RegisterTenant() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    console.error("Les mots de passe ne correspondent pas");
    return;
  }

  try {
    const res = await fetch(
      `${api}/api/signup/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.email,
          email: formData.email,
          telephone: formData.phone,
          password: formData.password,
          role: "locataire",
        }),
      }
    );

    const data = await res.json();
    console.log(res.status, data);

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
  }
};

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      {/* Colonne gauche - Image de fond */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600')",
          }}
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm" />

        {/* Contenu */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">
          <div>
            <a href="/" className="flex items-center gap-3 mb-12 group">
              <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Home className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">Deukeulma</span>
            </a>

            <h2 className="font-serif text-5xl lg:text-6xl mb-6 leading-tight">
              Trouvez votre
              <br />
              <span className="text-secondary-500">chez-vous</span>
            </h2>

            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Rejoignez notre plateforme et accédez à des milliers de logements vérifiés au Sénégal.
            </p>
          </div>

          {/* Avantages avec icônes */}
          <div className="space-y-6">
            {[
              { icon: Search, text: 'Recherche simplifiée de logements' },
              { icon: Shield, text: 'Annonces 100% vérifiées' },
              { icon: MapPin, text: 'Partout au Sénégal' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-500/20 border border-secondary-500/30 rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-secondary-500" />
                </div>
                <span className="text-lg text-white/90">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">
              Inscription gratuite • Visites virtuelles • Support 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Colonne droite - Formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <a href="/" className="flex lg:hidden items-center gap-3 mb-8 group">
            <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">Deukeulma</span>
          </a>

          {/* Titre */}
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-secondary-500/10 border border-secondary-500/20 rounded-full mb-4">
              <span className="text-secondary-500 text-sm font-semibold">Espace Locataire</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Créer un
              <br />
              <span className="text-secondary-500">compte</span>
            </h1>
            <p className="text-white/60 text-lg">
              Commencez votre recherche de logement dès aujourd'hui
            </p>
          </div>

          {/* Connexion avec Google */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
            try {
              const res = await fetch(`${api}/api/google-auth/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: credentialResponse.credential,
                  role:"locataire"
                }),
              });

              const data = await res.json();
              if (!res.ok) throw new Error(data.detail);
              console.log("Google login successful:", data);
              localStorage.setItem("access", data.access);
              localStorage.setItem("refresh", data.refresh);
            } catch (err) {
              console.error(err);
            }
            }}
            onError={() => console.log("Login Failed")}

          />
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
                Nom 
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Jean"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary-500 focus:bg-white/10 outline-none transition-all text-white placeholder:text-white/40"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Dupont"
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

            {/* Localisation recherchée */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Où cherchez-vous ? <span className="text-white/40 text-xs">(optionnel)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Dakar, Thiès, Mbour..."
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
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 mt-1"
              />
              <span className="text-sm text-white/60">
                J'accepte les{' '}
                <a href="/conditions" className="text-secondary-500 hover:text-secondary-400">
                  conditions d'utilisation
                </a>
                {' '}et la{' '}
                <a href="/confidentialite" className="text-secondary-500 hover:text-secondary-400">
                  politique de confidentialité
                </a>
              </span>
            </label>

            {/* Bouton d'inscription */}
            <button
              onClick={handleSubmit}
              className="group w-full py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Créer mon compte locataire</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Liens */}
          <div className="mt-8 space-y-3 text-center">
            <p className="text-white/60">
              Vous avez déjà un compte ?{' '}
              <a href="/connexion" className="text-secondary-500 hover:text-secondary-400 font-semibold transition-colors">
                Se connecter
              </a>
            </p>
            <p className="text-white/60">
              Vous êtes propriétaire ?{' '}
              <a href="/inscription/proprietaire" className="text-secondary-500 hover:text-secondary-400 font-semibold transition-colors">
                Créer un compte propriétaire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}