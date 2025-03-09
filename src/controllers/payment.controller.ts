import { Request, Response } from 'express';
import { Payment } from '../models/payment.model';

    interface UserRequest extends Request {
        user?: { user_id: string; email: string; role: string };
    }

    export class PaymentController {
         async getAllPayments(req: UserRequest , res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const payment_id = req.params.id
                const payments: any = await Payment.getAll(payment_id);
                res.json(payments[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching Payments' + error });
            }
        }

        async createPayment(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const payments: any= await Payment.create(req.body.payment_id, req.body.invoice_id, 
                                                             req.body.amount, req.body.method, 
                                                             req.body.date, req.body.details);
                res.status(201).json(payments);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article'+error });
            }
        }

        async updatePayment(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const payments: any= await Payment.update(req.params.payment_id, req.body.invoice_id, 
                                                             req.body.amount, req.body.method, 
                                                             req.body.date, req.body.details);
                res.status(201).json(payments);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article'+error });
            }
        }
    
        async deletePayment(req: UserRequest, res: Response): Promise<void> {
            if (!req.user) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }
            try {
                const article = await Payment.delete(req.params.id, req.user.user_id);
                res.json({ message: 'Payment deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting payment' });
            }
        }
    }