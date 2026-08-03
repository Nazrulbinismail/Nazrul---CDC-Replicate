export type CategoryType = 'heartland' | 'supermarket';

export interface CategoryBalance {
  category: CategoryType;
  totalAllocated: number;
  remainingBalance: number;
}

export interface VoucherItem {
  id: string;
  category: CategoryType;
  amount: number; // e.g. 2, 5, 10
  isRedeemed: boolean;
  redeemedAt?: string;
  merchantName?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: 'Hawker & Coffee Shop' | 'Supermarket' | 'Heartland Shop' | 'Beauty & Wellness' | 'Medical & Clinic';
  address: string;
  postalCode: string;
  mrt: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  acceptsCategory: CategoryType[];
  rating: number;
  openHours: string;
  distance?: string;
  image?: string;
}

export interface Transaction {
  id: string;
  voucherIds: string[];
  totalAmount: number; // exact amount to cents (e.g. 14.85)
  category: CategoryType;
  merchantName: string;
  timestamp: string;
  qrCodeId: string;
}

export type ActiveScreen = 'home' | 'vouchers' | 'merchants' | 'history';
export type SelectionMode = 'keypad' | 'legacy';

