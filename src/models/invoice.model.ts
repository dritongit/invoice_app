import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Invoice {
    static async getAll(user_id: string, limit: number, offset: number) {
        const [rows] = await pool.query('CALL InvoiceReadAll(?,?,?)', [user_id, limit, offset]);
        return rows;
    }

    static async getById(user_id: string, id: string) {
        const [rows] = await pool.query('CALL InvoiceReadById(?, ?)', [user_id, id]);
        return rows || null;
    }

    static async create(article_id: string, user_id: string, name: string, description: string, taxed: number, tax_rate: number, discounted: number, discount_percent: number, discount_value: number, unit_price: number) {
        const [result] = await pool.query('CALL ArticleCreate(?,?,?,?,?,?,?,?,?,?)', [article_id, user_id, name, description, taxed, tax_rate, discounted, discount_percent, discount_value, unit_price]);
        return result;
    }

    static async update(article_id: string, user_id: string, name: string, description: string, taxed: number, tax_rate: number, discounted: number, discount_percent: number, discount_value: number, unit_price: number) {
        const [result] = await pool.query('CALL ArticleUpdate(?,?,?,?,?,?,?,?,?,?)', [user_id, article_id, name, description, taxed, tax_rate, discounted, discount_percent, discount_value, unit_price]);
        return result;
    }

    static async delete(id: string, user_id: string) {
        const [result] = await pool.query('CALL ArticleDelete(?,?)', [id, user_id]);
        return result;
    }
}

export default pool;
