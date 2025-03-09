import express from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

router.get('/:id', authenticateJWT, paymentController.getAllPayments);
router.post('/', authenticateJWT, paymentController.createPayment);
router.put('/:id', authenticateJWT, paymentController.updatePayment);
router.delete('/:id', authenticateJWT, paymentController.deletePayment);

export default router;
