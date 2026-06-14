import type { JobItem } from '@/data/jobs';

const statusStyles: Record<string, string> = {
  NEW: 'bg-green-100 text-green-700',
  OUT: 'bg-red-100 text-red-700',
  SOON: 'bg-blue-100 text-blue-700',
  PDF: 'bg-brand-100 text-brand-700',
  ONLINE: 'bg-green-100 text-green-700',
  EXTEND: 'bg-blue-100 text-blue-700',
  ALERT: 'bg-red-100 text-red-700',
  STARTED: 'bg-blue-100 text-blue-700',
  DATE: 'bg-gray-100 text-gray-600',
  'APPLY NOW': 'bg-green-100 text-green-700',
};

interface StatusBadgeProps {
  status?: JobItem['status'];
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  if (!status) return null;

  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-1.5 py-0.5'
    : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-block rounded-full font-semibold uppercase tracking-wide ${sizeClasses} ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}
    >
      {status}
    </span>
  );
}
