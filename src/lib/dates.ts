const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-11-01" → "01 Nov 2026", the date style used across the apps. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day} ${months[Number(month) - 1]} ${year}`;
}

/** Short day and month, e.g. "23 Oct". */
export function formatDayMonth(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`;
}

/** Local calendar date as "YYYY-MM-DD". */
export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
