// src/components/results/SecurityCard.tsx
import React from "react";
import { Shield } from "lucide-react";
import type { IPStackResponse } from "../../types/ipstack";
import { getThreatLevelColor } from "../../utils/styleUtils";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { DataItem } from "./DataItem";

interface SecurityCardProps {
  data: IPStackResponse;
}

const SecurityFlag: React.FC<{ label: string; value: boolean }> = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500">{label}</p>
    <Badge >{value ? "Sí" : "No"}</Badge>
  </div>
);

export const SecurityCard: React.FC<SecurityCardProps> = ({ data }) => {
  //const { security } = data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Seguridad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.security ? (
          <>
            <DataItem label="Nivel de Amenaza">
              <Badge className={getThreatLevelColor(data.security.threat_level)}>
                {data.security.threat_level.toUpperCase()}
              </Badge>
            </DataItem>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <SecurityFlag label="Proxy" value={data.security.is_proxy} />
              <SecurityFlag label="Tor" value={data.security.is_tor} />
              <SecurityFlag label="Crawler" value={data.security.is_crawler} />
              <SecurityFlag label="Hosting" value={data.security.hosting_facility} />
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Información de seguridad no disponible
          </p>
        )}
      </CardContent>
    </Card>
  );
};