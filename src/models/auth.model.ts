import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

export class Auth {
    static async register(uuid: string, email: string, password: string, role: string): Promise<any | false> {
        try {
            const [existingUser]: any = await pool.query('CALL UserByEmail(?)', [email]);
            if (existingUser[0].length > 0) {
                return false; // User already exists
            }

            const [result]: any = await pool.query(
                'CALL UserCreate(?,?,?,?)',
                [uuid, email, password, role]
            );
            
            if (result.affectedRows === 1 || result.affectedRows === 2) {
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
            const [rows]: any = await pool.query('CALL UserByEmail(?)', [email]);
            const user = rows[0].length > 0 ? rows[0] : null;
            if (user[0] && await Auth.verifyPassword(password, user[0].password)) {
                return user[0];
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
