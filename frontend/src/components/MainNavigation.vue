<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="main-navigation">
    <div class="nav-brand">
      <span class="brand-icon">B</span>
      <span>Business Suite</span>
    </div>

    <div class="nav-links">
      <RouterLink to="/" class="nav-link"> Accueil </RouterLink>

      <RouterLink to="/products" class="nav-link"> Produits </RouterLink>

      <RouterLink to="/monitoring" class="nav-link"> Monitoring </RouterLink>

      <span class="nav-link disabled"> Clients </span>
    </div>
  </nav>
</template>

<style scoped>
.main-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 32px;
  background: #151e33;
  border-bottom: 1px solid #334155;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #f8fafc;
  font-size: 17px;
  font-weight: 700;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #7c5cf6;
  color: #ffffff;
  font-weight: 800;
}

.nav-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #a78bfa;
}

.nav-link.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .main-navigation {
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }

  .nav-links {
    justify-content: center;
    gap: 16px;
  }
}
</style>
