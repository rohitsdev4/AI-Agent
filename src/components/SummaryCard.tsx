interface SummaryCardProps {
  title: string;
  value: number;
  currency?: string;
  colorClassName?: string;
}

export default function SummaryCard({
  title,
  value,
  currency = 'USD',
  colorClassName = 'text-gray-900 dark:text-gray-100'
}: SummaryCardProps) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className={`text-3xl font-bold ${colorClassName}`}>{formattedValue}</p>
    </div>
  );
}
