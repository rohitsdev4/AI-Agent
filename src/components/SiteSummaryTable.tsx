'use client';

import { useMemo } from 'react';
import { Transaction } from '@/lib/types';

interface SiteSummaryTableProps {
  transactions: Transaction[];
}

interface SiteSummary {
  name: string;
  income: number;
  expenses: number;
  net: number;
}

export default function SiteSummaryTable({ transactions }: SiteSummaryTableProps) {
  const siteSummary = useMemo(() => {
    const summary: { [key: string]: SiteSummary } = {};

    transactions.forEach((t) => {
      // Assuming 'category' represents the site
      const siteName = t.category;

      if (!summary[siteName]) {
        summary[siteName] = { name: siteName, income: 0, expenses: 0, net: 0 };
      }

      if (t.type === 'Payment Received') {
        summary[siteName].income += t.amount;
      } else if (t.type === 'Expense') {
        summary[siteName].expenses += t.amount;
      }
      summary[siteName].net = summary[siteName].income - summary[siteName].expenses;
    });

    return Object.values(summary);
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Site-wise Summary</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site (Category)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Income</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {siteSummary.map((site) => (
              <tr key={site.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{site.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{site.income.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{site.expenses.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{site.net.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
