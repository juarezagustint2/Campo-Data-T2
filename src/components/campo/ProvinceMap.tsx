/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { cssVarToRgb, loadGoogleMaps } from "@/lib/google-maps";
import { PROVINCIAS_AGRO, type Region } from "@/data/provincias-agro";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ saturation: -60 }, { lightness: 25 }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.locality", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ saturation: -40 }, { lightness: 10 }] },
];

export function ProvinceMap({ selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const selectedRef = useRef<string | null>(selectedId);
  const hoverRef = useRef<string | null>(null);
  const onSelectRef = useRef(onSelect);
  const restyleRef = useRef<() => void>(() => {});
  const [hoverName, setHoverName] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((maps) => {
        if (cancelled || !containerRef.current) return;
        const regionColors: Record<Region, string> = {
          pampeana: cssVarToRgb("--region-pampeana"),
          noa: cssVarToRgb("--region-noa"),
          nea: cssVarToRgb("--region-nea"),
          cuyo: cssVarToRgb("--region-cuyo"),
          patagonia: cssVarToRgb("--region-patagonia"),
        };
        const stroke = cssVarToRgb("--map-stroke");
        const selectedFill = cssVarToRgb("--map-selected");
        const selectedStroke = cssVarToRgb("--map-selected-stroke");

        const map = new maps.Map(containerRef.current, {
          center: { lat: -38.5, lng: -63.5 },
          zoom: 4,
          minZoom: 3,
          maxZoom: 9,
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
          styles: MAP_STYLES,
        });
        mapRef.current = map;
        map.fitBounds({ south: -55.2, west: -73.6, north: -21.7, east: -53.6 }, 8);

        map.data.loadGeoJson("/data/provincias.geojson");

        const restyle = () => {
          map.data.setStyle((feature) => {
            const id = String(feature.getProperty("id"));
            const info = PROVINCIAS_AGRO[id];
            const isSelected = id === selectedRef.current;
            const isHover = id === hoverRef.current;
            return {
              fillColor: isSelected ? selectedFill : info ? regionColors[info.region] : regionColors.pampeana,
              fillOpacity: isSelected ? 0.92 : isHover ? 0.85 : 0.62,
              strokeColor: isSelected ? selectedStroke : stroke,
              strokeWeight: isSelected ? 2.5 : 1.2,
              zIndex: isSelected ? 3 : isHover ? 2 : 1,
              cursor: "pointer",
            };
          });
        };
        restyleRef.current = restyle;
        restyle();

        map.data.addListener("click", (e: google.maps.Data.MouseEvent) => {
          onSelectRef.current(String(e.feature.getProperty("id")));
        });
        map.data.addListener("mouseover", (e: google.maps.Data.MouseEvent) => {
          const id = String(e.feature.getProperty("id"));
          hoverRef.current = id;
          setHoverName(PROVINCIAS_AGRO[id]?.nombre ?? String(e.feature.getProperty("nombre")));
          restyle();
        });
        map.data.addListener("mouseout", () => {
          hoverRef.current = null;
          setHoverName(null);
          restyle();
        });
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    selectedRef.current = selectedId;
    restyleRef.current();
  }, [selectedId]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-card">
      <div ref={containerRef} className="h-full w-full" aria-label="Mapa de provincias de Argentina" />
      {status !== "ready" && (
        <div className="absolute inset-0 grid place-items-center bg-muted field-texture">
          <p className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground shadow-card">
            {status === "loading" ? "Cargando mapa…" : "No se pudo cargar el mapa. Elegí una provincia de la lista."}
          </p>
        </div>
      )}
      {hoverName && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-soil px-3 py-1.5 text-xs font-semibold text-soil-foreground shadow-card">
          {hoverName}
        </div>
      )}
    </div>
  );
}
