import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

export interface Cotizacion {
  venta: number;
  fecha: string | null;
  enVivo: boolean;
}

// Valor de respaldo si la cotización en vivo no responde.
const RESPALDO = 1570;

export const getDolarOficial = createServerFn({ method: "GET" }).handler(async (): Promise<Cotizacion> => {
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/oficial", {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`dolarapi ${res.status}`);
    const data = (await res.json()) as { venta?: unknown; fechaActualizacion?: unknown };
    const venta = Number(data.venta);
    if (!Number.isFinite(venta) || venta <= 0) throw new Error("cotización inválida");
    return {
      venta,
      fecha: typeof data.fechaActualizacion === "string" ? data.fechaActualizacion : null,
      enVivo: true,
    };
  } catch (err) {
    console.error("No se pudo obtener el dólar oficial:", err);
    return { venta: RESPALDO, fecha: null, enVivo: false };
  }
});

export const dolarQueryOptions = queryOptions({
  queryKey: ["dolar-oficial"],
  queryFn: () => getDolarOficial(),
  staleTime: 30 * 60 * 1000,
});
