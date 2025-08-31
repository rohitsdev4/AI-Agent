import { Transaction } from './types';

// Parsed from the user's data dump
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    timestamp: '8/15/2025 10:32:40',
    type: 'Expense',
    amount: 2000,
    category: 'Labour Payment',
    subCategory: 'Mithlesh Kumar',
    payeeName: 'Mithlesh Kumar',
    site: 'Ludhiana',
    recordedBy: 'Gulshan',
    recorderId: '5920057897',
  },
  {
    id: '2',
    timestamp: '8/16/2025 15:55:52',
    type: 'Expense',
    amount: 1650,
    category: 'Food',
    subCategory: 'Food',
    payeeName: 'Ludhiana',
    site: 'Gulshan',
    recordedBy: '5920057897',
    recorderId: '', // Data seems shifted here
  },
  {
    id: '3',
    timestamp: '8/16/2025 15:57:02',
    type: 'Payment Received',
    amount: 3000,
    category: 'N/A',
    subCategory: 'Payment from Extra income',
    payeeName: 'Ludhiana',
    site: 'Extra income',
    recordedBy: 'Gulshan',
    recorderId: '5920057897',
  },
  {
    id: '4',
    timestamp: '8/18/2025 7:56:33',
    type: 'Expense',
    amount: 250,
    category: 'Daily Expense',
    subCategory: 'Panir peaaj mtr etc',
    payeeName: 'Ludhiana',
    site: 'Gulshan',
    recordedBy: '5920057897',
    recorderId: '', // Shifted
  },
  {
    id: '5',
    timestamp: '8/18/2025 7:57:53',
    type: 'Expense',
    amount: 50,
    category: 'Daily Expense',
    subCategory: 'Milk or tos',
    payeeName: 'Ludhiana',
    site: 'Gulshan',
    recordedBy: '5920057897',
    recorderId: '', // Shifted
  },
  {
    id: '6',
    timestamp: '8/18/2025 18:17:10',
    type: 'Payment Received',
    amount: 11755,
    category: 'N/A',
    subCategory: 'Final Balance 103000 aj tk ka hisab hai 18 aug tk',
    payeeName: 'Other',
    site: 'Rohit - AC',
    recordedBy: 'Rohit',
    recorderId: '5759823098',
  },
  {
    id: '7',
    timestamp: '8/18/2025 18:19:36',
    type: 'Expense',
    amount: 55000,
    category: 'Other',
    subCategory: 'Side work kist finel balance 149000/ 18 Aug',
    payeeName: 'Other',
    site: 'Gulshan',
    recordedBy: '5920057897',
    recorderId: '', // Shifted
  },
  {
    id: '8',
    timestamp: '8/22/2025 14:13:01',
    type: 'Expense',
    amount: 7000,
    category: 'Labour Payment',
    subCategory: 'Monthly expense ke liye salary',
    payeeName: 'Self - Rohit',
    site: 'Other',
    recordedBy: 'Rohit',
    recorderId: '5759823098',
  },
  {
    id: '9',
    timestamp: '8/24/2025 0:04:15',
    type: 'Expense',
    amount: 390,
    category: 'Travel',
    subCategory: 'Ludhiana to Yamunanagar',
    payeeName: 'Ludhiana',
    site: 'Gulshan',
    recordedBy: '5920057897',
    recorderId: '', // Shifted
  }
];

export const labourNames = [
  'Dhanu',
  'Mithlesh Kumar',
  'Ducting',
  'Self - Rohit',
];

export const siteNames = [
  'Ludhiana',
  'Tata - Mundhra Hospital',
  'Yamunanagar',
  'Other',
];

export const partyNames = [
  'Delhi wala',
  'Shop deposit return',
  'Mathur',
  'Current account',
  'Dr Varun Mundhra - TATA',
  'Rohit - AC',
  'Extra income',
  'Rohit to me',
];
