import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { MousePointerClick } from "lucide-react";
import { ProvinceMap } from "@/components/campo/ProvinceMap";
import { ProvincePanel } from "@/components/campo/ProvincePanel";
import { PROVINCIAS_AGRO, REGIONES, type Region } from "@/data/provincias-agro";
import { dolarQueryOptions } from "@/lib/dolar.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campo Data · Mapa agrícola de Argentina" },
      {
        name: "description",
        content:
          "Tocá una provincia y conocé su cultivo recomendado, el más cosechado, costos por hectárea en dólares y pesos, y su clima promedio.",
      },
      { property: "og:title", content: "Campo Data · Mapa agrícola de Argentina" },
      {
        property: "og:description",
        content: "Cultivos, costos y clima de cada provincia argentina en un mapa interactivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(dolarQueryOptions),
  component: CampoData,
});

const REGION_DOT: Record<Region, string> = {
  pampeana: "bg-region-pampeana",
  noa: "bg-region-noa",
  nea: "bg-region-nea",
  cuyo: "bg-region-cuyo",
  patagonia: "bg-region-patagonia",
};

const ORDENADAS = Object.entries(PROVINCIAS_AGRO).sort((a, b) => a[1].nombre.localeCompare(b[1].nombre, "es"));

function CampoData() {
  const { data: dolar } = useSuspenseQuery(dolarQueryOptions);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const provincia = selectedId ? PROVINCIAS_AGRO[selectedId] : undefined;

  const select = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
        <header className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Argentina agrícola</p>
            <h1 className="mt-1 text-5xl font-bold leading-none text-foreground sm:text-6xl">
              Campo <span className="italic text-primary">Data</span>
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Cultivos, costos y clima de cada provincia. Tocá el mapa para explorar.
            </p>
          </div>
          <label className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground">
            O elegí de la lista
            <select
              value={selectedId ?? ""}
              onChange={(e) => e.target.value && select(e.target.value)}
              className="h-11 rounded-xl border border-input bg-card px-3 text-sm font-medium text-foreground shadow-card outline-none focus:ring-2 focus:ring-ring lg:w-72"
            >
              <option value="" disabled>
                Seleccionar provincia…
              </option>
              {ORDENADAS.map(([id, p]) => (
                <option key={id} value={id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </label>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="h-[62vh] min-h-[420px] lg:h-[calc(100vh-11rem)]">
              <ProvinceMap selectedId={selectedId} onSelect={select} />
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {(Object.keys(REGIONES) as Region[]).map((r) => (
                <li key={r} className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${REGION_DOT[r]}`} />
                  {REGIONES[r]}
                </li>
              ))}
            </ul>
          </div>

          <div ref={panelRef} className="scroll-mt-4">
            {provincia ? (
              <ProvincePanel provincia={provincia} dolar={dolar} />
            ) : (
              <div className="grid h-full min-h-[320px] place-items-center rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center field-texture">
                <div>
                  <MousePointerClick className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-2xl font-bold">Elegí una provincia</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Vas a ver el cultivo más recomendado, el más cosechado, los costos por hectárea y el clima.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-10 text-xs text-muted-foreground">
          Valores de referencia estimados con fines informativos. Cotización: dólar oficial (DolarAPI).
        </footer>
      </div>
    </main>
  );
}
