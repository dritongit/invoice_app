import { Request, Response } from 'express';
import { Subinvoice } from '../models/subinvoice.model';

    interface UserRequest extends Request {
        user?: { user_id: string; email: string; role: string };
    }

    export class SubinvoiceController {
         async getAllSubinvoices(req: UserRequest , res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const invoice_id = req.params.id
                const articles: any = await Subinvoice.getAll(invoice_id);
                res.json(articles[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching articles' });
            }
        }

        async createSubinvoice(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const subinvoices: any= await Subinvoice.create(req.body.subinvoice_id, req.body.invoice_id, 
                                                        req.body.product, req.body.description, req.body.taxed, 
                                                        req.body.tax_rate, req.body.discount, 
                                                        req.body.discount_percent, req.body.discount_amount, 
                                                        req.body.qty,  req.body.unit_price);
                res.status(201).json(subinvoices);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article'+error });
            }
        }

        async updateSubinvoice(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Subinvoice.update(req.params.id, req.body.invoice_id, 
                    req.body.product, req.body.description, req.body.taxed, 
                    req.body.tax_rate, req.body.discount, 
                    req.body.discount_percent, req.body.discount_amount, 
                    req.body.qty,  req.body.unit_price);
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error updating article' });
            }
        }
    
        async deleteSubnvoice(req: UserRequest, res: Response): Promise<void> {
            if (!req.user) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }
            try {
                const article = await Subinvoice.delete(req.params.id, req.user.user_id);
                res.json({ message: 'Item deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting article' });
            }
        }
    }