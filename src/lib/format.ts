export function formatPrice(price?: number, currency = 'MAD'): string {
  if (price === undefined || price === null) return '';
  return `${price} ${currency}`;
}

export function formatDuration(minutes?: number): string {
  if (!minutes || minutes <= 0) return '';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
}

export function stripAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
