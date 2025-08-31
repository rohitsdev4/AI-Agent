'use client';

import { useMemo } from 'react';
import { Transaction } from '@/lib/types';

interface LabourBalanceTableProps {
  transactions: Transaction[];
}

interface LabourBalance {
  name: string;
  totalPaid: number;
}

export default function LabourBalanceTable({ transactions }: LabourBalanceTableProps) {
  const labourBalances = useMemo(() => {
    const balances: { [key: string]: LabourBalance } = {};

    transactions
      .filter((t) => t.category === 'Labour Payment')
      .forEach((t) => {
        // Assuming 'subCategory' represents the labourer's name
        const labourerName = t.subCategory;

        if (!balances[labourerName]) {
          balances[labourerName] = { name: labourerName, totalPaid: 0 };
        }
        balances[labourerName].totalPaid += t.amount;
      });

    return Object.values(balances);
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Labour Balance Tracker</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labourer (SubCategory)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {labourBalances.map((labourer) => (
              <tr key={labourer.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{labourer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{labourer.totalPaid.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
