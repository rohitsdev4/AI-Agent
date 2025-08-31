'use client';

import { Transaction } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface IncomeExpenseChartProps {
  data: Transaction[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  // Process data to aggregate income and expense by date
  const processedData = data.reduce((acc, transaction) => {
    const date = new Date(transaction.timestamp.split(' ')[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }
    if (transaction.type === 'Payment Received') {
      acc[date].income += transaction.amount;
    } else if (transaction.type === 'Expense') {
      acc[date].expense += transaction.amount;
    }
    return acc;
  }, {} as { [key: string]: { date: string; income: number; expense: number } });

  const chartData = Object.values(processedData).sort((a, b) => {
      // We need to convert back to a full date to sort properly
      return new Date(a.date + " " + new Date().getFullYear()).getTime() - new Date(b.date + " " + new Date().getFullYear()).getTime();
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
        />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#16a34a" activeDot={{ r: 8 }} name="Income" />
        <Line type="monotone" dataKey="expense" stroke="#dc2626" name="Expense" />
      </LineChart>
    </ResponsiveContainer>
  );
}
