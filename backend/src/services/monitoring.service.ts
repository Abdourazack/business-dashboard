
import {
  servers,
  type MonitoringServer,
  type ServerStatus,
} from '../data/monitoring.data'

// Récupérer tous les serveurs
export const getAllServers = (): MonitoringServer[] => {
  return servers
}

// Récupérer un serveur par son identifiant
export const getServerById = (
  id: number,
): MonitoringServer | undefined => {
  return servers.find((server) => server.id === id)
}

// Calculer les statistiques de supervision
export const getMonitoringStats = () => {
  const countByStatus = (status: ServerStatus) =>
    servers.filter((server) => server.status === status).length

  return {
    total: servers.length,
    up: countByStatus('UP'),
    down: countByStatus('DOWN'),
    maintenance: countByStatus('MAINT'),
    drain: countByStatus('DRAIN'),
    noCheck: countByStatus('NO_CHECK'),
  }

}


export const updateServerStatus = (
  id: number,
  status: ServerStatus,
): MonitoringServer | null => {
  const server = servers.find((item) => item.id === id)

  if (!server) {
    return null
  }

  // Modification du statut en mémoire uniquement
  server.status = status

  // Pas de temps de réponse si le serveur est indisponible
  if (
    status === 'DOWN' ||
    status === 'MAINT' ||
    status === 'NO_CHECK'
  ) {
    server.responseTime = null
  } else if (server.responseTime === null) {
    // Valeur fictive utilisée pour la démonstration
    server.responseTime = 25
  }

  return server
}

