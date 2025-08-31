'use client';

import { Transaction } from '@/lib/types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CategoryPieChartProps {
  data: Transaction[];
}

// A list of colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d'];

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  // Process data to aggregate expenses by category
  const expenseData = data
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = { name: category, value: 0 };
      }
      acc[category].value += transaction.amount;
      return acc;
    }, {} as { [key: string]: { name: string; value: number } });

  const chartData = Object.values(expenseData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={(entry) => entry.name}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
