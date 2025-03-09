import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Invoice {
    static async getAll(user_id: string, limit: number, offset: number, sortColumn: string = "i.created_at", sortOrder: string = "DESC") {
        const [rows] = await pool.query('CALL InvoiceReadAll(?,?,?,?,?)', [user_id, limit, offset, sortColumn, sortOrder]);
        return rows;
    }

    static async getById(user_id: string, id: string) {
        const [rows] = await pool.query('CALL InvoiceReadById(?, ?)', [user_id, id]);
        return rows || null;
    }

    static async create(invoice_id: string, user_id: string, created_at: string, due_date: string, contact_1: string, contact_2: string, additional_tax: number, additional_tax_rate: number, deduction_as_percent: number, deduction_percent: number, deduction_value: number,  delivery: number,  delivery_rate: number) {
        const [result] = await pool.query('CALL InvoiceCreate(?,?,?,?,?,?,?,?,?,?,?,?,?)', [ invoice_id, user_id, created_at, due_date, contact_1, contact_2, additional_tax, additional_tax_rate, deduction_as_percent, deduction_percent, deduction_value,  delivery,  delivery_rate]);
        return result;
    }

    static async update(article_id: string, user_id: string, name: string, description: string, taxed: number, tax_rate: number, discounted: number, discount_percent: number, discount_value: number, unit_price: number) {
        const [result] = await pool.query('CALL InvoiceUpdate(?,?,?,?,?,?,?,?,?,?)', [user_id, article_id, name, description, taxed, tax_rate, discounted, discount_percent, discount_value, unit_price]);
        return result;
    }

    static async delete(invoice_id: string, user_id: string) {
        const [result] = await pool.query('CALL InvoiceDelete(?,?)', [invoice_id, user_id]);
        return result;
    }
}

export default pool;
