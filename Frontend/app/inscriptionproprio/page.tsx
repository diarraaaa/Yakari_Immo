'use client';

import React, { useState } from 'react';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, CreditCard, MapPin, Building2, FileText, Upload, X, Check } from 'lucide-react';

export default function ProprietaireRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    cin: '',
    cinExpiry: '',
    dateOfBirth: '',
    address: '',
    city: '',
    commune: '',
    profession: '',
    numberOfProperties: '1',
    propertyTypes: [] as string[],
    bankAccount: '',
    acceptTerms: false,
    acceptDataProcessing: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    cinRecto: null as File | null,
    cinVerso: null as File | null,
    proofOfAddress: null as File | null
  });

  const cities = ['Dakar', 'Thiès', 'Rufisque', 'Kaolack', 'Saint-Louis', 'Ziguinchor', 'Diourbel', 'Louga', 'Matam', 'Tambacounda', 'Kolda', 'Kaffrine', 'Kédougou', 'Sédhiou'];
  
  const propertyTypeOptions = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'chambre', label: 'Chambre' },
    { value: 'bureau', label: 'Bureau' },
    { value: 'terrain', label: 'Terrain' }
  ];

  const handleFileUpload = (type: keyof typeof uploadedFiles, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles({ ...uploadedFiles, [type]: file });
    }
  };

  const removeFile = (type: keyof typeof uploadedFiles) => {
    setUploadedFiles({ ...uploadedFiles, [type]: null });
  };

  const togglePropertyType = (type: string) => {
    setFormData({
      ...formData,
      propertyTypes: formData.propertyTypes.includes(type)
        ? formData.propertyTypes.filter(t => t !== type)
        : [...formData.propertyTypes, type]
    });
  };

  const handleSubmit = () => {
    console.log('Register Propriétaire:', { ...formData, uploadedFiles });
    // Simulation d'inscription réussie - redirection vers connexion
    setTimeout(() => {
      window.location.href = '/connexion-proprietaire';
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.fullName && formData.email && formData.phone && 
             formData.password && formData.password === formData.confirmPassword && formData.password.length >= 8;
    }
    if (currentStep === 2) {
      return formData.cin && formData.dateOfBirth && formData.address && 
             formData.city && uploadedFiles.cinRecto && uploadedFiles.cinVerso;
    }
    if (currentStep === 3) {
      return formData.propertyTypes.length > 0 && formData.acceptTerms;
    }
    return false;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#2d2d2d' }}>
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075" 
          alt="Villa au Sénégal"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #2d2d2d 0%, #4f4f4f 50%, #6c4f43 100%)', opacity: 0.95 }}></div>
      </div>

      {/* Header avec progression */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(45, 45, 45, 0.95)', borderBottom: '1px solid #4f4f4f' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: '#d4a574' }}>
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Deukeulma</span>
            </a>
            <div className="text-sm" style={{ color: '#b0b0b0' }}>
              Étape {currentStep} sur 3
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#4f4f4f' }}>
                <div 
                  className={`h-full transition-all duration-500`}
                  style={{ 
                    background: step <= currentStep ? '#d4a574' : 'transparent',
                    width: step <= currentStep ? '100%' : '0%'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Image inspirante selon l'étape */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={
                currentStep === 1 ? "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070" :
                currentStep === 2 ? "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096" :
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070"
              }
              alt="Propriété au Sénégal"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Titre de l'étape */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl mb-3 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {currentStep === 1 && "Informations personnelles"}
              {currentStep === 2 && "Vérification d'identité"}
              {currentStep === 3 && "Informations professionnelles"}
            </h1>
            <p className="text-lg" style={{ color: '#b0b0b0' }}>
              {currentStep === 1 && "Créez votre compte propriétaire en quelques étapes"}
              {currentStep === 2 && "Vérifiez votre identité pour sécuriser votre compte"}
              {currentStep === 3 && "Parlez-nous de vos biens immobiliers"}
            </p>
          </div>

          {/* Formulaire */}
          <div className="backdrop-blur-sm rounded-2xl p-8" style={{ backgroundColor: 'rgba(61, 61, 61, 0.5)', border: '1px solid #4f4f4f' }}>
            {/* Étape 1 */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Prénom et Nom"
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Adresse email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+221 XX XXX XX XX"
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                  <p className="mt-1.5 text-xs" style={{ color: '#888888' }}>
                    Ce numéro sera utilisé pour vous contacter
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: '#888888' }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs" style={{ color: '#888888' }}>
                    Minimum 8 caractères
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Confirmer le mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: '#888888' }}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2 */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(191, 160, 148, 0.1)', border: '1px solid rgba(191, 160, 148, 0.2)' }}>
                  <p className="text-sm flex items-start gap-2" style={{ color: '#eaddd7' }}>
                    <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      Ces informations sont nécessaires pour vérifier votre identité et sécuriser la plateforme. 
                      Toutes les données sont cryptées et conformes aux normes de protection des données.
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Numéro de Carte d'Identité Nationale (CIN) *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                    <input
                      type="text"
                      value={formData.cin}
                      onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                      placeholder="1 2345 67890 12345 6"
                      maxLength={20}
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Date de naissance *
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Date d'expiration CIN
                    </label>
                    <input
                      type="date"
                      value={formData.cinExpiry}
                      onChange={(e) => setFormData({ ...formData, cinExpiry: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Adresse complète *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5" style={{ color: '#888888' }} />
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Quartier, Rue, Numéro..."
                      rows={3}
                      className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white resize-none"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Ville *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    >
                      <option value="" style={{ backgroundColor: '#3d3d3d' }}>Sélectionner une ville</option>
                      {cities.map(city => (
                        <option key={city} value={city} style={{ backgroundColor: '#3d3d3d' }}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Commune
                    </label>
                    <input
                      type="text"
                      value={formData.commune}
                      onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                      placeholder="Nom de la commune"
                      className="w-full px-4 py-3.5 rounded-lg outline-none transition-all text-white"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>
                </div>

                {/* Upload documents */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-semibold mb-3" style={{ color: '#e7e7e7' }}>Documents requis</h3>
                  
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#d1d1d1' }}>
                      CIN (Recto) * <span className="text-xs" style={{ color: '#888888' }}>- Format: JPG, PNG, PDF (max 5MB)</span>
                    </label>
                    {!uploadedFiles.cinRecto ? (
                      <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all group" style={{ borderColor: '#4f4f4f' }}>
                        <Upload className="w-6 h-6" style={{ color: '#888888' }} />
                        <span className="text-sm" style={{ color: '#b0b0b0' }}>
                          Cliquer pour télécharger le recto
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('cinRecto', e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(132, 99, 88, 0.1)', border: '1px solid rgba(132, 99, 88, 0.3)' }}>
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5" style={{ color: '#d4a574' }} />
                          <span className="text-sm text-white">{uploadedFiles.cinRecto.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile('cinRecto')}
                          className="transition-colors"
                          style={{ color: '#888888' }}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#d1d1d1' }}>
                      CIN (Verso) *
                    </label>
                    {!uploadedFiles.cinVerso ? (
                      <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all group" style={{ borderColor: '#4f4f4f' }}>
                        <Upload className="w-6 h-6" style={{ color: '#888888' }} />
                        <span className="text-sm" style={{ color: '#b0b0b0' }}>
                          Cliquer pour télécharger le verso
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('cinVerso', e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(132, 99, 88, 0.1)', border: '1px solid rgba(132, 99, 88, 0.3)' }}>
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5" style={{ color: '#d4a574' }} />
                          <span className="text-sm text-white">{uploadedFiles.cinVerso.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile('cinVerso')}
                          className="transition-colors"
                          style={{ color: '#888888' }}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#d1d1d1' }}>
                      Justificatif de domicile <span className="text-xs" style={{ color: '#888888' }}>(Optionnel)</span>
                    </label>
                    {!uploadedFiles.proofOfAddress ? (
                      <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all group" style={{ borderColor: '#4f4f4f' }}>
                        <Upload className="w-6 h-6" style={{ color: '#888888' }} />
                        <span className="text-sm" style={{ color: '#b0b0b0' }}>
                          Facture d'eau, électricité...
                        </span>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload('proofOfAddress', e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgba(132, 99, 88, 0.1)', border: '1px solid rgba(132, 99, 88, 0.3)' }}>
                        <div className="flex items-center gap-3">
                          <Check className="w-5 h-5" style={{ color: '#d4a574' }} />
                          <span className="text-sm text-white">{uploadedFiles.proofOfAddress.name}</span>
                        </div>
                        <button
                          onClick={() => removeFile('proofOfAddress')}
                          className="transition-colors"
                          style={{ color: '#888888' }}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3 */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                    Profession
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="Ex: Entrepreneur, Fonctionnaire..."
                    className="w-full px-4 py-3.5 rounded-lg outline-none transition-all text-white"
                                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                      onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                      onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Nombre de biens immobiliers à gérer *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                      <select
                        value={formData.numberOfProperties}
                        onChange={(e) => setFormData({ ...formData, numberOfProperties: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white appearance-none"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                      >
                        <option value="1" style={{ backgroundColor: '#3d3d3d' }}>1</option>
                        <option value="2-5" style={{ backgroundColor: '#3d3d3d' }}>2-5</option>
                        <option value="6-10" style={{ backgroundColor: '#3d3d3d' }}>6-10</option>
                        <option value="10+" style={{ backgroundColor: '#3d3d3d' }}>Plus de 10</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: '#e7e7e7' }}>
                      Types de biens que vous possédez *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {propertyTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => togglePropertyType(option.value)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                            formData.propertyTypes.includes(option.value)
                              ? 'text-white'
                              : 'text-gray-400 hover:text-white'
                          }`}
                          style={{
                            backgroundColor: formData.propertyTypes.includes(option.value)
                              ? 'rgba(191, 160, 148, 0.2)'
                              : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${
                              formData.propertyTypes.includes(option.value)
                                ? '#d4a574'
                                : '#4f4f4f'
                            }`
                          }}
                        >
                          {formData.propertyTypes.includes(option.value) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 rounded border" style={{ borderColor: '#888888' }}></div>
                          )}
                          <span className="text-sm">{option.label}</span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs" style={{ color: '#888888' }}>
                      Sélectionnez au moins un type de bien
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#e7e7e7' }}>
                      Numéro de compte bancaire (Optionnel)
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#888888' }} />
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        placeholder="Pour les paiements des loyers"
                        className="w-full pl-12 pr-4 py-3.5 rounded-lg outline-none transition-all text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid #4f4f4f' }}
                        onFocus={(e) => e.target.style.borderColor = '#d4a574'}
                        onBlur={(e) => e.target.style.borderColor = '#4f4f4f'}
                      />
                    </div>
                    <p className="mt-1.5 text-xs" style={{ color: '#888888' }}>
                      Ce numéro sera utilisé pour vous verser les loyers
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="acceptTerms"
                          className={`flex items-center justify-center w-5 h-5 rounded transition-all cursor-pointer ${
                            formData.acceptTerms
                              ? 'bg-[#d4a574] border-[#d4a574]'
                              : 'border border-[#4f4f4f] hover:border-[#d4a574]'
                          }`}
                        >
                          {formData.acceptTerms && <Check className="w-3.5 h-3.5 text-white" />}
                        </label>
                      </div>
                      <label htmlFor="acceptTerms" className="text-sm cursor-pointer" style={{ color: '#e7e7e7' }}>
                        J'accepte les{' '}
                        <a href="#" className="underline hover:no-underline" style={{ color: '#d4a574' }}>
                          conditions générales d'utilisation
                        </a>{' '}
                        et la{' '}
                        <a href="#" className="underline hover:no-underline" style={{ color: '#d4a574' }}>
                          politique de confidentialité
                        </a>{' '}
                        *
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          id="acceptDataProcessing"
                          checked={formData.acceptDataProcessing}
                          onChange={(e) => setFormData({ ...formData, acceptDataProcessing: e.target.checked })}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="acceptDataProcessing"
                          className={`flex items-center justify-center w-5 h-5 rounded transition-all cursor-pointer ${
                            formData.acceptDataProcessing
                              ? 'bg-[#bfa094] border-[#bfa094]'
                              : 'border border-[#4f4f4f] hover:border-[#bfa094]'
                          }`}
                        >
                          {formData.acceptDataProcessing && <Check className="w-3.5 h-3.5 text-white" />}
                        </label>
                      </div>
                      <label htmlFor="acceptDataProcessing" className="text-sm cursor-pointer" style={{ color: '#e7e7e7' }}>
                        J'autorise le traitement de mes données personnelles conformément au RGPD
                      </label>
                    </div>
                  </div>
                </div>
           
            )}

            {/* Boutons de navigation */}
            <div className="flex justify-between pt-8 mt-8 border-t" style={{ borderColor: '#4f4f4f' }}>
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    color: '#d4a574',
                    backgroundColor: 'rgba(191, 160, 148, 0.1)',
                    border: '1px solid rgba(191, 160, 148, 0.3)'
                  }}
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Retour
                </button>
              ) : (
                <a
                  href="/connexion-proprietaire"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg transition-all font-medium hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    color: '#d4a574',
                    backgroundColor: 'rgba(191, 160, 148, 0.1)',
                    border: '1px solid rgba(191, 160, 148, 0.3)'
                  }}
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Déjà un compte ?
                </a>
              )}

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-lg transition-all font-medium ${
                    isStepValid()
                      ? 'hover:scale-[1.02] active:scale-[0.98]'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ 
                    color: 'white',
                    background: isStepValid() 
                      ? '#d4a574'
                      : '#d4a574',
                    border: 'none'
                  }}
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-lg transition-all font-medium ${
                    isStepValid()
                      ? 'hover:scale-[1.02] active:scale-[0.98]'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ 
                    color: 'white',
                    background: isStepValid() 
                      ? '#d4a574'
                      : '#d4a574',
                    border: 'none'
                  }}
                >
                  Créer mon compte
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Indicateur de progression */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 text-sm" style={{ color: '#b0b0b0' }}>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        step === currentStep ? 'scale-125' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: step === currentStep ? '#d4a574' : '#4f4f4f'
                      }}
                    />
                  ))}
                </div>
                <span>Étape {currentStep} sur 3</span>
              </div>
            </div>
          </div>

          {/* Informations de sécurité */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: '#888888' }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4a574' }}></div>
                <span>Données sécurisées</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4a574' }}></div>
                <span>Vérification d'identité</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4a574' }}></div>
                <span>Paiements protégés</span>
              </div>
            </div>
            <p className="mt-4 text-xs" style={{ color: '#666666' }}>
              La création de votre compte est soumise à validation sous 48h. Vous recevrez un email de confirmation.
            </p>
          </div>
        </div>
      </div>
  </div>
  );
}