import React from "react";
import { MapPin } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { DataItem } from "./DataItem";

interface LocationCardProps {
  data: IPStackResponse;
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
        <DataItem label="Región"><p>{data.region_name} ({data.region_code})</p></DataItem>
        <DataItem label="Ciudad"><p>{data.city}</p></DataItem>
        <DataItem label="Código Postal"><p>{data.zip}</p></DataItem>
        <DataItem label="Coordenadas">
          <p className="font-mono">{data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}</p>
        </DataItem>
      </CardContent>
    </Card>
  );
};