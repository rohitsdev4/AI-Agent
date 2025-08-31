'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/types';

interface ReportTableProps {
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 15;

export default function ReportTable({ transactions }: ReportTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return transactions.slice(start, end);
  }, [transactions, currentPage]);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const totalAmount = useMemo(() => {
    return transactions.reduce((sum, t) => {
      return t.type === 'Expense' ? sum - t.amount : sum + t.amount;
    }, 0);
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Report Results ({transactions.length} transactions)
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {paginatedTransactions.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.timestamp}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.type}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.category}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.subCategory}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.payeeName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">{t.site}</td>
                <td className={`px-4 py-4 whitespace-nowrap text-sm text-right font-medium ${t.type === 'Expense' ? 'text-red-600' : 'text-green-600'}`}>
                  {t.type === 'Expense' ? '-' : ''}{t.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <td colSpan={6} className="px-4 py-3 text-right text-sm font-bold uppercase">Total Net</td>
              <td className={`px-4 py-3 text-right text-sm font-bold ${totalAmount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
