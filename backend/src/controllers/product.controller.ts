import { Request, Response } from "express";
import { findProductByEan, getAllProducts } from "../services/product.service";

export function getProducts(_req: Request, res: Response) {
  res.json({
    count: getAllProducts().length,
    data: getAllProducts(),
  });
}

export function getProductByEan(req: Request, res: Response) {
  const ean = String(req.params.ean);

  if (!/^\d{13}$/.test(ean)) {
    return res.status(400).json({
      message: "EAN must contain exactly 13 digits",
    });
  }

  const product = findProductByEan(ean);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.json(product);
}