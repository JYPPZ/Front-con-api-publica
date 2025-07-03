import { useState, useCallback } from "react"
import { fetchIPData, getCurrentClientIP } from "../api/ipstackService"
import type { IPStackResponse } from "../types/ipstack"

/**
 * Custom Hook para gestionar la obtención de datos de geolocalización IP.
 */
export const useIpData = () => {
  const [data, setData] = useState<IPStackResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Busca datos para una IP específica.
   */
  const fetchDataForIP = useCallback(async (ip: string) => {
    if (!ip) {
      setError("Por favor, ingresa una dirección IP.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchIPData(ip)
      setData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido"
      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Obtiene la IP del cliente actual y luego busca sus datos.
   */
  const fetchCurrentUserIPData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const clientIP = await getCurrentClientIP()
      await fetchDataForIP(clientIP)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido"
      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [fetchDataForIP])


  return { data, loading, error, fetchDataForIP, fetchCurrentUserIPData }
}