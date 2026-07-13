export interface Venue {
  slug: string;
  name: string;
  headline: string;
  description: string;
  cuisine: string[];
  priceRange: string;
  address: string;
  phone: string;
  instagramUrl: string;
  heroImage: string;
  gallery: string[];
  services: Service[];
  menu: MenuCategory[];
  bookingConfig: BookingConfig;
}

export interface Service {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  slots: string[];
}

export interface MenuCategory {
  name: string;
  items: { name: string; description: string; price: string }[];
}

export interface BookingConfig {
  minCovers: number;
  maxCovers: number;
  defaultCovers: number;
  maxAdvanceDays: number;
  requirePhone: boolean;
  requireDeposit: boolean;
  depositAmount: number;
  cancellationPolicy: string;
  autoConfirmThreshold: number;
  showMenu: boolean;
  waitlistEnabled: boolean;
}

export const VENUES: Record<string, Venue> = {
  septem: {
    slug: 'septem',
    name: 'Septem',
    headline: 'Cuisine méditerranéenne d\'auteur',
    description: 'Au cœur de Dar des Arts, Septem réinterprète les saveurs de la Méditerranée à travers un menu dégustation en sept services. Une expérience culinaire intime, portée par des produits d\'exception et le savoir-faire de notre chef.',
    cuisine: ['Méditerranéenne', 'Marocaine contemporaine'],
    priceRange: '€€€',
    address: 'Dar des Arts, Derb El Ferrane, Riad Laarouss, Marrakech',
    phone: '+212 5 24 00 00 00',
    instagramUrl: 'https://instagram.com/darsociety',
    heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    ],
    services: [
      {
        id: 'dejeuner',
        label: 'Déjeuner',
        startTime: '12:00',
        endTime: '14:30',
        daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
        slots: ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30'],
      },
      {
        id: 'diner',
        label: 'Dîner',
        startTime: '19:30',
        endTime: '22:30',
        daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
        slots: ['19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15'],
      },
    ],
    menu: [
      {
        name: 'Les Entrées',
        items: [
          { name: 'Tartare de daurade', description: 'Agrumes, avocat, sésame noir, huile de coriandre', price: '160 MAD' },
          { name: 'Velouté de topinambour', description: 'Truffe noire, noisettes torréfiées, huile de noix', price: '140 MAD' },
          { name: 'Poulpe grillé', description: 'Purée de patate douce, chermoula, ail confit', price: '180 MAD' },
        ],
      },
      {
        name: 'Les Plats',
        items: [
          { name: 'Filet de bœuf Wagyu', description: 'Réduction au vin rouge, moelle rôtie, légumes anciens', price: '420 MAD' },
          { name: 'Saint-Pierre', description: 'Beurre blanc au safran, fenouil braisé, olives Lucques', price: '340 MAD' },
          { name: 'Agneau de lait', description: 'Cuisson basse température, jus au thym, gratin dauphinois', price: '380 MAD' },
        ],
      },
      {
        name: 'Les Desserts',
        items: [
          { name: 'Soufflé au chocolat', description: 'Grand cru Valrhona, glace vanille Bourbon', price: '140 MAD' },
          { name: 'Tarte au citron', description: 'Meringue italienne, basilic, sorbet citron vert', price: '120 MAD' },
          { name: 'Assiette de fromages', description: 'Sélection affinée, confiture de figues, pain aux noix', price: '160 MAD' },
        ],
      },
    ],
    bookingConfig: {
      minCovers: 1,
      maxCovers: 12,
      defaultCovers: 2,
      maxAdvanceDays: 60,
      requirePhone: true,
      requireDeposit: true,
      depositAmount: 200,
      cancellationPolicy: 'Annulation gratuite jusqu\'à 24h avant. Au-delà, la caution de 200 MAD par personne sera retenue.',
      autoConfirmThreshold: 6,
      showMenu: true,
      waitlistEnabled: true,
    },
  },
};

export const PARTNERS: Record<string, { name: string; logo?: string; message?: string }> = {
  CONCI24: { name: 'Royal Mansour Concierge', message: 'Réservation privilégiée pour les résidents du Royal Mansour.' },
  RITZMC: { name: 'Ritz-Carlton Concierge', message: 'Service exclusif pour nos hôtes.' },
};

export const OCCASIONS = [
  { value: '', label: 'Sélectionner une occasion (optionnel)' },
  { value: 'birthday', label: '🎂 Anniversaire' },
  { value: 'anniversary', label: '💍 Anniversaire de mariage' },
  { value: 'romantic', label: '❤️ Dîner romantique' },
  { value: 'business', label: '💼 Repas d\'affaires' },
  { value: 'celebration', label: '🥂 Célébration' },
  { value: 'family', label: '👨‍👩‍👧‍👦 Repas en famille' },
  { value: 'friends', label: '🎉 Entre amis' },
  { value: 'other', label: 'Autre' },
];
