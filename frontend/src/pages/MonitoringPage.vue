
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import {
  getServers,
  getMonitoringStats,
  updateServerStatus,
  type MonitoringServer,
  type MonitoringStats,
  type ServerStatus,
} from "../api/monitoring";

// ==========================================
// DONNÉES DU BACKEND
// ==========================================

const servers = ref<MonitoringServer[]>([]);
const stats = ref<MonitoringStats | null>(null);

const loading = ref(true);
const error = ref("");

// Gestion des simulations
const updatingServerId = ref<number | null>(null);
const simulationError = ref("");

// ==========================================
// RECHERCHE ET FILTRE PAR STATUT
// ==========================================

// Recherche par nom ou adresse IP
const searchQuery = ref("");

// Statut sélectionné dans la liste déroulante
const selectedStatus = ref<ServerStatus | "ALL">("ALL");

// Filtrage combiné : nom/IP + statut
const filteredServers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return servers.value.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(query) ||
      server.address.toLowerCase().includes(query);

    const matchesStatus =
      selectedStatus.value === "ALL" ||
      server.status === selectedStatus.value;

    return matchesSearch && matchesStatus;
  });
});

// Effacer la recherche et afficher tous les statuts
const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "ALL";
};

// ==========================================
// COULEURS DES STATUTS
// ==========================================

const getStatusClass = (status: ServerStatus): string => {
  switch (status) {
    case "UP":
      return "status-up";
    case "DOWN":
      return "status-down";
    case "MAINT":
      return "status-maint";
    case "DRAIN":
      return "status-drain";
    case "NO_CHECK":
      return "status-no-check";
    default:
      return "";
  }
};

// ==========================================
// CARTES DE STATISTIQUES
// ==========================================

const statCards = computed(() => {
  if (!stats.value) return [];

  return [
    {
      label: "Total serveurs",
      value: stats.value.total,
      color: "total",
    },
    {
      label: "En ligne",
      value: stats.value.up,
      color: "up",
    },
    {
      label: "Hors ligne",
      value: stats.value.down,
      color: "down",
    },
    {
      label: "Maintenance",
      value: stats.value.maintenance,
      color: "maintenance",
    },
    {
      label: "Drain",
      value: stats.value.drain,
      color: "drain",
    },
    {
      label: "Non vérifiés",
      value: stats.value.noCheck,
      color: "no-check",
    },
  ];
});

// ==========================================
// CHARGEMENT DES DONNÉES
// ==========================================

const loadMonitoring = async () => {
  loading.value = true;
  error.value = "";

  try {
    const [serversData, statsData] = await Promise.all([
      getServers(),
      getMonitoringStats(),
    ]);

    servers.value = serversData;
    stats.value = statsData;
  } catch (err) {
    console.error("Erreur API Monitoring :", err);

    error.value =
      "Impossible de récupérer les données du monitoring.";
  } finally {
    loading.value = false;
  }
};

// ==========================================
// SIMULATION DE PANNE
// ==========================================

const simulateServerStatus = async (
  server: MonitoringServer,
) => {
  if (updatingServerId.value !== null || loading.value) {
    return;
  }

  // Simulations autorisées pour UP et DOWN uniquement
  if (server.status !== "UP" && server.status !== "DOWN") {
    return;
  }

  // Inverser le statut du serveur
  const newStatus: ServerStatus =
    server.status === "UP" ? "DOWN" : "UP";

  updatingServerId.value = server.id;
  simulationError.value = "";

  try {
    // Modification côté backend Express
    await updateServerStatus(server.id, newStatus);

    // Actualisation des données
    await loadMonitoring();
  } catch (err) {
    console.error("Erreur simulation :", err);

    simulationError.value =
      "Impossible de modifier le statut du serveur.";
  } finally {
    updatingServerId.value = null;
  }
};

// ==========================================
// CHARGEMENT INITIAL
// ==========================================

onMounted(() => {
  loadMonitoring();
});
</script>

