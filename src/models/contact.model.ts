import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Contact {
    static async getAll(user_id: string, searchQuery: string) {
        const [rows] = await pool.query('CALL ContactReadAll(?,?)', [user_id, searchQuery]);
        return rows;
    }

    static async getById(user_id: string, contact_id: string) {
        const [rows]:any = await pool.query('CALL ContactReadById(?, ?)', [user_id, contact_id]);
        return rows[0][0] || null;
    }

    static async create(contact_id: string, user_id: string, name: string, alternative: string, address1: string, address2: string, address3: string, town: string, region: string, email1: string, email2: string, postcode: string) {
        const [result] = await pool.query('CALL ContactCreate(?,?,?,?,?,?,?,?,?,?,?,?)', [contact_id, user_id, name, alternative, address1, address2, address3, town, region, email1, email2, postcode]);
        return result;
    }

    static async update(contact_id: string, user_id: string, name: string, alternative: string, address1: string, address2: string, address3: string, town: string, region: string, email1: string, email2: string, postcode: string) {
        const [result] = await pool.query('CALL ContactUpdate(?,?,?,?,?,?,?,?,?,?,?,?)', [contact_id, user_id, name, alternative, address1, address2, address3, town, region, email1, email2, postcode]);
        return result;
    }

    static async delete(contact_id: string, user_id: string) {
        const [result] = await pool.query('CALL ContactDelete(?,?)', [contact_id, user_id]);
        return result;
    }
}

export default pool;
