
import axios from 'axios'

// Statuts possibles d'un serveur
export type ServerStatus =
  | 'UP'
  | 'DOWN'
  | 'MAINT'
  | 'DRAIN'
  | 'NO_CHECK'

// Structure des données d'un serveur
export interface MonitoringServer {
  id: number
  name: string
  address: string
  status: ServerStatus
  responseTime: number | null
}

// Structure des statistiques
export interface MonitoringStats {
  total: number
  up: number
  down: number
  maintenance: number
  drain: number
  noCheck: number
}

// Adresse du backend Express
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Récupérer tous les serveurs
export const getServers = async (): Promise<MonitoringServer[]> => {
  const response = await axios.get<MonitoringServer[]>(
    `${API_BASE_URL}/api/monitoring`
  )

  return response.data
}

// Récupérer les statistiques de supervision
export const getMonitoringStats = async (): Promise<MonitoringStats> => {
  const response = await axios.get<MonitoringStats>(
    `${API_BASE_URL}/api/monitoring/stats`
  )

  return response.data
}

// Récupérer un serveur par son identifiant
export const getServerById = async (
  id: number
): Promise<MonitoringServer> => {
  const response = await axios.get<MonitoringServer>(
    `${API_BASE_URL}/api/monitoring/${id}`
  )

  return response.data

}


/**
 * Simuler un changement de statut d'un serveur.
 *
 * Cette fonction envoie une requête PATCH
 * au backend Express.
 *
 * Elle concerne uniquement les serveurs fictifs.
 */
export const updateServerStatus = async (
  id: number,
  status: ServerStatus
): Promise<MonitoringServer> => {
  const response = await axios.patch<{
    message: string
    server: MonitoringServer
  }>(
    `${API_BASE_URL}/api/monitoring/${id}/status`,
    { status }
  )

  return response.data.server
}

