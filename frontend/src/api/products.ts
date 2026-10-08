import axios from "axios"

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
})

export async function searchProductByEan(ean: string) {
  const response = await api.get(`/products/${ean}`)

  return response.data
}