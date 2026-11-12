import { CloudSun, Coins, Droplets, Sprout, Thermometer, Wheat } from "lucide-react";
import { REGIONES, type ProvinciaAgro } from "@/data/provincias-agro";
import { formatArs, formatUsd, usdToArs } from "@/lib/currency";
import type { Cotizacion } from "@/lib/dolar.functions";

const REGION_DOT: Record<ProvinciaAgro["region"], string> = {
  pampeana: "bg-region-pampeana",
  noa: "bg-region-noa",
  nea: "bg-region-nea",
  cuyo: "bg-region-cuyo",
  patagonia: "bg-region-patagonia",
};

export function ProvincePanel({ provincia, dolar }: { provincia: ProvinciaAgro; dolar: Cotizacion }) {
  const { clima } = provincia;
  return (
    <article key={provincia.nombre} className="animate-rise space-y-4">
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          <span className={`h-2 w-2 rounded-full ${REGION_DOT[provincia.region]}`} />
          {REGIONES[provincia.region]}
        </span>
        <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">{provincia.nombre}</h2>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <section className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-80">
            <Sprout className="h-4 w-4" /> Más recomendado
          </div>
          <p className="mt-2 font-display text-2xl font-bold">{provincia.recomendado.cultivo}</p>
          <p className="mt-1 text-sm opacity-85">{provincia.recomendado.motivo}</p>
        </section>
        <section className="rounded-2xl bg-accent p-4 text-accent-foreground shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-80">
            <Wheat className="h-4 w-4" /> Más cosechado
          </div>
          <p className="mt-2 font-display text-2xl font-bold">{provincia.masCosechado.cultivo}</p>
          <p className="mt-1 text-sm opacity-85">{provincia.masCosechado.detalle}</p>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Coins className="h-5 w-5 text-primary" /> Costo promedio por hectárea
          </h3>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">Cultivo</th>
                <th className="px-3 py-2 text-right font-semibold">USD</th>
                <th className="px-3 py-2 text-right font-semibold">ARS</th>
              </tr>
            </thead>
            <tbody>
              {provincia.cultivos.map((c) => (
                <tr key={c.nombre} className="border-t border-border">
                  <td className="px-3 py-2.5 font-medium">{c.nombre}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{formatUsd(c.costoUsdHa)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-muted-foreground">
                    {formatArs(usdToArs(c.costoUsdHa, dolar.venta))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Dólar oficial {formatArs(dolar.venta)}
          {dolar.enVivo ? " · cotización del día" : " · cotización de referencia"}. Costos estimados.
        </p>
      </section>

      <section className="rounded-2xl bg-soil p-4 text-soil-foreground shadow-card">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <CloudSun className="h-5 w-5 text-wheat" /> Clima promedio
        </h3>
        <p className="mt-1 text-sm opacity-80">{clima.tipo}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<Thermometer className="h-4 w-4" />} label="Media anual" value={`${clima.tempMedia} °C`} />
          <Stat label="Verano" value={`${clima.tempVerano} °C`} />
          <Stat label="Invierno" value={`${clima.tempInvierno} °C`} />
          <Stat icon={<Droplets className="h-4 w-4" />} label="Lluvia anual" value={`${clima.lluviaAnualMm} mm`} />
        </dl>
      </section>
    </article>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-soil-foreground/10 p-3">
      <dt className="flex items-center gap-1 text-xs opacity-75">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-display text-xl font-bold text-wheat">{value}</dd>
    </div>
  );
}
