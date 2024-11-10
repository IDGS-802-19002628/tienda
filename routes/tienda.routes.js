import { Router } from "express";
import { insertProduct, getProductDetailsForCard } from "../controllers/tienda.js";
const router = Router();

router.post("/product", insertProduct);
router.get("/product", getProductDetailsForCard);
export default router;