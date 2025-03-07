import { Request, Response } from 'express';
import { Contact } from '../models/contact.model';

interface UserRequest extends Request {
    user?: { user_id: string; email: string; role: string };
}
    export class ContactController {
        async getAllContacts(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const {user_id} = req.user
                const articles = await Contact.getAll(user_id);
                res.json(articles);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching contacts'+error });
            }
        }

        async getContactById(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const contact = await Contact.getById(req.user.user_id, req.params.id);
                if (!contact) {
                    res.status(404).json({ message: 'Contact not found' });
                    return;
                }
                res.json(contact);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching contact' + error });
            }
        }

        async createContact(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const contact = await Contact.create(req.body.contact_id, req.user.user_id, req.body.name, req.body.alternative, req.body.address1, req.body.address2, req.body.address3, req.body.town, req.body.region, req.body.email1, req.body.email2, req.body.postcode);
                res.status(201).json(contact);
            } catch (error) {
                res.status(500).json({ message: 'Error creating contact' });
            }
        }

        async updateContact(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const contact = await Contact.update( req.params.id, req.user.user_id, req.body.name, req.body.alternative, req.body.address1, req.body.address2, req.body.address3, req.body.town, req.body.region, req.body.email1, req.body.email2, req.body.postcode);
                res.status(201).json({ message: 'Contact updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating contact' });
            }
        }
    
        async deleteContact(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const contact = await Contact.delete(req.params.id, req.user?.user_id);
                res.json({ message: 'Contact deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting contact' });
            }
        }
    }