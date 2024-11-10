import { Router } from "express";
import { insertProduct, getProductDetailsForCard, getProductDetailsForCardId, getProductsByQuery } from "../controllers/tienda.js";
const router = Router();

router.post("/addSale", insertProduct);
router.get("/item/:q", getProductsByQuery);
router.get("/sales", getProductDetailsForCard);
router.get("/items/:id", getProductDetailsForCardId);
export default router;