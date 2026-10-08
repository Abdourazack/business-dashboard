import { Router } from "express";
import { getProductByEan, getProducts } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:ean", getProductByEan);

export default router;