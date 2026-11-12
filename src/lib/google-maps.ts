/// <reference types="google.maps" />

let loader: Promise<typeof google.maps> | null = null;

/** Carga Maps JavaScript una sola vez (solo en el navegador). */
export function loadGoogleMaps(): Promise<typeof google.maps> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    if (!key) {
      reject(new Error("Falta la clave de Google Maps"));
      return;
    }
    const w = window as unknown as Record<string, unknown>;
    w["__campoDataMapsReady"] = () => resolve(google.maps);
    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(String(key))}` +
      `&loading=async&callback=__campoDataMapsReady&language=es&region=AR` +
      (channel ? `&channel=${encodeURIComponent(String(channel))}` : "");
    script.async = true;
    script.onerror = () => {
      loader = null;
      reject(new Error("No se pudo cargar Google Maps"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

/** Resuelve un token CSS (p. ej. "--region-noa") a un color rgb() que entiende Google Maps. */
export function cssVarToRgb(varName: string, fallback = "rgb(120,140,90)"): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!raw) return fallback;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r},${g},${b})`;
}
