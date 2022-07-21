import express from "express";
import { getAdopt, getAdoptById, saveAdopt, updateAdopt, deleteAdopt } from "../controllers/AdoptController.js";

const router = express.Router();

router.get('/adopt', getAdopt);
router.get('/adopt/:id', getAdoptById);
router.post('/adopt/', saveAdopt);
router.patch('/adopt/:id', updateAdopt);
router.delete('/adopt/:id', deleteAdopt);

export default router;