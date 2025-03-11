import { Request, Response } from 'express';
import { Settings } from '../models/settings.model';

// Use the custom UserRequest type
interface UserRequest extends Request {
    user?: { user_id: string; email: string; role: string };
}
    export class SettingsController {
    
        async getSettingsById(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const [article]: any = await Settings.getById(req.user.user_id);
                if (!article) {
                    res.status(404).json({ message: 'Settings not found' });
                    return;
                }
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching settings' + error });
            }
        }
    
        async updateSettings(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Settings.update(  req.params.id,
                                                        req.user.user_id,   
                                                        req.body.settings_business_name, 
                                                        req.body.settings_address_1,   
                                                        req.body.settings_address_2,   
                                                        req.body.settings_address_3, 
                                                        req.body.settings_town,   
                                                        req.body.settings_region,   
                                                        req.body.settings_postcode, 
                                                        req.body.settings_telephone,   
                                                        req.body.settings_fax,   
                                                        req.body.settings_email, 
                                                        req.body.settings_website,   
                                                        req.body.settings_tax_number,   
                                                        req.body.settings_business_number, 
                                                        req.body.settings_tax_name,   
                                                        req.body.settings_tax_rate,    
                                                        req.body.settings_overdue_days, 
                                                        req.body.settings_currency_symbol,
                                                        req.body.settings_reply_slip_text,    
                                                        req.body.settings_invoice_message);
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error updating settings' });
            }
        }
    }