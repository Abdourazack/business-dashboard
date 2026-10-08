<script setup lang="ts">
import { ref } from "vue"
import { Search, PackageSearch } from "lucide-vue-next"

import { searchProductByEan } from "../api/products"
import type { Product } from "../types/product"

const ean = ref("")
const loading = ref(false)
const error = ref("")
const product = ref<Product | null>(null)

function getStatusClass(status: string) {
  return {
    available: status === "AVAILABLE",
    low: status === "LOW_STOCK",
    out: status === "OUT_OF_STOCK",
  }
}

async function handleSearch() {
  if (ean.value.length !== 13) {
    error.value = "EAN invalide : entre exactement 13 chiffres."
    product.value = null
    return
  }

  loading.value = true
  error.value = ""

  try {
    product.value = await searchProductByEan(ean.value)
  } catch {
    error.value = "Produit introuvable."
    product.value = null
  } finally {
    loading.value = false
  }
}

function searchExample(value: string) {
  ean.value = value
  handleSearch()
}
</script>

<template>
  
  <main class="home-page">
    <section class="hero">
      <span class="eyebrow">Démo portfolio</span>

      <h1>Product Dashboard Demo</h1>

      <p>
        Interface de recherche produit par EAN/ISBN avec affichage de données
        détaillées, inspirée d’un outil métier.
      </p>

      <div class="search-bar">
        <input
          v-model="ean"
          type="text"
          placeholder="Enter EAN / ISBN"
          maxlength="13"
          @keyup.enter="handleSearch"
        />

        <button @click="handleSearch">
          <Search :size="18" />
          Search
        </button>
      </div>
    </section>

    <section v-if="!product && !loading && !error" class="empty-state">
      <div class="empty-icon">
        <PackageSearch :size="34" />
      </div>

      <h2>Rechercher un produit</h2>

      <p>
        Entre un EAN de test pour afficher le résumé produit, le stock, le prix,
        la disponibilité et les métadonnées.
      </p>

      <div class="examples">
        <button @click="searchExample('9782070368228')">9782070368228</button>
        <button @click="searchExample('9782266320481')">9782266320481</button>
        <button @click="searchExample('9782070413119')">9782070413119</button>
        <button @click="searchExample('9782253004226')">9782253004226</button>
      </div>
    </section>

    <div v-if="loading" class="state">Chargement...</div>

    <div v-if="error" class="state error">
      {{ error }}
    </div>

    <section v-if="product" class="product-card">
      <div class="product-header">
        <div>
          <span class="small-label">Product overview</span>
          <h2>{{ product.title }}</h2>
          <p>{{ product.author }} · {{ product.publisher }}</p>
        </div>

        <span class="status-badge" :class="getStatusClass(product.status)">
          {{ product.status }}
        </span>
      </div>

      <div class="grid">
        <div>
          <strong>EAN</strong>
          <span>{{ product.ean }}</span>
        </div>

        <div>
          <strong>Product ID</strong>
          <span>{{ product.productId }}</span>
        </div>

        <div>
          <strong>Price</strong>
          <span>{{ product.price }} {{ product.currency }}</span>
        </div>

        <div>
          <strong>Stock</strong>
          <span>{{ product.stock }}</span>
        </div>

        <div>
          <strong>Last modified</strong>
          <span>{{ product.lastModified }}</span>
        </div>
      </div>
    </section>

    <section v-if="product" class="dashboard-sections">
      <div class="dashboard-table">
        <div class="table-header">
          <h3>Product Details</h3>
        </div>

        <table>
          <tbody>
            <tr v-for="(value, key) in product.productDetails" :key="key">
              <td class="key-cell">{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="dashboard-table">
        <div class="table-header">
          <h3>Pricing</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Price Type</th>
              <th>Price</th>
              <th>Currency</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="price in product.pricing" :key="String(price.PRICETYPE)">
              <td>{{ price.PRICETYPE }}</td>
              <td>{{ price.PRICETTC }}</td>
              <td>{{ price.CURRENCYCODE }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="dashboard-table">
        <div class="table-header">
          <h3>Classification</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Thema</th>
              <th>BISAC</th>
              <th>CLIL</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in product.classification" :key="String(item.THEMA)">
              <td>{{ item.THEMA }}</td>
              <td>{{ item.BISAC }}</td>
              <td>{{ item.CLIL }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="dashboard-table">
        <div class="table-header">
          <h3>Availability</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="availability in product.availability"
              :key="String(availability.WAREHOUSE)"
            >
              <td>{{ availability.WAREHOUSE }}</td>
              <td>{{ availability.STOCK }}</td>
              <td>
                <span
                  class="mini-status"
                  :class="getStatusClass(String(availability.STATUS))"
                >
                  {{ availability.STATUS }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="dashboard-table">
        <div class="table-header">
          <h3>Metadata</h3>
        </div>

        <table>
          <tbody>
            <tr v-for="(value, key) in product.metadata" :key="key">
              <td class="key-cell">{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<style scoped>

.home-page {
  min-height: 100vh;
  padding: 56px 24px 90px;
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.22), transparent 32%),
    radial-gradient(circle at top right, rgba(139, 92, 246, 0.16), transparent 28%),
    #0f172a;
  color: #f8fafc;
}

.hero {
  max-width: 880px;
  margin: 0 auto 36px;
  text-align: center;
}

.eyebrow,
.small-label {
  color: #818cf8;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.hero h1 {
  color: #f8fafc;
  font-size: clamp(42px, 5vw, 58px);
  line-height: 0.95;
  margin: 12px 0 18px;
  letter-spacing: -0.06em;
}

.hero p {
  color: #94a3b8;
  font-size: 16px;
  margin: 0 auto 34px;
  max-width: 760px;
  line-height: 1.6;
}

.search-bar {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  gap: 14px;
}

.search-bar input {
  flex: 1;
  height: 58px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.75);
  color: #f8fafc;
  border-radius: 18px;
  padding: 0 18px;
  font-size: 16px;
  outline: none;
  cursor: text;
  user-select: text;
}

.search-bar input:focus {
  border-color: #6366f1;
}

.search-bar button,
.examples button,
.grid div,
.product-card,
.dashboard-table,
table,
tr,
td,
th {
  cursor: pointer;
  user-select: none;
}

.search-bar button {
  height: 58px;
  padding: 0 26px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 9px;
  box-shadow: 0 18px 40px rgba(99, 102, 241, 0.28);
}

.empty-state {
  max-width: 720px;
  margin: 90px auto 0;
  padding: 42px;
  text-align: center;
  border-radius: 30px;
  background: rgba(17, 24, 39, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.22);
}

.empty-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 22px;
  display: grid;
  place-items: center;
  color: #a78bfa;
  background: rgba(99, 102, 241, 0.14);
  border: 1px solid rgba(99, 102, 241, 0.35);
}

.empty-state h2 {
  margin: 0 0 10px;
  font-size: 28px;
  color: #f8fafc;
}

.empty-state p {
  margin: 0 auto 24px;
  max-width: 520px;
  color: #94a3b8;
  line-height: 1.7;
}

.examples {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.examples button {
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.8);
  color: #e2e8f0;
  padding: 12px 16px;
  border-radius: 999px;
  font-weight: 700;
}

.state {
  margin-top: 40px;
  text-align: center;
  color: #cbd5e1;
}

.error {
  color: #f87171;
}

.product-card,
.dashboard-table {
  max-width: 980px;
  margin: 36px auto 0;
  background: rgba(17, 24, 39, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 28px;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
}

.product-card {
  padding: 34px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 26px;
}

.product-card h2 {
  color: #f8fafc;
  font-size: 34px;
  margin: 8px 0 8px;
  letter-spacing: -0.04em;
}

.product-card p {
  color: #94a3b8;
  margin: 0;
}

.status-badge,
.mini-status {
  border-radius: 999px;
  font-weight: 900;
}

.status-badge {
  padding: 10px 14px;
  font-size: 13px;
}

.mini-status {
  display: inline-flex;
  padding: 6px 10px;
  font-size: 12px;
}

.status-badge.available,
.mini-status.available {
  background: rgba(34, 197, 94, 0.14);
  color: #86efac;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.status-badge.low,
.mini-status.low {
  background: rgba(245, 158, 11, 0.14);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.28);
}

.status-badge.out,
.mini-status.out {
  background: rgba(239, 68, 68, 0.14);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.28);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.grid div {
  min-width: fit-content;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 999px;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.grid div:hover {
  border-color: rgba(129, 140, 248, 0.45);
  background: rgba(99, 102, 241, 0.12);
}

.grid strong {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
}

.grid strong::after {
  content: ":";
}

.grid span {
  color: #f8fafc;
  font-size: 13px;
  font-weight: 800;
}

.dashboard-sections {
  margin-top: 22px;
}

.dashboard-table {
  overflow: hidden;
}

.table-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.table-header h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 20px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: rgba(15, 23, 42, 0.75);
  color: #94a3b8;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

th,
td {
  padding: 16px 22px;
  text-align: left;
}

td {
  color: #f8fafc;
  border-top: 1px solid rgba(148, 163, 184, 0.08);
}

.key-cell {
  width: 280px;
  color: #94a3b8;
  font-weight: 700;
}

tr {
  transition: background 0.2s ease;
}

tr:hover td {
  background: rgba(99, 102, 241, 0.08);
}

@media (max-width: 850px) {
  .search-bar,
  .product-header {
    flex-direction: column;
  }

  .grid {
    flex-direction: column;
  }

  .product-card,
  .dashboard-table {
    max-width: 100%;
  }

  th,
  td {
    padding: 14px;
  }
}
</style>