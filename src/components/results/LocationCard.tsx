import React from "react";
import { MapPin } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

// Componente para una fila de datos, para no repetir clases.
const DataRow: React.FC<{ label: string; value: string; isMono?: boolean }> = ({ label, value, isMono }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={isMono ? "font-mono" : ""}>{value}</p>
  </div>
);

interface LocationCardProps {
  // Tomamos solo las propiedades que necesitamos del objeto principal
  data: Pick<IPStackResponse, 'location' | 'country_name' | 'continent_name' | 'region_name' | 'region_code' | 'city' | 'zip' | 'latitude' | 'longitude'>;
}

export const LocationCard: React.FC<LocationCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{data.location.country_flag_emoji}</span>
          <div>
            <p className="font-medium">{data.country_name}</p>
            <p className="text-sm text-gray-500">{data.continent_name}</p>
          </div>
        </div>
        <DataRow label="Región" value={`${data.region_name} (${data.region_code})`} />
        <DataRow label="Ciudad" value={data.city} />
        <DataRow label="Código Postal" value={data.zip} />
        <DataRow 
          label="Coordenadas" 
          value={`${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`} 
          isMono 
        />
      </CardContent>
    </Card>
  );
};