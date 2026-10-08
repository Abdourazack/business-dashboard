
import axios from "axios";

// Adresse commune du backend Express
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// Client HTTP Axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Rechercher un produit par EAN ou ISBN
export async function searchProductByEan(ean: string) {
  const response = await api.get(
    `/api/products/${encodeURIComponent(ean)}`
  );

  return response.data;
}
