import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Auth {
    static async register(email: string, password: string, role: string): Promise<any | false> {
        try {
            const [existingUser]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return false; // User already exists
            }

            const [result]: any = await pool.query(
                'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
                [email, password, role]
            );

            if (result.affectedRows === 1) {
                return { id: result.insertId, email, role };
            }
            return false;
        } catch (error) {
            console.error('Registration Error:', error);
            return false;
        }
    }

    static async login(email: string, password: string): Promise<any | false> {
        try {
            const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            const user = rows.length > 0 ? rows[0] : null;

            if (user && await Auth.verifyPassword(password, user.password)) {
                return user;
            }
            return false;
        } catch (error) {
            console.error('Login Error:', error);
            return false;
        }
    }

    static async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(inputPassword, hashedPassword);
    }

    static async create(title: string, content: string) {
        const [result] = await pool.query('CALL CreateArticle(?, ?)', [title, content]);
        return result;
    }

    static async update(id: number, title: string, content: string) {
        const [result] = await pool.query('CALL UpdateArticle(?, ?, ?)', [id, title, content]);
        return result;
    }

    static async delete(id: number) {
        const [result] = await pool.query('CALL DeleteArticle(?)', [id]);
        return result;
    }
}

export default pool;
