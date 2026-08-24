export function formatCurrency(value: number) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(new Date(value));
}

export function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