<template>
  <main class="monitoring-page">
    <div class="monitoring-container">

      <!-- EN-TÊTE -->
      <header class="monitoring-header">
        <div>
          <span class="eyebrow">
            BUSINESS DASHBOARD SUITE
          </span>

          <h1>Monitoring Dashboard</h1>

          <p>
            Supervision des serveurs et de leur disponibilité.
            Données fictives à des fins de démonstration.
          </p>
        </div>

        <button
          class="refresh-button"
          type="button"
          :disabled="loading || updatingServerId !== null"
          @click="loadMonitoring"
        >
          {{ loading ? "Chargement..." : "↻ Actualiser" }}
        </button>
      </header>

      <!-- CHARGEMENT -->
      <section
        v-if="loading"
        class="message-card"
        role="status"
      >
        Chargement des données de supervision...
      </section>

      <!-- ERREUR API -->
      <section
        v-else-if="error"
        class="message-card error-card"
        role="alert"
      >
        <p>{{ error }}</p>

        <button
          type="button"
          class="refresh-button"
          @click="loadMonitoring"
        >
          Réessayer
        </button>
      </section>

      <!-- DASHBOARD -->
      <template v-else>

        <!-- CARTES DE STATISTIQUES -->
        <section
          class="stats-grid"
          aria-label="Statistiques de supervision"
        >
          <article
            v-for="card in statCards"
            :key="card.label"
            class="stat-card"
            :class="card.color"
          >
            <span class="stat-label">
              {{ card.label }}
            </span>

            <strong class="stat-value">
              {{ card.value }}
            </strong>
          </article>
        </section>

        <!-- ERREUR DE SIMULATION -->
        <p
          v-if="simulationError"
          class="simulation-error"
          role="alert"
        >
          {{ simulationError }}
        </p>

        <!-- TABLEAU DES SERVEURS -->
        <section class="servers-section">

          <div class="section-header">
            <div>
              <h2>État des serveurs</h2>

              <p>
                {{ servers.length }} serveurs répertoriés
              </p>
            </div>

            <span class="demo-badge">
              Données de démonstration
            </span>
          </div>

          <!-- RECHERCHE ET FILTRE -->
          <div class="filters-container">

            <!-- Recherche -->
            <input
              v-model="searchQuery"
              type="search"
              class="search-input"
              placeholder="Rechercher un serveur ou une adresse IP..."
              aria-label="Rechercher un serveur"
            />

            <!-- Filtre par statut -->
            <select
              v-model="selectedStatus"
              class="status-filter"
              aria-label="Filtrer les serveurs par statut"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="UP">En ligne (UP)</option>
              <option value="DOWN">Hors ligne (DOWN)</option>
              <option value="MAINT">Maintenance</option>
              <option value="DRAIN">Drain</option>
              <option value="NO_CHECK">Non vérifiés</option>
            </select>

            <!-- Réinitialiser les filtres -->
            <button
              v-if="searchQuery || selectedStatus !== 'ALL'"
              type="button"
              class="reset-button"
              @click="resetFilters"
            >
              Réinitialiser
            </button>

            <!-- Nombre de résultats -->
            <span class="search-count">
              {{ filteredServers.length }} résultat(s)
            </span>
          </div>

          <!-- TABLEAU -->
          <div class="table-wrapper">
            <table class="servers-table">

              <thead>
                <tr>
                  <th>Serveur</th>
                  <th>Adresse IP</th>
                  <th>Statut</th>
                  <th>Temps de réponse</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="server in filteredServers"
                  :key="server.id"
                >
                  <!-- NOM -->
                  <td class="server-name">
                    {{ server.name }}
                  </td>

                  <!-- ADRESSE IP -->
                  <td class="server-address">
                    {{ server.address }}
                  </td>

                  <!-- STATUT -->
                  <td>
                    <span
                      class="status-badge"
                      :class="getStatusClass(server.status)"
                    >
                      {{ server.status }}
                    </span>
                  </td>

                  <!-- TEMPS DE RÉPONSE -->
                  <td>
                    {{
                      server.responseTime !== null
                        ? `${server.responseTime} ms`
                        : "Non disponible"
                    }}
                  </td>

                  <!-- ACTIONS -->
                  <td>
                    <button
                      v-if="
                        server.status === 'UP' ||
                        server.status === 'DOWN'
                      "
                      type="button"
                      class="simulation-button"
                      :class="{
                        'restore-button': server.status === 'DOWN'
                      }"
                      :disabled="
                        updatingServerId !== null || loading
                      "
                      @click="simulateServerStatus(server)"
                    >
                      {{
                        updatingServerId === server.id
                          ? "Modification..."
                          : server.status === "UP"
                            ? "Simuler une panne"
                            : "Remettre en ligne"
                      }}
                    </button>

                    <span
                      v-else
                      class="action-unavailable"
                    >
                      —
                    </span>
                  </td>
                </tr>

                <!-- AUCUN RÉSULTAT -->
                <tr v-if="filteredServers.length === 0">
                  <td
                    colspan="5"
                    class="empty-state"
                  >
                    Aucun serveur ne correspond aux filtres.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </template>
    </div>
  </main>
</template>

<style scoped>
/* ==========================================
   PAGE PRINCIPALE
========================================== */

.monitoring-page {
  min-height: 100vh;
  padding: 48px 24px;
  background: #0f172a;
  color: #f8fafc;
}

.monitoring-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ==========================================
   EN-TÊTE
========================================== */

.monitoring-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 36px;
}

.eyebrow {
  color: #a78bfa;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1 {
  margin: 12px 0;
  font-size: clamp(30px, 4vw, 42px);
  color: #f8fafc;
}

.monitoring-header p {
  color: #94a3b8;
  line-height: 1.6;
}

