
import { Router } from 'express'

import {
  getServers,
  getServer,
  getStats,
  changeServerStatus,
} from '../controllers/monitoring.controller'

const router = Router()

// Récupérer tous les serveurs
router.get('/', getServers)

// Récupérer les statistiques
router.get('/stats', getStats)

// Récupérer un serveur par son identifiant
router.get('/:id', getServer)

// Simuler le changement de statut d'un serveur
router.patch('/:id/status', changeServerStatus)

export default router
