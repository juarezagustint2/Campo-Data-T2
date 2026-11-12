/** Convierte dólares a pesos usando la cotización (pesos por dólar). */
export function usdToArs(usd: number, pesosPorDolar: number): number {
  return Math.round(usd * pesosPorDolar);
}

const usdFmt = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const arsFmt = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export const formatUsd = (n: number) => usdFmt.format(n);
export const formatArs = (n: number) => arsFmt.format(n);
