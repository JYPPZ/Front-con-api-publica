import React from "react";
import type { IPStackResponse } from "../../types/ipstack"; // Ajusta la ruta a tus tipos
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";
import { Globe } from "lucide-react";

interface BasicInfoCardProps {
  data: IPStackResponse;
}

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
        <DataItem label="Dirección IP">
          <p className="text-lg font-mono">{data.ip}</p>
        </DataItem>
        <DataItem label="Tipo">
          <Badge >{data.type.toUpperCase()}</Badge>
        </DataItem>
        {data.hostname && (
          <DataItem label="Hostname">
            <p className="text-sm font-mono">{data.hostname}</p>
          </DataItem>
        )}
      </CardContent>
    </Card>
  );
};