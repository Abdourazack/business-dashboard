
import type { Request, Response } from 'express'

import {
  getAllServers,
  getServerById,
  getMonitoringStats,
  updateServerStatus,
} from '../services/monitoring.service'

import type { ServerStatus } from '../data/monitoring.data'

// Statuts autorisés pour les serveurs fictifs
const allowedStatuses: ServerStatus[] = [
  'UP',
  'DOWN',
  'MAINT',
  'DRAIN',
  'NO_CHECK',
]

// =====================================================
// GET /api/monitoring
// Récupérer tous les serveurs
// =====================================================
export const getServers = (
  _req: Request,
  res: Response,
): void => {
  const servers = getAllServers()

  res.status(200).json(servers)
}

// =====================================================
// GET /api/monitoring/stats
// Récupérer les statistiques
// =====================================================
export const getStats = (
  _req: Request,
  res: Response,
): void => {
  const stats = getMonitoringStats()

  res.status(200).json(stats)
}

// =====================================================
// GET /api/monitoring/:id
// Récupérer un serveur par ID
// =====================================================
export const getServer = (
  req: Request,
  res: Response,
): void => {
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      message: 'Identifiant de serveur invalide',
    })
    return
  }

  const server = getServerById(id)

  if (!server) {
    res.status(404).json({
      message: 'Serveur introuvable',
    })
    return
  }

  res.status(200).json(server)
}

// =====================================================
// PATCH /api/monitoring/:id/status
// Simuler un changement de statut
// =====================================================
export const changeServerStatus = (
  req: Request,
  res: Response,
): void => {
  // Vérifier l'identifiant
  const id = Number(req.params.id)

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({
      message: 'Identifiant de serveur invalide',
    })
    return
  }

  // Récupérer le statut envoyé par le client
  const status: unknown = req.body?.status

  // Vérifier que le statut est autorisé
  if (
    typeof status !== 'string' ||
    !allowedStatuses.some(
      (allowedStatus) => allowedStatus === status
    )
  ) {
    res.status(400).json({
      message: 'Statut de serveur invalide',
      allowedStatuses,
    })
    return
  }

  // Le statut est maintenant validé
  const validStatus = status as ServerStatus

  // Modifier le serveur fictif en mémoire
  const updatedServer = updateServerStatus(
    id,
    validStatus,
  )

  if (!updatedServer) {
    res.status(404).json({
      message: 'Serveur introuvable',
    })
    return
  }

  // Retourner le résultat
  res.status(200).json({
    message: 'Statut du serveur mis à jour',
    server: updatedServer,
  })
}
