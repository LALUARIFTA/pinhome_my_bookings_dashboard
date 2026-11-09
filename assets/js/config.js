/* ============================================================
   PinHome Dashboard - Demo Data & User Configuration
   Replace this content with real API data in production.
   ============================================================ */

// Demo host identity - change per deployment/user
const APP_CONFIG = {
  hostName: 'Johathan Stinson',
  hostInitials: 'JS',
  hostAvatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  supportAgentAvatar:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
  guestAvatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
};

// 3 Chart Periods (Days 1-14)
const periodDatasets = [
  [
    { day: 1, value: 1450.0, type: 'earned' },
    { day: 2, value: 2210.0, type: 'earned' },
    { day: 3, value: 2560.0, type: 'highlight-cyan' },
    { day: 4, value: 1260.0, type: 'earned' },
    { day: 5, value: 2310.0, type: 'earned' },
    { day: 6, value: 1290.0, type: 'earned' },
    { day: 7, value: 940.0, type: 'earned' },
    { day: 8, value: 1430.0, type: 'earned' },
    { day: 9, value: 1894.83, type: 'today' },
    { day: 10, value: 1310.0, type: 'earned' },
    { day: 11, value: 950.0, type: 'earned' },
    { day: 12, value: 2320.0, type: 'earned' },
    { day: 13, value: 1310.0, type: 'earned' },
    { day: 14, value: 940.0, type: 'earned' },
  ],
  [
    { day: 1, value: 1820.0, type: 'earned' },
    { day: 2, value: 1540.0, type: 'earned' },
    { day: 3, value: 2100.0, type: 'earned' },
    { day: 4, value: 2740.0, type: 'highlight-cyan' },
    { day: 5, value: 1950.0, type: 'earned' },
    { day: 6, value: 1620.0, type: 'earned' },
    { day: 7, value: 2290.5, type: 'today' },
    { day: 8, value: 1410.0, type: 'earned' },
    { day: 9, value: 1750.0, type: 'earned' },
    { day: 10, value: 2480.0, type: 'earned' },
    { day: 11, value: 1320.0, type: 'earned' },
    { day: 12, value: 1940.0, type: 'earned' },
    { day: 13, value: 2150.0, type: 'earned' },
    { day: 14, value: 1680.0, type: 'earned' },
  ],
  [
    { day: 1, value: 2120.0, type: 'earned' },
    { day: 2, value: 2490.0, type: 'highlight-cyan' },
    { day: 3, value: 1780.0, type: 'earned' },
    { day: 4, value: 1420.0, type: 'earned' },
    { day: 5, value: 2610.4, type: 'today' },
    { day: 6, value: 1980.0, type: 'earned' },
    { day: 7, value: 1540.0, type: 'earned' },
    { day: 8, value: 2230.0, type: 'earned' },
    { day: 9, value: 1690.0, type: 'earned' },
    { day: 10, value: 1890.0, type: 'earned' },
    { day: 11, value: 2510.0, type: 'earned' },
    { day: 12, value: 1740.0, type: 'earned' },
    { day: 13, value: 1490.0, type: 'earned' },
    { day: 14, value: 2080.0, type: 'earned' },
  ],
];

// Bookings data
const bookingsData = [
  {
    id: 1,
    title: 'Valencia apartment',
    nights: '3 nights',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    status: 'Approved',
    price: '$580',
    date: 'March 6, at 12:00',
    badgeType: 'valencia',
  },
  {
    id: 2,
    title: 'Night swimingpool',
    nights: '1 nights',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80',
    status: 'Pending',
    price: '$1000',
    date: 'March 6, at 22:00',
    badgeType: 'pool',
  },
  {
    id: 3,
    title: 'Unique & Cozy studio',
    nights: '10 nights',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    status: 'Approved',
    price: '$3844',
    date: 'March 6, at 14:00',
    badgeType: 'studio',
  },
  {
    id: 4,
    title: 'Terracotta Penthouse',
    nights: '4 nights',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    status: 'Approved',
    price: '$1240',
    date: 'March 7, at 15:00',
    badgeType: 'valencia',
    extra: true,
  },
  {
    id: 5,
    title: 'Palm Breeze Loft',
    nights: '2 nights',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    status: 'Pending',
    price: '$520',
    date: 'March 7, at 18:30',
    badgeType: 'studio',
    extra: true,
  },
  {
    id: 6,
    title: 'Nordic Sun Studio',
    nights: '5 nights',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    status: 'Approved',
    price: '$875',
    date: 'March 8, at 13:00',
    badgeType: 'pool',
    extra: true,
  },
  {
    id: 7,
    title: 'Marina Sunset Duplex',
    nights: '3 nights',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    status: 'Approved',
    price: '$960',
    date: 'March 8, at 16:00',
    badgeType: 'valencia',
    extra: true,
  },
];

// Housekeeping units
const housekeepingUnits = [
  { id: 1, unit: 'Valencia apartment', cleaner: 'Maria G.', checkIn: '12:00 Today', status: 'Ready', badgeType: 'valencia' },
  { id: 2, unit: 'Night swimingpool', cleaner: 'Carlos R.', checkIn: '22:00 Today', status: 'Cleaning', badgeType: 'pool' },
  { id: 3, unit: 'Unique & Cozy studio', cleaner: 'Lucia V.', checkIn: '14:00 Today', status: 'Ready', badgeType: 'studio' },
  { id: 4, unit: 'Terracotta Penthouse', cleaner: 'Maria G.', checkIn: '15:00 Tomorrow', status: 'Inspecting', badgeType: 'valencia' },
];

