import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Payment {
    static async getAll(invoice_id: string) {
        const [rows] = await pool.query('CALL PaymentReadAll(?)', [invoice_id]);
        return rows;
    }

    static async create(payment_id: string, invoice_id: string, amount: number, method: number,  date: string, details: string) {                                                   
        const [result] = await pool.query('CALL PaymentCreate(?,?,?,?,?,?)', [payment_id, invoice_id, amount, method, date, details]);
        return result;
    }

    static async update(payment_id: string, invoice_id: string, amount: number, method: number,  date: string, details: string) {
        const [result] = await pool.query('CALL PaymentUpdate(?,?,?,?,?,?)', [payment_id, invoice_id, amount, method, date, details]);
        return result;
    }

    static async delete(payment_id: string, user_id: string) {
        const [result] = await pool.query('CALL PaymentDelete(?,?)', [payment_id, user_id]);
        return result;
    }
}

export default pool;
