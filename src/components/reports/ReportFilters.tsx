'use client';

import React from 'react';
import { siteNames, labourNames, partyNames } from '@/lib/mockData';

interface ReportFiltersProps {
  onFilterChange: (filters: {
    site?: string;
    labourer?: string;
    partyName?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

export default function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Site Filter */}
        <div>
          <label htmlFor="site" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Site
          </label>
          <select name="site" id="site" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <option value="">All Sites</option>
            {siteNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        {/* Labourer Filter */}
        <div>
          <label htmlFor="labourer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Labourer
          </label>
          <select name="labourer" id="labourer" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <option value="">All Labourers</option>
            {labourNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        {/* Party Name Filter */}
        <div>
          <label htmlFor="partyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Party Name
          </label>
          <select name="partyName" id="partyName" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <option value="">All Parties</option>
            {partyNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <input type="text" name="category" id="category" onChange={handleInputChange} placeholder="e.g., Food, Travel" className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>

        {/* Start Date Filter */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input type="date" name="startDate" id="startDate" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>

        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input type="date" name="endDate" id="endDate" onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>
    </div>
  );
}
