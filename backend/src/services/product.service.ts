import { products } from "../data/products.data";

export function getAllProducts() {
  return products;
}

export function findProductByEan(ean: string) {
  return products.find((product) => product.ean === ean);
}