// Rate plans
const ratePlansData = [
  { id: 1, name: 'Standard Flexible', badge: 'Most Popular', discount: 'Base Rate', rule: 'Free cancellation up to 24h before arrival', yield: '$245 avg/night', active: true, bg: 'bg-[#f4fbfb]' },
  { id: 2, name: 'Early Bird Saver (-15%)', badge: '30+ Days Ahead', discount: '-15% OFF', rule: 'Non-refundable deposit • High occupancy lock', yield: '$208 avg/night', active: true, bg: 'bg-[#fefaf0]' },
  { id: 3, name: 'Weekly Digital Nomad (-25%)', badge: '7+ Nights Stay', discount: '-25% OFF', rule: 'Includes high-speed fiber & mid-stay cleaning', yield: '$1,480 avg/week', active: true, bg: 'bg-[#f2fafe]' },
  { id: 4, name: 'Last-Minute Flash Deal', badge: 'Same-Day Fill', discount: '-20% OFF', rule: 'Auto-triggers when unit is vacant within 48h', yield: '$196 avg/night', active: false, bg: 'bg-[#fdf4f7]' },
];

// Rate matrix
const rateMatrixData = [
  { unit: 'Valencia apartment', rates: [195, 225, 225, 195, 195, 195, 210], surges: [false, true, true, false, false, false, false] },
  { unit: 'Night swimingpool', rates: [950, 1100, 1100, 950, 950, 950, 1000], surges: [false, true, true, false, false, false, true] },
  { unit: 'Unique & Cozy studio', rates: [360, 415, 415, 360, 360, 360, 384], surges: [false, true, true, false, false, false, false] },
  { unit: 'Terracotta Penthouse', rates: [310, 355, 355, 310, 310, 310, 310], surges: [false, true, true, false, false, false, false] },
];

// Apartments portfolio
const apartmentsPortfolio = [
  { id: 1, name: 'Valencia apartment', specs: '2 Beds • 4 Guests • Pool View', rate: '$195', occ: 92, status: 'Occupied', rating: '4.96', badgeType: 'valencia' },
  { id: 2, name: 'Night swimingpool', specs: '3 Beds • 6 Guests • Private Pool', rate: '$1000', occ: 85, status: 'Occupied', rating: '4.98', badgeType: 'pool' },
  { id: 3, name: 'Unique & Cozy studio', specs: '1 Bed • 2 Guests • Historic Old Town', rate: '$384', occ: 94, status: 'Occupied', rating: '4.91', badgeType: 'studio' },
  { id: 4, name: 'Terracotta Penthouse', specs: '2 Beds • 4 Guests • Rooftop Terrace', rate: '$310', occ: 88, status: 'Occupied', rating: '4.95', badgeType: 'valencia' },
  { id: 5, name: 'Palm Breeze Loft', specs: '1 Bed • 3 Guests • Beachfront Walk', rate: '$260', occ: 76, status: 'Available', rating: '4.89', badgeType: 'pool' },
  { id: 6, name: 'Nordic Sun Studio', specs: '1 Bed • 2 Guests • Minimalist Patio', rate: '$175', occ: 81, status: 'Available', rating: '4.90', badgeType: 'studio' },
  { id: 7, name: 'Marina Sunset Duplex', specs: '2 Beds • 5 Guests • Harbor Balcony', rate: '$320', occ: 89, status: 'Occupied', rating: '4.94', badgeType: 'valencia' },
  { id: 8, name: 'Botanical Garden Suite', specs: '1 Bed • 2 Guests • Private Courtyard', rate: '$215', occ: 79, status: 'Available', rating: '4.93', badgeType: 'pool' },
];

// Pricing rules
const pricingRules = [
  { id: 1, title: 'Orphan Gap Night Filler', desc: 'Auto-discounts single vacant nights between bookings by 15%', active: true },
  { id: 2, title: 'Local Festival Demand Surge', desc: 'Raises nightly rate +30% when city occupancy exceeds 85%', active: true },
  { id: 3, title: 'Extended Stay Booster', desc: 'Applies 10% discount on 5+ night stays to reduce turnover costs', active: true },
];

// FAQ items
const faqItems = [
  { id: 1, q: 'When are daily booking payouts transferred to my bank?', a: 'PinHome releases payouts 24 hours after guest check-in. Your March 1–9 earnings ($14,280) are scheduled for express deposit tomorrow morning.', open: true },
  { id: 2, q: 'How does smart-lock keypad automation work for guests?', a: 'Once a booking status is marked "Approved", PinHome automatically generates a unique 4-digit PIN valid only from check-in time until check-out.', open: false },
  { id: 3, q: 'What happens if a guest requests a last-minute extension?', a: 'Extensions are automatically checked against your Rate Matrix and Housekeeping schedule before instant host approval.', open: false },
];

// Search placeholders per view
const NAV_PLACEHOLDERS = {
  Bookings: 'Search bookings, guests, prices...',
  Home: 'Search turnovers or guests...',
  'Rate plans': 'Search rate plans...',
  Apartments: 'Search apartments or status...',
  Pricing: 'Search pricing rules...',
  Support: 'Search help topics or FAQs...',
};
