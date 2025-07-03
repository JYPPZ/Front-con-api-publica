// src/components/results/ConnectionCard.tsx
import React from "react";
import { Wifi } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

interface ConnectionCardProps {
  data: Pick<IPStackResponse, 'connection'>;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Conexión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DataItem label="ISP"><p>{data.connection.isp}</p></DataItem>
        <DataItem label="Operador"><p className="capitalize">{data.connection.carrier}</p></DataItem>
        <DataItem label="ASN"><Badge variant="outline">{data.connection.asn}</Badge></DataItem>
        <DataItem label="Dominio"><p className="font-mono">{data.connection.sld}.{data.connection.tld}</p></DataItem>
      </CardContent>
    </Card>
  );
};