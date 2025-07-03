import React from "react";
import { Clock } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

interface TimeZoneCardProps {
  data: Pick<IPStackResponse, 'time_zone'>;
}

export const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Zona Horaria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DataItem label="ID Zona Horaria">
          <p>{data.time_zone.id}</p>
        </DataItem>
        <DataItem label="Hora Local">
          <p className="font-mono">{new Date(data.time_zone.current_time).toLocaleString()}</p>
        </DataItem>
        <DataItem label="Código">
          <Badge variant="outline">{data.time_zone.code}</Badge>
        </DataItem>
        <DataItem label="Horario de Verano">
          <Badge variant={data.time_zone.is_daylight_saving ? "default" : "secondary"}>
            {data.time_zone.is_daylight_saving ? "Activo" : "Inactivo"}
          </Badge>
        </DataItem>
      </CardContent>
    </Card>
  );
};