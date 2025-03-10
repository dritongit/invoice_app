import express from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { InvoiceController } from '../controllers/invoice.controller';

const router = express.Router();
const invoiceController = new InvoiceController();

router.get('/', authenticateJWT, invoiceController.getAllInvoices);
router.get('/:id', authenticateJWT, invoiceController.getInvoiceById);
router.post('/', authenticateJWT, invoiceController.createInvoice);
router.put('/:id', authenticateJWT, invoiceController.updateInvoice);
router.delete('/:id', authenticateJWT, invoiceController.deleteInvoice);

export default router;
