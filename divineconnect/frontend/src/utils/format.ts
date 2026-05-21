export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatTime = (time: string): string => {
  return time;
};

export const formatDateTime = (date: string | Date, time: string): string => {
  return `${formatDate(date)} at ${time}`;
};

export const timeAgo = (date: string | Date): string => {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(date);
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: '#F59E0B',
    confirmed: '#2563EB',
    in_progress: '#FF6F00',
    completed: '#059669',
    cancelled: '#DC2626',
    refunded: '#6B7280',
  };
  return colors[status] || '#6B7280';
};

export const getStatusLabel = (status: string): string => {
  return status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
