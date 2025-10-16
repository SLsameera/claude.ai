export type Business = {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  verified: boolean;
  hours: string;
  description: string;
};

export type MarketplaceItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  priceCurrency: string;
  condition: 'new' | 'used';
  location: string;
  highlights: string[];
};

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  jobType: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  postedAt: string;
  tags: string[];
};

export type ServiceOffering = {
  id: string;
  name: string;
  provider: string;
  category: string;
  price: string;
  availability: string;
  rating: number;
  description: string;
};

export type AnalyticsSnapshot = {
  metric: string;
  current: number;
  target: number;
  unit: string;
};

export type ErasActivity = {
  action: string;
  points: number;
  estimatedValueLkr: number;
};

export type ErasTier = {
  name: string;
  monthlyRangeLkr: string;
  perks: string[];
};

export const platformOverview = {
  version: '1.0',
  targetUsers: '8M+ internet users in Sri Lanka',
  modules: 14,
  languages: ['Sinhala', 'English'],
  deploymentReady: true,
  upcomingPhases: [
    'Backend API hardening',
    'Mobile app release',
    'Advanced AI capabilities'
  ]
};

export const businesses: Business[] = [
  {
    id: 'biz-01',
    name: 'Ocean View Hotel',
    category: 'Hospitality',
    rating: 4.7,
    location: 'Colombo',
    verified: true,
    hours: '24/7',
    description: 'Luxury beachfront hotel with event facilities and premium dining.'
  },
  {
    id: 'biz-02',
    name: 'Green Valley Organics',
    category: 'Retail',
    rating: 4.5,
    location: 'Kandy',
    verified: true,
    hours: '09:00 - 20:00',
    description: 'Organic grocery with farm-to-table produce and home delivery.'
  },
  {
    id: 'biz-03',
    name: 'TechPulse Solutions',
    category: 'IT Services',
    rating: 4.8,
    location: 'Galle',
    verified: false,
    hours: '08:00 - 18:00',
    description: 'SME-focused web, mobile, and AI solutions provider.'
  }
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'itm-01',
    title: '13" Ultrabook Pro',
    category: 'Electronics & Gadgets',
    price: 225000,
    priceCurrency: 'LKR',
    condition: 'new',
    location: 'Colombo 03',
    highlights: ['Intel i7 13th Gen', '16GB RAM', 'Same-day delivery']
  },
  {
    id: 'itm-02',
    title: 'Hybrid SUV 2022',
    category: 'Vehicles',
    price: 11500000,
    priceCurrency: 'LKR',
    condition: 'used',
    location: 'Negombo',
    highlights: ['32,000 km', 'Full service history', 'Finance available']
  },
  {
    id: 'itm-03',
    title: 'Lakefront Apartment',
    category: 'Real Estate',
    price: 78000000,
    priceCurrency: 'LKR',
    condition: 'used',
    location: 'Colombo 07',
    highlights: ['3 Bedrooms', 'Smart home enabled', 'Clubhouse access']
  }
];

export const jobListings: JobListing[] = [
  {
    id: 'job-01',
    title: 'Senior React Developer',
    company: 'E City Era Labs',
    location: 'Remote (Sri Lanka)',
    salaryRange: 'LKR 350,000 - 450,000',
    jobType: 'Remote',
    postedAt: '2025-09-18',
    tags: ['React', 'TypeScript', 'PWA']
  },
  {
    id: 'job-02',
    title: 'Marketing Strategist',
    company: 'Smart Era Marketplace',
    location: 'Colombo',
    salaryRange: 'LKR 180,000 - 240,000',
    jobType: 'Full-time',
    postedAt: '2025-09-12',
    tags: ['Growth', 'Campaigns', 'Analytics']
  },
  {
    id: 'job-03',
    title: 'Customer Success Associate',
    company: 'E City Era',
    location: 'Kandy',
    salaryRange: 'LKR 120,000 - 160,000',
    jobType: 'Full-time',
    postedAt: '2025-09-09',
    tags: ['Support', 'Sinhala/English', 'Onboarding']
  }
];

export const serviceOfferings: ServiceOffering[] = [
  {
    id: 'srv-01',
    name: 'On-demand Home Cleaning',
    provider: 'SparklePro Services',
    category: 'Home Services',
    price: 'From LKR 4,500',
    availability: 'Same-day slots available',
    rating: 4.6,
    description: 'Deep cleaning packages with eco-friendly supplies.'
  },
  {
    id: 'srv-02',
    name: 'Telehealth Consultation',
    provider: 'HealWell Clinics',
    category: 'Healthcare',
    price: 'LKR 2,000 per session',
    availability: '08:00 - 22:00 daily',
    rating: 4.9,
    description: 'Board-certified doctors with e-prescriptions and lab integrations.'
  },
  {
    id: 'srv-03',
    name: 'Executive Coaching',
    provider: 'FutureReady Advisors',
    category: 'Professional Services',
    price: 'Packages from LKR 35,000',
    availability: 'Weekdays & Saturdays',
    rating: 4.7,
    description: 'Leadership coaching tailored for SME founders and managers.'
  }
];

export const analyticsSnapshot: AnalyticsSnapshot[] = [
  { metric: 'Registered businesses', current: 2547, target: 3000, unit: 'count' },
  { metric: 'Monthly active users', current: 82000, target: 120000, unit: 'users' },
  { metric: 'Average session time', current: 9.8, target: 12, unit: 'minutes' },
  { metric: 'ERAS payout rate', current: 0.8, target: 0.85, unit: 'ratio' }
];

export const erasActivities: ErasActivity[] = [
  { action: 'View Ad', points: 1, estimatedValueLkr: 2 },
  { action: 'Like Post', points: 2, estimatedValueLkr: 5 },
  { action: 'Comment', points: 4, estimatedValueLkr: 10 },
  { action: 'Share', points: 5, estimatedValueLkr: 15 },
  { action: 'Watch Video', points: 10, estimatedValueLkr: 25 }
];

export const erasTiers: ErasTier[] = [
  {
    name: 'Basic User',
    monthlyRangeLkr: 'LKR 2,000 – 5,000',
    perks: ['Access to ERAS marketplace', 'Monthly payout reminders']
  },
  {
    name: 'Active User',
    monthlyRangeLkr: 'LKR 10,000 – 25,000',
    perks: ['Priority support', 'Bonus challenges twice a month']
  },
  {
    name: 'Power User',
    monthlyRangeLkr: 'LKR 30,000 – 100,000+',
    perks: ['Dedicated account manager', 'Access to premium ad campaigns']
  }
];

export const erasOverview = {
  minimumWithdrawalLkr: 1000,
  referralCommission: '10%',
  payoutChannels: ['Bank Transfer', 'Mobile Money (eZ Cash, mCash)'],
  platformShare: '20% advertiser spend',
  userShare: '80% advertiser spend'
};
