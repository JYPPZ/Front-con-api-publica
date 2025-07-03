import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  ip: string;
  flag: string;
}

export default function MapComponent({ latitude, longitude, city, region, country, ip, flag }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined" || !mapRef.current) return;

      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      leafletRef.current = L;

      // Solución estándar para un problema común con los iconos por defecto de Leaflet en bundlers como Vite.
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Solo inicializamos el mapa si no existe ya una instancia
      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([latitude, longitude], 10);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([latitude, longitude]).addTo(map);

        // Contenido del popup
        const popupContent = `
          <div class="p-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">${flag}</span>
              <strong class="text-base">${city}, ${country}</strong>
            </div>
            <p class="text-xs"><strong>IP:</strong> ${ip}</p>
          </div>
        `;

        marker.bindPopup(popupContent).openPopup();
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && leafletRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], 10);
      const L = leafletRef.current;
      const marker = mapInstanceRef.current.getLayers().find((layer: any) => layer instanceof L.Marker);
      if (marker) {
        marker.setLatLng([latitude, longitude]);
      }
    }
  }, [latitude, longitude]);

  return (
      <div ref={mapRef} className="w-full h-full rounded-lg" />
  );
}