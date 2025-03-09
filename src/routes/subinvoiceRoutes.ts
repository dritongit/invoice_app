import express from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { SubinvoiceController } from '../controllers/subinvoice.controller';

const router = express.Router();
const subinvoiceController = new SubinvoiceController();

router.get('/:id', authenticateJWT, subinvoiceController.getAllSubinvoices);
router.post('/', authenticateJWT, subinvoiceController.createSubinvoice);
router.put('/:id', authenticateJWT, subinvoiceController.updateSubinvoice);
router.delete('/:id', authenticateJWT, subinvoiceController.deleteSubnvoice);

export default router;