.refresh-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.refresh-button:hover:not(:disabled) {
  filter: brightness(1.1);
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ==========================================
   CARTES STATISTIQUES
========================================== */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid #8b5cf6;
}

.stat-label {
  font-size: 14px;
  color: #94a3b8;
}

.stat-value {
  font-size: 34px;
  color: #f8fafc;
}

.stat-card.total {
  border-left-color: #a78bfa;
}

.stat-card.up {
  border-left-color: #4ade80;
}

.stat-card.down {
  border-left-color: #fb7185;
}

.stat-card.maintenance {
  border-left-color: #fbbf24;
}

.stat-card.drain {
  border-left-color: #60a5fa;
}

.stat-card.no-check {
  border-left-color: #94a3b8;
}

/* ==========================================
   TABLEAU DES SERVEURS
========================================== */

.servers-section {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 18px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 24px;
}

.section-header h2 {
  color: #f8fafc;
  font-size: 20px;
  margin: 0 0 8px;
}

.section-header p {
  color: #94a3b8;
  margin: 0;
  font-size: 13px;
}

.demo-badge {
  padding: 8px 12px;
  border-radius: 20px;
  color: #c4b5fd;
  background: #312e81;
  font-size: 12px;
  font-weight: 600;
}

/* ==========================================
   RECHERCHE ET FILTRE PAR STATUT
========================================== */

.filters-container {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px 24px;
}

.search-input,
.status-filter {
  padding: 12px 16px;
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.search-input::placeholder {
  color: #64748b;
}

.status-filter {
  min-width: 190px;
  cursor: pointer;
}

.search-input:focus,
.status-filter:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.search-count {
  color: #94a3b8;
  font-size: 13px;
  white-space: nowrap;
  margin-left: auto;
}

.reset-button {
  padding: 12px 16px;
  background: transparent;
  color: #c4b5fd;
  border: 1px solid #6366f1;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.reset-button:hover {
  background: rgba(99, 102, 241, 0.15);
}

.reset-button:focus-visible {
  outline: 2px solid #a78bfa;
  outline-offset: 2px;
}

/* ==========================================
   TABLEAU
========================================== */

.table-wrapper {
  overflow-x: auto;
}

.servers-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.servers-table th,
.servers-table td {
  padding: 17px 18px;
  border-top: 1px solid #334155;
}

.servers-table th {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
}

.servers-table td {
  color: #cbd5e1;
  font-size: 14px;
}

.server-name {
  font-weight: 700;
  color: #f8fafc !important;
}

.server-address {
  font-family: monospace;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

/* ==========================================
   COULEURS DES STATUTS
========================================== */

.status-up {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.12);
}

.status-down {
  color: #fb7185;
  background: rgba(251, 113, 133, 0.12);
}

.status-maint {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
}

.status-drain {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.12);
}

.status-no-check {
  color: #cbd5e1;
  background: rgba(148, 163, 184, 0.15);
}

/* ==========================================
   BOUTONS DE SIMULATION
========================================== */

.simulation-button {
  padding: 9px 12px;
  background: rgba(251, 113, 133, 0.12);
  color: #fda4af;
  border: 1px solid rgba(251, 113, 133, 0.35);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease;
}

.simulation-button:hover:not(:disabled) {
  background: rgba(251, 113, 133, 0.25);
}

.restore-button {
  background: rgba(74, 222, 128, 0.12);
  color: #86efac;
  border-color: rgba(74, 222, 128, 0.35);
}

.simulation-button.restore-button:hover:not(:disabled) {
  background: rgba(74, 222, 128, 0.25);
}

.simulation-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-unavailable {
  color: #64748b;
}

/* ==========================================
   MESSAGES ET ERREURS
========================================== */

.simulation-error {
  margin-bottom: 16px;
  padding: 14px 18px;
  background: rgba(251, 113, 133, 0.1);
  border: 1px solid rgba(251, 113, 133, 0.25);
  border-radius: 10px;
  color: #fda4af;
  font-size: 14px;
}

.message-card {
  background: #1e293b;
  padding: 36px;
  border: 1px solid #334155;
  border-radius: 16px;
  text-align: center;
  color: #c4b5fd;
}

.error-card {
  color: #fb7185;
}

.error-card .refresh-button {
  margin-top: 16px;
}

.empty-state {
  text-align: center;
  color: #94a3b8;
}

/* ==========================================
   RESPONSIVE
========================================== */

@media (max-width: 768px) {
  .monitoring-page {
    padding: 28px 16px;
  }

  .monitoring-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .stat-card {
    padding: 18px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters-container {
    flex-wrap: wrap;
  }

  .search-input {
    flex-basis: 100%;
  }

  .servers-table {
    min-width: 800px;
  }
}

@media (max-width: 600px) {
  .filters-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input,
  .status-filter {
    width: 100%;
  }

  .search-count {
    margin-left: 0;
  }
}

@media (max-width: 420px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
