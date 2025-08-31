export interface Transaction {
  id: string;
  timestamp: string; // Raw data format, e.g., "8/15/2025 10:32:40"
  type: 'Expense' | 'Payment Received';
  amount: number;
  category: string; // e.g., "Labour Payment", "Food"
  subCategory: string; // e.g., "Mithlesh Kumar" or "Panir peaaj mtr etc"
  payeeName: string; // Can be the same as subCategory or a different name
  site: string; // e.g., "Ludhiana"
  recordedBy: string; // e.g., "Gulshan"
  recorderId: string; // e.g., "5920057897"
}

export interface Site {
  id: string;
  name: string;
  // other site-specific details can be added here
}

export interface Labour {
  id:string;
  name: string;
  // other labour-specific details can be added here
}
