import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Subinvoice {
    static async getAll(invoice_id: string) {
        const [rows] = await pool.query('CALL SubinvoiceReadAll(?)', [invoice_id]);
    }

    static async getById(user_id: string, id: string) {
        const [rows] = await pool.query('CALL InvoiceReadById(?, ?)', [user_id, id]);
        return rows || null;
    }

    static async create(subinvoice_id: string, invoice_id: string, 
                        product: string, description: string, taxed: number, 
                        tax_rate: number, discount: number, 
                        discount_percent: number, discount_amount: number, 
                        qty: number,  unit_price: number) {

                                                   
        const [result] = await pool.query('CALL SubinvoiceCreate(?,?,?,?,?,?,?,?,?,?,?)', [subinvoice_id, invoice_id, 
                                                                                        product, description, taxed, 
                                                                                        tax_rate, discount, 
                                                                                        discount_percent, discount_amount, 
                                                                                        qty, unit_price]);
        return result;
    }

    static async update(subinvoice_id: string, invoice_id: string,
        product: string, description: string, taxed: number, 
        tax_rate: number, discount: number, 
        discount_percent: number, discount_amount: number, 
        qty: number,  unit_price: number) {
        const [result] = await pool.query('CALL SubinvoiceUpdate(?,?,?,?,?,?,?,?,?,?,?)', [subinvoice_id, invoice_id,
                                                                                    product, description, taxed, 
                                                                                    tax_rate, discount, 
                                                                                    discount_percent, discount_amount, 
                                                                                    qty, unit_price]);
        return result;
    }

    static async delete(invoice_id: string, user_id: string) {
        const [result] = await pool.query('CALL SubinvoiceDelete(?,?)', [invoice_id, user_id]);
        return result;
    }
}

export default pool;
