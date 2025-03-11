import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Settings {

    static async getById(user_id: string) {
        const [rows] = await pool.query('CALL SettingsReadBy(?)', [user_id]);
        return rows || null;
    }

    static async update(settings_id: string,   
                        settings_user_parent_id: string,   
                        settings_business_name: string, 
                        settings_address_1: string,   
                        settings_address_2: string,   
                        settings_address_3: string, 
                        settings_town: string,   
                        settings_region: string,   
                        settings_postcode: string, 
                        settings_telephone: string,   
                        settings_fax: string,   
                        settings_email: string, 
                        settings_website: string,   
                        settings_tax_number: string,   
                        settings_business_number: string, 
                        settings_tax_name: string,   
                        settings_tax_rate: number,    
                        settings_overdue_days: number, 
                        settings_currency_symbol: number,
                        settings_reply_slip_text: string,    
                        settings_invoice_message: string) {
        const [result] = await pool.query('CALL SettingsUpdate(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                [
                        settings_id,
                        settings_user_parent_id,   
                        settings_business_name, 
                        settings_address_1,   
                        settings_address_2,   
                        settings_address_3, 
                        settings_town,   
                        settings_region,   
                        settings_postcode, 
                        settings_telephone,   
                        settings_fax,   
                        settings_email, 
                        settings_website,   
                        settings_tax_number,   
                        settings_business_number, 
                        settings_tax_name,   
                        settings_tax_rate,    
                        settings_overdue_days, 
                        settings_currency_symbol,
                        settings_reply_slip_text,    
                        settings_invoice_message
                ]);
        return result;
    }
}

export default pool;
