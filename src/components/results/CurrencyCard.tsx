// src/components/results/CurrencyCard.tsx
import React from "react";
import { DollarSign } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

interface CurrencyCardProps {
  data: Pick<IPStackResponse, 'currency'>;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Moneda
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DataItem label="Nombre">
          <p className="flex items-center gap-2">
            <span className="text-xl">{data.currency.symbol}</span>
            <span>{data.currency.name}</span>
          </p>
        </DataItem>
        <DataItem label="Código">
          <Badge variant="outline">{data.currency.code}</Badge>
        </DataItem>
        <DataItem label="Símbolo Nativo">
          <p className="text-lg">{data.currency.symbol_native}</p>
        </DataItem>
      </CardContent>
    </Card>
  );
};