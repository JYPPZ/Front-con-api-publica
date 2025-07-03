// src/components/results/BasicInfoCard.tsx
import React from "react";
import { Globe } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

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
        <DataItem label="Dirección IP"><p className="font-mono">{data.ip}</p></DataItem>
        <DataItem label="Tipo"><Badge>{data.type.toUpperCase()}</Badge></DataItem>
        <DataItem label="Hostname"><p className="font-mono">{data.hostname}</p></DataItem>
      </CardContent>
    </Card>
  );
};