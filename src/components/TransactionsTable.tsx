'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 10;

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (t) =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.notes || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">All Transactions</h3>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-Category / Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Site</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {paginatedTransactions.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{t.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{t.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{t.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{t.subCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{t.site}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{t.amount}</td>
              </tr>
            ))}
          </tbody>
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
