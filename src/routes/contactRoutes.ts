import express from 'express';
import { ContactController } from '../controllers/contact.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

const contactController = new ContactController();

router.get('/', authenticateJWT, contactController.getAllContacts);
router.get('/:id', authenticateJWT, contactController.getContactById);
router.post('/', authenticateJWT, contactController.createContact);
router.put('/:id', authenticateJWT, contactController.updateContact);
router.delete('/:id', authenticateJWT, contactController.deleteContact);

export default router;