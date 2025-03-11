import { Request, Response } from 'express';
import { Invoice } from '../models/invoice.model';

import { Contact } from '../models/contact.model';
import { Subinvoice } from '../models/subinvoice.model';
import { Payment } from '../models/payment.model';

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
    
        async getInvoiceById(req: UserRequest , res: Response): Promise<void> {
            try {
                // Ensure req.user exists before accessing req.user.user_id
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
        
                const article: any = await Invoice.getById(req.user.user_id, req.params.id);
        
                // Check if article exists and is not empty
                if (!article || !Array.isArray(article) || article.length === 0 || !article[0] || article[0].length === 0) {
                    res.status(404).json({ message: "Invoice not found" });
                }
        
                const invoice = article[0][0];
        
                // Fetch contact only if invoice has a `contact_1`
                const client: any = invoice.contact_1
                    ? await Contact.getById(req.user.user_id, invoice.contact_1)
                    : null;
        
                // Attach contact as a sub-object in invoice
                invoice.client = client ? client : null;

                // Fetch contact only if invoice has a `contact_1`
                const deivery: any = invoice.contact_2
                    ? await Contact.getById(req.user.user_id, invoice.contact_2)
                    : null;
        
                // Attach contact as a sub-object in invoice
                invoice.delivery = deivery ? deivery : null;

                const subinvoices: any = await Subinvoice.getAll(invoice.invoice_id)
                invoice.subinvoices = subinvoices ? subinvoices[0] : null;

                const payments: any = await Payment.getAll(invoice.invoice_id)
                invoice.payments = payments ? payments[0] : null;
        
                res.json(invoice);
            } catch (error) {
                console.error("Error fetching invoice:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        };
        
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