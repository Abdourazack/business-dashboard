<script setup lang="ts">
import { RouterLink } from "vue-router";

const modules = [
  {
    title: "Product Dashboard",
    description: "Recherche et consultation de produits par EAN/ISBN.",
    icon: "📦",
    status: "Disponible",
    path: "/products",
  },

  {
    title: "Monitoring Dashboard",
    description: "Supervision des serveurs et de leur disponibilité.",
    icon: "📊",
    status: "En développement",
    path: "/monitoring",
  },

  {
    title: "Customer Database",
    description: "Recherche et consultation des informations clients.",
    icon: "👥",
    status: "À venir",
    path: "",
  },
];
</script>

<template>
  <main class="dashboard-home">
    <!-- EN-TÊTE -->
    <header class="welcome">
      <span class="eyebrow"> BUSINESS DASHBOARD SUITE </span>

      <h1>Tableau de bord</h1>

      <p>
        Une application métier regroupant la gestion des produits, le monitoring
        et les données clients.
      </p>
    </header>

    <!-- MODULES -->
    <section class="modules">
      <article
        v-for="module in modules"
        :key="module.title"
        class="module-card"
      >
        <div class="module-icon">
          {{ module.icon }}
        </div>

        <h2>{{ module.title }}</h2>

        <p>{{ module.description }}</p>

        <div class="module-actions">
          <span class="status">
            {{ module.status }}
          </span>

          <RouterLink v-if="module.path" :to="module.path" class="module-link">
            Ouvrir le module →
          </RouterLink>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
/* PAGE PRINCIPALE */
.dashboard-home {
  min-height: 100vh;
  padding: 60px 32px;
  background: #0f172a;
  color: #f8fafc;
}

/* EN-TÊTE */
.welcome {
  max-width: 800px;
  margin: 0 auto 48px;
  text-align: center;
}

.eyebrow {
  color: #a78bfa;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1 {
  font-size: clamp(30px, 5vw, 46px);
  margin: 16px 0;
  color: #f8fafc;
}

.welcome p {
  color: #94a3b8;
  line-height: 1.7;
}

/* GRILLE DES MODULES */
.modules {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* CARTES */
.module-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.module-card:hover {
  border-color: #8b5cf6;
  transform: translateY(-3px);
}

/* ICÔNE */
.module-icon {
  font-size: 36px;
  margin-bottom: 24px;
}

/* TITRES */
.module-card h2 {
  font-size: 20px;
  margin-bottom: 12px;
  color: #f8fafc;
}

/* DESCRIPTIONS */
.module-card p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
  min-height: 72px;
}

/* ACTIONS */
.module-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: auto;
  padding-top: 18px;
}

/* STATUT */
.status {
  display: inline-block;
  padding: 7px 12px;
  background: #312e81;
  color: #c4b5fd;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* BOUTON D'ACCÈS */
.module-link {
  display: inline-block;
  padding: 11px 18px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.module-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.25);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard-home {
    padding: 36px 16px;
  }

  .modules {
    grid-template-columns: 1fr;
  }

  .module-card p {
    min-height: auto;
  }
}
</style>
