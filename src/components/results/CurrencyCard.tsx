// src/components/results/CurrencyCard.tsx
import React from "react";
import { DollarSign } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

interface CurrencyCardProps {
  data: IPStackResponse;
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
        {data.currency ? (
          <>
            <DataItem label="Nombre">
              <p className="flex items-center gap-2">
                <span className="text-xl">{data.currency.symbol}</span>
                <span>{data.currency.name}</span>
              </p>
            </DataItem>
            <DataItem label="Código">
              <Badge >{data.currency.code}</Badge>
            </DataItem>
            <DataItem label="Símbolo Nativo">
              <p className="text-lg">{data.currency.symbol_native}</p>
            </DataItem>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Información de moneda no disponible
          </p>
        )}
      </CardContent>
    </Card>
  );
};