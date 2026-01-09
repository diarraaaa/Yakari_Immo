'use client';

import React, { useState } from 'react';
import { Home, Plus, TrendingUp, Users, DollarSign, FileText, Video, Edit, Trash2, Star, Calendar, Key, CheckSquare, Eye, MessageSquare, ChevronRight, Bell, User, Settings, Send, Download, Upload, Phone, Mail, MapPin, Clock, FileSignature, X, Check } from 'lucide-react';

// Données de démonstration
const initialAnnonces = [
  {
    id: 1,
    titre: "Villa moderne 4 chambres",
    type: "Villa",
    prix: 450000,
    localisation: "Almadies, Dakar",
    chambres: 4,
    sallesBain: 3,
    surface: 250,
    duree: "Vente",
    statut: "actif",
    featured: true,
    vues: 234,
    demandes: 12,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"
  },
  {
    id: 2,
    titre: "Appartement centre-ville",
    type: "Appartement",
    prix: 350000,
    localisation: "Plateau, Dakar",
    chambres: 3,
    sallesBain: 2,
    surface: 120,
    duree: "6 mois",
    statut: "actif",
    featured: false,
    vues: 189,
    demandes: 8,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
  },
  {
    id: 3,
    titre: "Studio meublé",
    type: "Studio",
    prix: 150000,
    localisation: "Mermoz, Dakar",
    chambres: 1,
    sallesBain: 1,
    surface: 45,
    duree: "12 mois",
    statut: "loué",
    featured: false,
    vues: 156,
    demandes: 5,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
  }
];

const locataires = [
  { 
    id: 1, 
    nom: "Amadou Diallo", 
    bien: "Villa moderne 4 chambres", 
    loyer: 450000, 
    statut: "à jour", 
    prochainPaiement: "15 Jan 2025",
    email: "amadou.diallo@email.com",
    telephone: "+221 77 123 45 67",
    dateEntree: "01 Jan 2024",
    caution: 900000,
    photo: "https://i.pravatar.cc/150?img=12"
  },
  { 
    id: 2, 
    nom: "Fatou Sow", 
    bien: "Studio meublé", 
    loyer: 150000, 
    statut: "à jour", 
    prochainPaiement: "20 Jan 2025",
    email: "fatou.sow@email.com",
    telephone: "+221 76 234 56 78",
    dateEntree: "15 Mars 2024",
    caution: 300000,
    photo: "https://i.pravatar.cc/150?img=5"
  },
  { 
    id: 3, 
    nom: "Moussa Ba", 
    bien: "Appartement centre-ville", 
    loyer: 350000, 
    statut: "retard", 
    prochainPaiement: "10 Jan 2025",
    email: "moussa.ba@email.com",
    telephone: "+221 78 345 67 89",
    dateEntree: "20 Juin 2024",
    caution: 700000,
    photo: "https://i.pravatar.cc/150?img=33"
  }
];

const paiements = [
  { id: 1, locataire: "Amadou Diallo", montant: 450000, date: "15 Déc 2024", statut: "reçu" },
  { id: 2, locataire: "Fatou Sow", montant: 150000, date: "20 Déc 2024", statut: "reçu" },
  { id: 3, locataire: "Moussa Ba", montant: 350000, date: "En attente", statut: "en attente" }
];

const notifications = [
  { id: 1, type: "paiement", message: "Paiement reçu de Amadou Diallo - 450,000 FCFA", temps: "Il y a 1h", lu: false },
  { id: 2, type: "demande", message: "Nouvelle demande de visite pour Villa moderne", temps: "Il y a 3h", lu: false },
  { id: 3, type: "contrat", message: "Contrat signé par Fatou Sow", temps: "Il y a 5h", lu: true },
  { id: 4, type: "alerte", message: "Paiement en retard - Moussa Ba", temps: "Il y a 1j", lu: false },
  { id: 5, type: "maintenance", message: "Demande de réparation - Climatisation", temps: "Il y a 2j", lu: true }
];

const messages = [
  { id: 1, locataireId: 1, expediteur: "Amadou Diallo", message: "Bonjour, j'aimerais discuter du renouvellement du contrat", temps: "10:30", date: "26 Déc", lu: false },
  { id: 2, locataireId: 2, expediteur: "Fatou Sow", message: "La climatisation ne fonctionne plus", temps: "14:20", date: "25 Déc", lu: true },
  { id: 3, locataireId: 3, expediteur: "Moussa Ba", message: "Je vais effectuer le paiement demain", temps: "09:15", date: "24 Déc", lu: true }
];

const proprietaireInfo = {
  nom: "Mamadou Ndiaye",
  email: "mamadou.ndiaye@deukeulma.com",
  telephone: "+221 77 999 88 77",
  adresse: "Almadies, Dakar, Sénégal",
  photo: "https://i.pravatar.cc/150?img=68",
  biensTotal: 8,
  biensLoues: 3,
  revenuAnnuel: 10800000,
  dateInscription: "Janvier 2023"
};

const ProprietaireDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [annonces, setAnnonces] = useState(initialAnnonces);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedLocataire, setSelectedLocataire] = useState(null);
  const [showMessagerie, setShowMessagerie] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showContratModal, setShowContratModal] = useState(false);
  const [selectedContratLocataire, setSelectedContratLocataire] = useState(null);
  const [notifList, setNotifList] = useState(notifications);
  const unreadCount = notifList.filter(n => !n.lu).length;
  
  const heroImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=400&fit=crop"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalAnnonces: annonces.length,
    annonceActives: annonces.filter(a => a.statut === 'actif').length,
    totalLocataires: locataires.length,
    revenuMensuel: locataires.reduce((sum, l) => sum + l.loyer, 0),
    tauxOccupation: 67,
    demandesEnAttente: annonces.reduce((sum, a) => sum + a.demandes, 0)
  };

  // Styles CSS personnalisés
  const styles = {
    primaryColor: '#d4a574',
    primaryLight: '#e8c9a6',
    primaryDark: '#b38b5a',
    darkBg: '#1a1a1a',
    darkCard: '#2d2d2d',
    darkBorder: '#404040',
    textLight: '#f0f0f0',
    textGray: '#a0a0a0'
  };

  const StatCard = ({ icon: Icon, label, value, subtext, trend }) => (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Icon size={18} />
            <span>{label}</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
        </div>
        {trend && (
          <div className={`px-2 py-1 rounded text-xs font-semibold ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </div>
  );

  const AnnonceCard = ({ annonce }) => (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-lg group hover:border-d4a574 transition-all duration-300">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img src={annonce.image} alt={annonce.titre} className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-500" />
        {annonce.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
            <Star size={12} fill="currentColor" />
            En avant
          </div>
        )}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${annonce.statut === 'actif' ? 'bg-green-500' : 'bg-gray-500'}`}>
          {annonce.statut === 'actif' ? 'Actif' : 'Loué'}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-d4a574 transition-colors">{annonce.titre}</h3>
      <div className="text-gray-400 text-sm mb-2">{annonce.localisation}</div>
      
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <span>{annonce.chambres} ch.</span>
        <span>{annonce.sallesBain} sdb</span>
        <span>{annonce.surface} m²</span>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold" style={{color: styles.primaryColor}}>
          {annonce.prix.toLocaleString()} FCFA
        </div>
        <div className="text-sm text-gray-400">{annonce.duree}</div>
      </div>
      
      <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-1">
          <Eye size={16} className="text-gray-400" />
          <span className="text-gray-300">{annonce.vues}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={16} className="text-gray-400" />
          <span className="text-gray-300">{annonce.demandes}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors"
          style={{backgroundColor: styles.primaryColor, color: 'white'}}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}
        >
          <Edit size={16} />
          Modifier
        </button>
        <button className="px-3 py-2 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 rounded transition-colors">
          <Trash2 size={16} />
        </button>
        <button className="px-3 py-2 border border-gray-600 hover:border-yellow-500 text-gray-300 hover:text-yellow-400 rounded transition-colors">
          <Star size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div style={{backgroundColor: styles.darkBg, minHeight: '100vh', color: 'white'}}>
      {/* Hero Header avec carrousel */}
      <header className="relative overflow-hidden" style={{height: '400px'}}>
        {/* Carrousel d'images */}
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: idx === currentImageIndex ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0" style={{background: `linear-gradient(135deg, rgba(132, 99, 88, 0.6) 0%, rgba(212, 165, 116, 0.3) 100%)`}} />
        </div>

        {/* Contenu du header */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-between py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{background: `linear-gradient(135deg, ${styles.primaryColor} 0%, ${styles.primaryLight} 100%)`}}
              >
                <Home size={28} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-300 font-medium">Plateforme Deukeulma</div>
                <div className="text-lg font-bold text-white">Espace Propriétaire</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell size={24} className="text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Messagerie */}
              <button 
                onClick={() => setShowMessagerie(true)}
                className="relative p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <MessageSquare size={24} className="text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{backgroundColor: styles.primaryColor}}>
                  {messages.filter(m => !m.lu).length}
                </span>
              </button>
              
              {/* Profil */}
              <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <img src={proprietaireInfo.photo} alt="Profil" className="w-10 h-10 rounded-full border-2 border-white" />
                <div className="text-left hidden md:block">
                  <div className="text-sm font-semibold text-white">{proprietaireInfo.nom}</div>
                  <div className="text-xs text-gray-300">Propriétaire</div>
                </div>
              </button>
              
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg"
                style={{backgroundColor: styles.primaryColor, color: 'white'}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}
              >
                <Plus size={20} />
                Nouvelle annonce
              </button>
            </div>
          </div>

          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Dashboard Propriétaire
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl drop-shadow">
              Gérez vos biens immobiliers et vos locataires en toute simplicité
            </p>
            
            {/* Indicateurs de carrousel */}
            <div className="flex gap-2 mt-6">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className="transition-all"
                  style={{
                    width: idx === currentImageIndex ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: idx === currentImageIndex ? styles.primaryColor : 'rgba(255,255,255,0.4)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b" style={{borderColor: styles.darkBorder, backgroundColor: styles.darkCard}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
              { id: 'annonces', label: 'Mes annonces', icon: FileText },
              { id: 'locataires', label: 'Locataires', icon: Users },
              { id: 'paiements', label: 'Paiements', icon: DollarSign },
              { id: 'contrats', label: 'Contrats', icon: FileText },
              { id: 'visites', label: 'Visites', icon: Video },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-b-2 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{borderColor: activeTab === tab.id ? styles.primaryColor : 'transparent'}}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={FileText} label="Total annonces" value={stats.totalAnnonces} subtext={`${stats.annonceActives} actives`} trend={12} />
              <StatCard icon={Users} label="Locataires" value={stats.totalLocataires} subtext="3 biens loués" />
              <StatCard icon={DollarSign} label="Revenu mensuel" value={`${(stats.revenuMensuel / 1000).toFixed(0)}K`} subtext="FCFA" trend={8} />
              <StatCard icon={TrendingUp} label="Taux d'occupation" value={`${stats.tauxOccupation}%`} subtext={`${stats.demandesEnAttente} demandes`} />
            </div>

            {/* Activité récente */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: styles.textLight}}>
                  <MessageSquare size={20} />
                  Demandes récentes
                </h3>
                <div className="space-y-3">
                  {[
                    { nom: "Ibrahima Seck", bien: "Villa moderne", message: "Intéressé pour une visite", temps: "Il y a 2h" },
                    { nom: "Awa Ndiaye", bien: "Appartement centre", message: "Questions sur le loyer", temps: "Il y a 5h" },
                    { nom: "Cheikh Fall", bien: "Studio meublé", message: "Demande de réservation", temps: "Hier" }
                  ].map((demande, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded" style={{backgroundColor: styles.darkBg}}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: styles.primaryColor}}>
                        {demande.nom.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white">{demande.nom}</div>
                        <div className="text-sm text-gray-400">{demande.bien}</div>
                        <div className="text-sm text-gray-500">{demande.message}</div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">{demande.temps}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{color: styles.textLight}}>
                  <Calendar size={20} />
                  Prochains paiements
                </h3>
                <div className="space-y-3">
                  {locataires.map(loc => (
                    <div key={loc.id} className="flex items-center justify-between p-3 rounded" style={{backgroundColor: styles.darkBg}}>
                      <div>
                        <div className="font-semibold text-white">{loc.nom}</div>
                        <div className="text-sm text-gray-400">{loc.bien}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{color: styles.primaryColor}}>{loc.loyer.toLocaleString()} FCFA</div>
                        <div className={`text-sm ${loc.statut === 'retard' ? 'text-red-400' : 'text-green-400'}`}>
                          {loc.prochainPaiement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'annonces' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Mes annonces ({annonces.length})</h2>
              <div className="flex gap-3">
                <select className="px-4 py-2 rounded border" style={{backgroundColor: styles.darkCard, borderColor: styles.darkBorder, color: 'white'}}>
                  <option>Tous les statuts</option>
                  <option>Actif</option>
                  <option>Loué</option>
                  <option>Brouillon</option>
                </select>
                <select className="px-4 py-2 rounded border" style={{backgroundColor: styles.darkCard, borderColor: styles.darkBorder, color: 'white'}}>
                  <option>Tous les types</option>
                  <option>Villa</option>
                  <option>Appartement</option>
                  <option>Studio</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {annonces.map(annonce => (
                <AnnonceCard key={annonce.id} annonce={annonce} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'locataires' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Mes locataires ({locataires.length})</h2>
            <div className="grid gap-4">
              {locataires.map(loc => (
                <div key={loc.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img src={loc.photo} alt={loc.nom} className="w-20 h-20 rounded-full border-2" style={{borderColor: styles.primaryColor}} />
                      <div>
                        <h3 className="text-xl font-bold text-white">{loc.nom}</h3>
                        <p className="text-gray-400 mb-1">{loc.bien}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">Loyer: <span className="font-bold" style={{color: styles.primaryColor}}>{loc.loyer.toLocaleString()} FCFA</span></span>
                          <span className={loc.statut === 'retard' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}>
                            {loc.statut === 'retard' ? '⚠️ Retard' : '✓ À jour'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedLocataire(loc)}
                      className="text-sm font-medium flex items-center gap-1"
                      style={{color: styles.primaryColor}}
                      onMouseOver={(e) => e.currentTarget.style.color = styles.primaryLight}
                      onMouseOut={(e) => e.currentTarget.style.color = styles.primaryColor}
                    >
                      Voir détails <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 rounded" style={{backgroundColor: styles.darkBg}}>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-300">{loc.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-300">{loc.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-300">Depuis le {loc.dateEntree}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setShowMessagerie(true);
                        setSelectedLocataire(loc);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors"
                      style={{backgroundColor: styles.primaryColor, color: 'white'}}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}
                    >
                      <MessageSquare size={18} />
                      Message
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedContratLocataire(loc);
                        setShowContratModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border transition-colors"
                      style={{borderColor: styles.primaryColor, color: styles.primaryColor}}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.primaryColor;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = styles.primaryColor;
                      }}
                    >
                      <FileSignature size={18} />
                      Contrat
                    </button>
                    <button className="px-4 py-2 border border-gray-600 hover:border-gray-400 text-gray-300 rounded transition-colors"
                      onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                      <Key size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'paiements' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Historique des paiements</h2>
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{borderColor: styles.darkBorder}}>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Locataire</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Montant</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paiements.map(p => (
                    <tr key={p.id} className="border-b hover:bg-gray-800 transition-colors" style={{borderColor: styles.darkBorder}}>
                      <td className="py-3 px-4 text-white">{p.locataire}</td>
                      <td className="py-3 px-4 font-bold" style={{color: styles.primaryColor}}>{p.montant.toLocaleString()} FCFA</td>
                      <td className="py-3 px-4 text-gray-400">{p.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          p.statut === 'reçu' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {p.statut === 'reçu' ? 'Reçu' : 'En attente'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="flex items-center gap-1"
                          style={{color: styles.primaryColor}}
                          onMouseOver={(e) => e.currentTarget.style.color = styles.primaryLight}
                          onMouseOut={(e) => e.currentTarget.style.color = styles.primaryColor}>
                          Détails <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contrats' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Contrats de location</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {locataires.map(loc => (
                <div key={loc.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{loc.nom}</h3>
                      <p className="text-gray-400">{loc.bien}</p>
                    </div>
                    <FileText size={32} style={{color: styles.primaryColor}} />
                  </div>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Début:</span>
                      <span className="text-white">01 Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fin:</span>
                      <span className="text-white">31 Déc 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loyer mensuel:</span>
                      <span className="font-bold" style={{color: styles.primaryColor}}>{loc.loyer.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded border transition-colors"
                      style={{borderColor: styles.darkBorder, color: 'white'}}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                      Télécharger
                    </button>
                    <button className="flex-1 px-4 py-2 rounded border transition-colors"
                      style={{borderColor: styles.primaryColor, color: styles.primaryColor}}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.primaryColor;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = styles.primaryColor;
                      }}>
                      Renouveler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'visites' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Visites virtuelles & État des lieux</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {annonces.filter(a => a.statut === 'actif').map(annonce => (
                <div key={annonce.id} className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                  <img src={annonce.image} alt={annonce.titre} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{annonce.titre}</h3>
                  <p className="text-gray-400 mb-4">{annonce.localisation}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded transition-colors"
                      style={{backgroundColor: styles.primaryColor, color: 'white'}}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                      <Video size={18} />
                      Visite 360°
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border transition-colors"
                      style={{borderColor: styles.darkBorder, color: 'white'}}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                      <CheckSquare size={18} />
                      État des lieux
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Messagerie interne</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Liste des conversations */}
              <div className="lg:col-span-1 bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                <h3 className="font-bold mb-4" style={{color: styles.textLight}}>Conversations</h3>
                <div className="space-y-2">
                  {locataires.map(loc => {
                    const lastMsg = messages.find(m => m.locataireId === loc.id);
                    const unread = lastMsg && !lastMsg.lu;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocataire(loc)}
                        className={`w-full text-left p-3 rounded transition-colors ${
                          selectedLocataire?.id === loc.id 
                            ? 'bg-gray-800' 
                            : 'hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={loc.photo} alt={loc.nom} className="w-12 h-12 rounded-full" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`font-semibold ${unread ? 'text-white' : 'text-gray-300'}`}>
                                {loc.nom}
                              </span>
                              {unread && <span className="w-2 h-2 rounded-full" style={{backgroundColor: styles.primaryColor}}></span>}
                            </div>
                            <p className="text-sm text-gray-400 truncate">{lastMsg?.message}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zone de conversation */}
              <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg flex flex-col" style={{height: '600px'}}>
                {selectedLocataire ? (
                  <>
                    {/* Header conversation */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{borderColor: styles.primaryColor}}>
                      <div className="flex items-center gap-3">
                        <img src={selectedLocataire.photo} alt={selectedLocataire.nom} className="w-12 h-12 rounded-full" />
                        <div>
                          <h3 className="font-bold text-white">{selectedLocataire.nom}</h3>
                          <p className="text-sm text-gray-400">{selectedLocataire.bien}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                          <Phone size={20} className="text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                          <Video size={20} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                      {messages.filter(m => m.locataireId === selectedLocataire.id).map(msg => (
                        <div key={msg.id} className="flex gap-3">
                          <img src={selectedLocataire.photo} alt="" className="w-8 h-8 rounded-full" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{msg.expediteur}</span>
                              <span className="text-xs text-gray-500">{msg.temps}</span>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg inline-block">
                              <p className="text-gray-200">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Message de réponse exemple */}
                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 max-w-md">
                          <div className="flex items-center gap-2 mb-1 justify-end">
                            <span className="text-xs text-gray-500">11:45</span>
                            <span className="font-semibold text-sm">Vous</span>
                          </div>
                          <div className="p-3 rounded-lg inline-block" style={{backgroundColor: styles.primaryColor}}>
                            <p className="text-white">D'accord, je vais envoyer un technicien demain matin.</p>
                          </div>
                        </div>
                        <img src={proprietaireInfo.photo} alt="" className="w-8 h-8 rounded-full" />
                      </div>
                    </div>

                    {/* Zone de saisie */}
                    <div className="pt-4 mt-4 border-t" style={{borderColor: styles.primaryColor}}>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Écrivez votre message..."
                          className="flex-1 px-4 py-3 rounded border outline-none text-white"
                          style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                          onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                          onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                        />
                        <button className="px-6 py-3 rounded font-medium transition-colors"
                          style={{backgroundColor: styles.primaryColor, color: 'white'}}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Sélectionnez une conversation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Nouvelle annonce */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Nouvelle annonce</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Titre de l'annonce" className="w-full px-4 py-3 rounded border outline-none text-white" 
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              <select className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}>
                <option>Type de bien</option>
                <option>Villa</option>
                <option>Appartement</option>
                <option>Studio</option>
                <option>Terrain</option>
              </select>
              <input type="text" placeholder="Localisation" className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              <div className="grid grid-cols-3 gap-4">
                <input type="number" placeholder="Chambres" className="px-4 py-3 rounded border outline-none text-white"
                  style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                  onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
                <input type="number" placeholder="Salles de bain" className="px-4 py-3 rounded border outline-none text-white"
                  style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                  onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
                <input type="number" placeholder="Surface m²" className="px-4 py-3 rounded border outline-none text-white"
                  style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                  onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              </div>
              <input type="number" placeholder="Prix (FCFA)" className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              <select className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}>
                <option>Durée de location</option>
                <option>Vente</option>
                <option>3 mois</option>
                <option>6 mois</option>
                <option>12 mois</option>
              </select>
              <textarea placeholder="Description détaillée..." rows={4} className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}></textarea>
              <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{borderColor: styles.darkBorder}}>
                <Plus size={48} className="mx-auto mb-2" style={{color: styles.textGray}} />
                <p className="text-gray-400">Cliquez pour ajouter des photos</p>
              </div>
              <input type="text" placeholder="Lien vidéo (optionnel)" className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              <input type="text" placeholder="Contact" className="w-full px-4 py-3 rounded border outline-none text-white"
                style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                onBlur={(e) => e.target.style.borderColor = styles.darkBorder}/>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 rounded border font-medium transition-colors"
                  style={{borderColor: styles.darkBorder, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                  Annuler
                </button>
                <button className="flex-1 px-4 py-3 rounded font-medium transition-colors"
                  style={{backgroundColor: styles.primaryColor, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                  Publier l'annonce
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panel Notifications */}
      {showNotifications && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-gray-800 shadow-2xl z-50 overflow-y-auto animate-fade-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bell size={24} />
                Notifications
              </h2>
              <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                <X size={24} />
              </button>
            </div>

            {notifList.length > 0 && (
              <button 
                onClick={() => setNotifList(notifList.map(n => ({...n, lu: true})))}
                className="text-sm mb-4"
                style={{color: styles.primaryColor}}
                onMouseOver={(e) => e.currentTarget.style.color = styles.primaryLight}
                onMouseOut={(e) => e.currentTarget.style.color = styles.primaryColor}
              >
                Tout marquer comme lu
              </button>
            )}

            <div className="space-y-3">
              {notifList.map(notif => (
                <div 
                  key={notif.id} 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    notif.lu ? 'bg-gray-900 border-gray-700' : 'bg-gray-900/50 border-gray-600'
                  }`}
                  onClick={() => setNotifList(notifList.map(n => n.id === notif.id ? {...n, lu: true} : n))}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notif.type === 'paiement' ? 'bg-green-500/20' :
                      notif.type === 'demande' ? 'bg-blue-500/20' :
                      notif.type === 'contrat' ? 'bg-purple-500/20' :
                      notif.type === 'alerte' ? 'bg-red-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      {notif.type === 'paiement' && <DollarSign size={18} className="text-green-400" />}
                      {notif.type === 'demande' && <Eye size={18} className="text-blue-400" />}
                      {notif.type === 'contrat' && <FileText size={18} className="text-purple-400" />}
                      {notif.type === 'alerte' && <Bell size={18} className="text-red-400" />}
                      {notif.type === 'maintenance' && <Settings size={18} className="text-yellow-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm mb-1">{notif.message}</p>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{notif.temps}</span>
                      </div>
                    </div>
                    {!notif.lu && <div className="w-2 h-2 rounded-full" style={{backgroundColor: styles.primaryColor}}></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Profil */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowProfile(false)}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Mon profil</h2>
              <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Photo de profil */}
              <div className="flex items-center gap-4">
                <img src={proprietaireInfo.photo} alt="Profil" className="w-24 h-24 rounded-full border-4" style={{borderColor: styles.primaryColor}} />
                <div>
                  <button className="px-4 py-2 rounded border font-medium mb-2 flex items-center gap-2 transition-colors"
                    style={{borderColor: styles.primaryColor, color: styles.primaryColor}}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = styles.primaryColor;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = styles.primaryColor;
                    }}>
                    <Upload size={18} />
                    Changer la photo
                  </button>
                  <p className="text-sm text-gray-400">JPG, PNG ou GIF. Max 5MB.</p>
                </div>
              </div>

              {/* Informations personnelles */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Nom complet</label>
                  <input 
                    type="text" 
                    defaultValue={proprietaireInfo.nom}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input 
                    type="email" 
                    defaultValue={proprietaireInfo.email}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Téléphone</label>
                  <input 
                    type="tel" 
                    defaultValue={proprietaireInfo.telephone}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Adresse</label>
                  <input 
                    type="text" 
                    defaultValue={proprietaireInfo.adresse}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
              </div>

              {/* Statistiques du compte */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg" style={{backgroundColor: styles.primaryColor}}>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{color: '#2d2d2d'}}>{proprietaireInfo.biensTotal}</div>
                  <div className="text-sm text-gray-800">Biens total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">{proprietaireInfo.biensLoues}</div>
                  <div className="text-sm text-gray-800">Biens loués</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-800">{(proprietaireInfo.revenuAnnuel / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-800">Revenu annuel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800">{proprietaireInfo.dateInscription}</div>
                  <div className="text-sm text-gray-800">Membre depuis</div>
                </div>
              </div>

              {/* Sécurité */}
              <div>
                <h3 className="text-lg font-bold mb-4" style={{color: styles.textLight}}>Sécurité</h3>
                <button className="w-full px-4 py-3 rounded border mb-3 font-medium transition-colors"
                  style={{borderColor: styles.darkBorder, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                  Changer le mot de passe
                </button>
                <button className="w-full px-4 py-3 rounded border font-medium transition-colors"
                  style={{borderColor: styles.darkBorder, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                  Activer l'authentification à deux facteurs
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowProfile(false)} className="flex-1 px-4 py-3 rounded border font-medium transition-colors"
                  style={{borderColor: styles.darkBorder, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                  Annuler
                </button>
                <button className="flex-1 px-4 py-3 rounded font-medium transition-colors"
                  style={{backgroundColor: styles.primaryColor, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Locataire */}
      {selectedLocataire && !showMessagerie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLocataire(null)}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Informations du locataire</h2>
              <button onClick={() => setSelectedLocataire(null)} className="p-2 hover:bg-gray-700 rounded transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* En-tête */}
              <div className="flex items-center gap-4 p-4 rounded-lg" style={{background: `linear-gradient(135deg, ${styles.primaryColor} 0%, ${styles.primaryLight} 100%)`}}>
                <img src={selectedLocataire.photo} alt={selectedLocataire.nom} className="w-20 h-20 rounded-full border-4 border-white" />
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedLocataire.nom}</h3>
                  <p className="text-white/80">{selectedLocataire.bien}</p>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={20} style={{color: styles.primaryColor}} />
                    <span className="text-sm text-gray-400">Email</span>
                  </div>
                  <p className="text-white font-medium">{selectedLocataire.email}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={20} style={{color: styles.primaryColor}} />
                    <span className="text-sm text-gray-400">Téléphone</span>
                  </div>
                  <p className="text-white font-medium">{selectedLocataire.telephone}</p>
                </div>
              </div>

              {/* Informations de location */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                  <DollarSign size={32} className="mx-auto mb-2" style={{color: styles.primaryColor}} />
                  <div className="text-2xl font-bold text-white mb-1">{selectedLocataire.loyer.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Loyer mensuel (FCFA)</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                  <Key size={32} className="mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedLocataire.caution.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Caution (FCFA)</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 text-center">
                  <Calendar size={32} className="mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedLocataire.dateEntree}</div>
                  <div className="text-sm text-gray-400">Date d'entrée</div>
                </div>
              </div>

              {/* Statut de paiement */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{color: styles.textLight}}>
                  <DollarSign size={20} />
                  Statut de paiement
                </h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                  selectedLocataire.statut === 'retard' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {selectedLocataire.statut === 'retard' ? '⚠️ Paiement en retard' : '✓ Paiements à jour'}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Prochain paiement: {selectedLocataire.prochainPaiement}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    setShowMessagerie(true);
                  }}
                  className="px-4 py-3 rounded font-medium flex items-center justify-center gap-2 transition-colors"
                  style={{backgroundColor: styles.primaryColor, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}
                >
                  <MessageSquare size={18} />
                  Envoyer un message
                </button>
                <button 
                  onClick={() => {
                    setSelectedContratLocataire(selectedLocataire);
                    setShowContratModal(true);
                    setSelectedLocataire(null);
                  }}
                  className="px-4 py-3 rounded border font-medium flex items-center justify-center gap-2 transition-colors"
                  style={{borderColor: styles.primaryColor, color: styles.primaryColor}}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = styles.primaryColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = styles.primaryColor;
                  }}
                >
                  <FileSignature size={18} />
                  Nouveau contrat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Messagerie */}
      {showMessagerie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => {setShowMessagerie(false); setSelectedLocataire(null);}}>
          <div className="bg-gray-800 rounded-lg p-0 max-w-4xl w-full h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b" style={{borderColor: styles.primaryColor}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Messagerie</h2>
                <button onClick={() => {setShowMessagerie(false); setSelectedLocataire(null);}} className="p-2 hover:bg-gray-700 rounded transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-hidden p-6">
              <div className="grid lg:grid-cols-3 gap-6 h-full">
                {/* Liste des conversations */}
                <div className="lg:col-span-1 bg-gray-900 rounded-lg p-6 border border-gray-800 overflow-y-auto">
                  <h3 className="font-bold mb-4" style={{color: styles.textLight}}>Conversations</h3>
                  <div className="space-y-2">
                    {locataires.map(loc => {
                      const lastMsg = messages.find(m => m.locataireId === loc.id);
                      const unread = lastMsg && !lastMsg.lu;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocataire(loc)}
                          className={`w-full text-left p-3 rounded transition-colors ${
                            selectedLocataire?.id === loc.id ? 'bg-gray-800' : 'hover:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={loc.photo} alt={loc.nom} className="w-12 h-12 rounded-full" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`font-semibold ${unread ? 'text-white' : 'text-gray-300'}`}>
                                  {loc.nom}
                                </span>
                                {unread && <span className="w-2 h-2 rounded-full" style={{backgroundColor: styles.primaryColor}}></span>}
                              </div>
                              <p className="text-sm text-gray-400 truncate">{lastMsg?.message}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Zone de conversation */}
                <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800 flex flex-col h-full">
                  {selectedLocataire ? (
                    <>
                      {/* Header conversation */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{borderColor: styles.primaryColor}}>
                        <div className="flex items-center gap-3">
                          <img src={selectedLocataire.photo} alt={selectedLocataire.nom} className="w-12 h-12 rounded-full" />
                          <div>
                            <h3 className="font-bold text-white">{selectedLocataire.nom}</h3>
                            <p className="text-sm text-gray-400">{selectedLocataire.bien}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                            <Phone size={20} className="text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                            <Video size={20} className="text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto py-4 space-y-4">
                        {messages.filter(m => m.locataireId === selectedLocataire.id).map(msg => (
                          <div key={msg.id} className="flex gap-3">
                            <img src={selectedLocataire.photo} alt="" className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{msg.expediteur}</span>
                                <span className="text-xs text-gray-500">{msg.temps}</span>
                              </div>
                              <div className="bg-gray-800 p-3 rounded-lg inline-block">
                                <p className="text-gray-200">{msg.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Message de réponse exemple */}
                        <div className="flex gap-3 justify-end">
                          <div className="flex-1 max-w-md">
                            <div className="flex items-center gap-2 mb-1 justify-end">
                              <span className="text-xs text-gray-500">11:45</span>
                              <span className="font-semibold text-sm">Vous</span>
                            </div>
                            <div className="p-3 rounded-lg inline-block" style={{backgroundColor: styles.primaryColor}}>
                              <p className="text-white">D'accord, je vais envoyer un technicien demain matin.</p>
                            </div>
                          </div>
                          <img src={proprietaireInfo.photo} alt="" className="w-8 h-8 rounded-full" />
                        </div>
                      </div>

                      {/* Zone de saisie */}
                      <div className="pt-4 mt-4 border-t" style={{borderColor: styles.primaryColor}}>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Écrivez votre message..."
                            className="flex-1 px-4 py-3 rounded border outline-none text-white"
                            style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                            onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                            onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                          />
                          <button className="px-6 py-3 rounded font-medium transition-colors"
                            style={{backgroundColor: styles.primaryColor, color: 'white'}}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <MessageSquare size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Sélectionnez une conversation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Contrat */}
      {showContratModal && selectedContratLocataire && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => {setShowContratModal(false); setSelectedContratLocataire(null);}}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileSignature size={28} />
                Nouveau contrat de location
              </h2>
              <button onClick={() => {setShowContratModal(false); setSelectedContratLocataire(null);}} className="p-2 hover:bg-gray-700 rounded transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations du locataire */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800"
                style={{background: `linear-gradient(135deg, ${styles.primaryColor} 0%, ${styles.primaryLight} 100%)`}}>
                <h3 className="font-bold mb-3 text-white">Locataire</h3>
                <div className="flex items-center gap-4">
                  <img src={selectedContratLocataire.photo} alt={selectedContratLocataire.nom} className="w-16 h-16 rounded-full border-2 border-white" />
                  <div>
                    <div className="text-xl font-bold text-white">{selectedContratLocataire.nom}</div>
                    <div className="text-white/80">{selectedContratLocataire.email}</div>
                  </div>
                </div>
              </div>

              {/* Détails du contrat */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Bien loué</label>
                  <input 
                    type="text" 
                    defaultValue={selectedContratLocataire.bien}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Montant du loyer (FCFA)</label>
                  <input 
                    type="number" 
                    defaultValue={selectedContratLocataire.loyer}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Date de début</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Durée (mois)</label>
                  <select className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}>
                    <option>3 mois</option>
                    <option>6 mois</option>
                    <option selected>12 mois</option>
                    <option>24 mois</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Montant de la caution (FCFA)</label>
                  <input 
                    type="number" 
                    defaultValue={selectedContratLocataire.caution}
                    className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Jour de paiement</label>
                  <select className="w-full px-4 py-3 rounded border outline-none text-white"
                    style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                    onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                    onBlur={(e) => e.target.style.borderColor = styles.darkBorder}>
                    {Array.from({length: 28}, (_, i) => i + 1).map(day => (
                      <option key={day} value={day}>{day} de chaque mois</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clauses spéciales */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Clauses particulières (optionnel)</label>
                <textarea 
                  rows={4}
                  placeholder="Ajoutez des clauses spéciales pour ce contrat..."
                  className="w-full px-4 py-3 rounded border outline-none text-white"
                  style={{backgroundColor: styles.darkBg, borderColor: styles.darkBorder}}
                  onFocus={(e) => e.target.style.borderColor = styles.primaryColor}
                  onBlur={(e) => e.target.style.borderColor = styles.darkBorder}
                ></textarea>
              </div>

              {/* Aperçu du contrat */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <h3 className="font-bold mb-3 flex items-center gap-2" style={{color: styles.textLight}}>
                  <FileText size={20} />
                  Aperçu du contrat standardisé
                </h3>
                <div className="bg-gray-800 p-4 rounded max-h-48 overflow-y-auto text-sm text-gray-300">
                  <p className="mb-2"><strong>CONTRAT DE LOCATION</strong></p>
                  <p className="mb-2">Entre le propriétaire {proprietaireInfo.nom} et le locataire {selectedContratLocataire.nom}</p>
                  <p className="mb-2">Le propriétaire loue au locataire le bien situé à {selectedContratLocataire.bien}</p>
                  <p className="mb-2">Loyer mensuel: {selectedContratLocataire.loyer.toLocaleString()} FCFA</p>
                  <p className="mb-2">Caution: {selectedContratLocataire.caution.toLocaleString()} FCFA</p>
                  <p className="mb-2">Durée: 12 mois renouvelable</p>
                  <p className="text-xs text-gray-500 mt-4">... (Le contrat complet sera généré avec toutes les clauses légales)</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button onClick={() => {setShowContratModal(false); setSelectedContratLocataire(null);}} 
                  className="flex-1 px-4 py-3 rounded border font-medium transition-colors"
                  style={{borderColor: styles.darkBorder, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = styles.primaryColor}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = styles.darkBorder}>
                  Annuler
                </button>
                <button className="flex-1 px-4 py-3 rounded border font-medium flex items-center justify-center gap-2 transition-colors"
                  style={{borderColor: styles.primaryColor, color: styles.primaryColor}}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = styles.primaryColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = styles.primaryColor;
                  }}>
                  <Download size={18} />
                  Télécharger PDF
                </button>
                <button className="flex-1 px-4 py-3 rounded font-medium flex items-center justify-center gap-2 transition-colors"
                  style={{backgroundColor: styles.primaryColor, color: 'white'}}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.primaryDark}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.primaryColor}>
                  <Send size={18} />
                  Envoyer pour signature
                </button>
              </div>

              {/* Info signature électronique */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <p className="text-blue-300 font-semibold mb-1">Signature électronique</p>
                    <p className="text-gray-400">Le contrat sera envoyé par email au locataire pour signature électronique sécurisée. Vous recevrez une notification une fois signé.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProprietaireDashboard;