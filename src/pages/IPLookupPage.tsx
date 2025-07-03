import { useState, Suspense, lazy } from "react";
import { Search, MapPin, AlertCircle, Loader2} from "lucide-react";  
import { useIpData } from "../hooks/useIpData";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { BasicInfoCard } from "../components/results/BasicInfoCard";
import { LocationCard } from "../components/results/LocationCard";
import { TimeZoneCard } from "../components/results/TimeZoneCard";
import { CurrencyCard } from "../components/results/CurrencyCard";
import { ConnectionCard } from "../components/results/ConnectionCard";
import { SecurityCard } from "../components/results/SecurityCard";

const MapComponent = lazy(() => import("../components/map/MapComponent"));

// El fallback para el suspense
const MapLoadingSkeleton = () => (
  <div className="h-64 md:h-80 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
  </div>
);


export default function IPLookupPage() {
  const { data, loading, error, fetchDataForIP, fetchCurrentUserIPData } = useIpData();
  const [ipAddress, setIpAddress] = useState("");

  const handleSearch = () => {
    fetchDataForIP(ipAddress);
  };

  const handleGetCurrentIP = () => {
    fetchCurrentUserIPData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Geolocalización IP</h1>
          <p className="text-lg text-gray-600">Obtén información detallada sobre cualquier dirección IP</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Search /> Buscar Información de IP</CardTitle>
            Ingresa una dirección IP o detecta tu ubicación actual
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Ej: 134.201.250.155"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button onClick={handleSearch} disabled={loading || !ipAddress}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Buscar
                </Button>
                <Button variant="outline" onClick={handleGetCurrentIP} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                  Mi IP
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-800" />
            <AlertDescription className="text-yellow-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <BasicInfoCard data={data} />
            <LocationCard data={data} />
            
            {/* Mapa (se mantiene igual) */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Ubicación en el Mapa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80 rounded-lg overflow-hidden">
                  <Suspense fallback={<MapLoadingSkeleton />}>
                  <MapComponent
                      latitude={data.latitude}
                      longitude={data.longitude}
                      city={data.city}
                      region={data.region_name}
                      country={data.country_name}
                      ip={data.ip}
                      flag={data.location.country_flag_emoji}
                    />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            <TimeZoneCard data={data} />
            <CurrencyCard data={data} />
            <ConnectionCard data={data} />
            <SecurityCard data={data} />

          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Powered by IPStack API • Desarrollado para prueba técnica</p>
        </div>
      </div>
    </div>
  );
}