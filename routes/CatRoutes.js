import express from "express";
import { getCat, getCatById, saveCat, updateCat, deleteCat } from "../controllers/CatController.js";

const router = express.Router();

router.get('/cat', getCat);
router.get('/cat/:id', getCatById);
router.post('/cat/', saveCat);
router.patch('/cat/:id', updateCat);
router.delete('/cat/:id', deleteCat);

export default router;