import express from 'express';
import { ArticleController } from '../controllers/article.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();
const articleController = new ArticleController();

router.get('/', authenticateJWT, articleController.getAllArticles);
router.get('/:id', authenticateJWT, articleController.getArticleById);
router.post('/', authenticateJWT, articleController.createArticle);
router.put('/:id', authenticateJWT, articleController.updateArticle);
router.delete('/:id', authenticateJWT, articleController.deleteArticle);

export default router;
