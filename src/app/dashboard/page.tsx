'use client';

import { useEffect, useState, useMemo } from 'react';
import { Transaction } from '@/lib/types';
import { mockTransactions } from '@/lib/mockData';
import SummaryCard from '@/components/SummaryCard';
import IncomeExpenseChart from '@/components/charts/IncomeExpenseChart';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import Filters from '@/components/Filters';
import TransactionsTable from '@/components/TransactionsTable';
import SiteSummaryTable from '@/components/SiteSummaryTable';
import LabourBalanceTable from '@/components/LabourBalanceTable';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setTransactions(mockTransactions);
    setLoading(false);
  }, []);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Note: The raw timestamp includes time. For date filtering, we should compare dates only.
      const transactionDate = new Date(t.timestamp.split(' ')[0]);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      if (filters.category && !t.category.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }
      if (startDate && transactionDate < startDate) {
        return false;
      }
      if (endDate && transactionDate > endDate) {
        return false;
      }
      return true;
    });
  }, [transactions, filters]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><p>Loading dashboard...</p></div>;
  }

  const totalIncome = filteredTransactions.filter(t => t.type === 'Payment Received').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  const pendingLabourDues = filteredTransactions.filter(t => t.category === 'Labour Payment').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <SummaryCard title="Total Income" value={totalIncome} colorClassName="text-green-600" />
        <SummaryCard title="Total Expenses" value={totalExpenses} colorClassName="text-red-600" />
        <SummaryCard title="Net Balance" value={netBalance} colorClassName="text-blue-600" />
        <SummaryCard title="Pending Labour Dues" value={pendingLabourDues} colorClassName="text-yellow-600" />
      </div>

      <Filters onFilterChange={handleFilterChange} />

      <div className="grid gap-6 lg:grid-cols-5 mb-6">
        <div className="lg:col-span-3 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Income vs. Expense</h3>
            <IncomeExpenseChart data={filteredTransactions} />
        </div>
        <div className="lg:col-span-2 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Expense Breakdown</h3>
            <CategoryPieChart data={filteredTransactions} />
        </div>
      </div>

      <div className="mb-6">
        <TransactionsTable transactions={filteredTransactions} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SiteSummaryTable transactions={filteredTransactions} />
        <LabourBalanceTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}
