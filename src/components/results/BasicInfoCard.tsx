// src/components/results/BasicInfoCard.tsx
import React from "react";
import { Globe } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface BasicInfoCardProps {
  data: Pick<IPStackResponse, 'ip' | 'type' | 'hostname'>;
}

// Un componente para cada fila de datos para no repetir clases
const DataRow: React.FC<{ label: string; value: string; isMono?: boolean }> = ({ label, value, isMono }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={isMono ? "font-mono" : ""}>{value}</p>
  </div>
);

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Información Básica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DataRow label="Dirección IP" value={data.ip} isMono />
        <div>
          <p className="text-sm font-medium text-gray-500">Tipo</p>
          <Badge>{data.type.toUpperCase()}</Badge>
        </div>
        <DataRow label="Hostname" value={data.hostname} isMono />
      </CardContent>
    </Card>
  );
};