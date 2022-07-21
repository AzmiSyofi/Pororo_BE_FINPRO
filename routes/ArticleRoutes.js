import express from "express";
import { getArticle, getArticleById, saveArticle, updateArticle, deleteArticle } from "../controllers/ArticleController.js";

const router = express.Router();

router.get('/article', getArticle);
router.get('/article/:id', getArticleById);
router.post('/article/', saveArticle);
router.patch('/article/:id', updateArticle);
router.delete('/article/:id', deleteArticle);

export default router;