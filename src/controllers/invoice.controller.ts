import { Request, Response } from 'express';
import { Invoice } from '../models/invoice.model';

    interface UserRequest extends Request {
        user?: { user_id: string; email: string; role: string };
    }

    export class InvoiceController {
        async getAllInvoices(req: UserRequest , res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
    
                const user_id = req.user.user_id;
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 10;
                const offset = (page - 1) * limit;
    
                const sortColumn = req.query.sortColumn as string || "i.created_at";
                const sortOrder = (req.query.sortOrder as string)?.toUpperCase() === "ASC" ? "ASC" : "DESC";

                const [invoices]: any = await Invoice.getAll(user_id, limit, offset, sortColumn, sortOrder);
                const total = invoices[0]?.total_records || 0;

                res.json({
                    currentPage: page,
                    limit: limit,
                    total,
                    data: invoices
                });
            } catch (error) {
                res.status(500).json({ message: 'Error fetching invoices' });
            }
        }
    
        async getInvoiceById(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article: any = await Invoice.getById(req.user.user_id, req.params.id);
                if (!article[0].length) {
                    res.status(404).json({ message: 'Invoice not found' });
                    return;
                }
                res.json(article[0][0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching article' + error });
            }
        }
    
        async createInvoice(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Invoice.create(req.body.invoice_id, req.user.user_id, req.body.created_at, req.body.due_date, req.body.contact_1, req.body.contact_2, req.body.additional_tax, req.body.additional_tax_rate, req.body.deduction_as_percent, req.body.deduction_percent, req.body.deduction_value,  req.body.delivery,  req.body.delivery_rate);
                res.status(201).json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article' });
            }
        }
    
        async updateInvoice(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Invoice.update(req.params.id, req.user.user_id, req.body.name, req.body.description, req.body.taxed, req.body.tax_rate, req.body.discounted, req.body.discount_percent, req.body.discount_value, req.body.unit_price);
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error updating article' });
            }
        }
    
        async deleteInvoice(req: UserRequest, res: Response): Promise<void> {
            if (!req.user) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }
            try {
                const article = await Invoice.delete(req.params.id, req.user.user_id);
                res.json({ message: 'Article deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting article' });
            }
        }
    }