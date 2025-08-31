'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/types';
import { mockTransactions } from '@/lib/mockData';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportTable from '@/components/reports/ReportTable';

export default function ReportsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const [filters, setFilters] = useState({
    site: '',
    labourer: '', // Note: this will filter on the 'subCategory' field for Labour Payments
    partyName: '', // Note: this will filter on the 'payeeName' field
    category: '',
    startDate: '',
    endDate: '',
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.timestamp.split(' ')[0]);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (filters.site && t.site !== filters.site) return false;
      if (filters.category && !t.category.toLowerCase().includes(filters.category.toLowerCase())) return false;
      if (filters.labourer && t.subCategory !== filters.labourer) return false;
      if (filters.partyName && t.payeeName !== filters.partyName) return false;
      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;

      return true;
    });
  }, [transactions, filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Advanced Reports</h1>

      <div className="mb-6">
        <ReportFilters onFilterChange={handleFilterChange} />
      </div>

      <div>
        <ReportTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}
