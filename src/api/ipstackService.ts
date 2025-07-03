import type { IPStackResponse, IPStackErrorResponse } from "../types/ipstack"

// Leer la API key de las variables de entorno de Vite
const API_KEY = import.meta.env.IPSTACK_API_KEY
const BASE_URL = "https://api.ipstack.com/"

/**
 * Busca los datos de geolocalización para una dirección IP específica.
 * @param ip - La dirección IP a buscar.
 * @returns Una promesa que se resuelve con los datos de la IP.
 * @throws Si la API key no está configurada, si hay un error de red,
 * o si la API devuelve un error específico.
 */
export const fetchIPData = async (ip: string): Promise<IPStackResponse> => {
  if (!API_KEY) {
    throw new Error("La API key de IPStack no está configurada en .env.local")
  }

  const url = `${BASE_URL}${ip}?access_key=${API_KEY}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status} ${response.statusText}`)
    }

    const data: IPStackResponse | IPStackErrorResponse = await response.json()

    if ("error" in data) {
      console.error("Error de la API de IPStack:", data.error)
      throw new Error(data.error.info || "Error al consultar la API de IPStack")
    }

    return data

  } catch (error) {
    console.error("Falló la obtención de datos de IP:", error)
    throw error
  }
}

/**
 * Obtiene la dirección IP pública del cliente actual.
 * @returns Una promesa que se resuelve con la dirección IP del cliente.
 */
export const getCurrentClientIP = async (): Promise<string> => {
  try {
    // Usamos un servicio diferente y simple para solo obtener la IP
    const response = await fetch("https://api.ipify.org?format=json")
    if (!response.ok) {
      throw new Error("No se pudo obtener la IP del cliente.")
    }
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error("Error obteniendo la IP del cliente:", error)
    throw new Error("No se pudo obtener tu dirección IP actual. Inténtalo de nuevo.")
  }
}