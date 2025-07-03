import { useEffect, useRef } from "react";

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

  useEffect(() => {
    // La función que inicializa y actualiza el mapa
    const setupMap = async () => {
      if (typeof window === "undefined" || !mapRef.current) return;

      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Si el mapa no está inicializado, lo creamos
      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          zoomControl: false
        }).setView([latitude, longitude], 10);
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapInstanceRef.current = map;
      }
      
      // Lógica de actualización
      const map = mapInstanceRef.current;
      map.setView([latitude, longitude], 10);

      // Limpiamos marcadores y círculos anteriores para evitar duplicados
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
          map.removeLayer(layer);
        }
      });
      
      // Recreamos el marcador y el popup con la nueva información
      const customIcon = L.divIcon({
        html: `
          <div class="flex flex-col items-center">
            <div class="bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="bg-white px-2 py-1 rounded shadow-md border text-xs font-medium text-gray-700 mt-1">
              ${flag} ${city}
            </div>
          </div>
        `,
        className: "custom-marker",
        iconSize: [60, 80],
        iconAnchor: [30, 70],
      });

      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div class="p-2 text-sm">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">${flag}</span>
            <strong class="text-lg">${city}</strong>
          </div>
          <p><strong>IP:</strong> <code class="bg-gray-100 px-1 rounded">${ip}</code></p>
          <p><strong>Región:</strong> ${region}</p>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();

      L.circle([latitude, longitude], {
        color: "#3b82f6",
        fillColor: "#3b82f6",
        fillOpacity: 0.1,
        radius: 5000,
      }).addTo(map);
    };

    setupMap();

    // Se ejecuta cuando el componente se desmonta
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, city, region, country, ip, flag]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}