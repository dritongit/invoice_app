import { Request, Response } from 'express';
import { Contact } from '../models/contact.model';
    
    export class ContactController {
        async getAllContacts(req: Request, res: Response): Promise<void> {
            try {
                const articles = await Contact.getAll();
                res.json(articles);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching articles'+error });
            }
        }
    
        async deleteArticle(req: Request, res: Response): Promise<void> {
            try {
                const article = await Contact.delete(parseInt(req.params.id));
                res.json({ message: 'Article deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting article' });
            }
        }
    }