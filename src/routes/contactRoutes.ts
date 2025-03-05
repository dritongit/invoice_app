import express from 'express';
import { ContactController } from '../controllers/contact.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

const contactController = new ContactController();

router.get('/', authenticateJWT, contactController.getAllContacts);
router.get('/:id', authenticateJWT, contactController.getArticleById);
router.post('/', authenticateJWT, contactController.createArticle);
router.put('/:id', authenticateJWT, contactController.updateArticle);
router.delete('/:id', authenticateJWT, contactController.deleteArticle);

export default router;