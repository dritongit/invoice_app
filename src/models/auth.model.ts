import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

export class Auth {
    // ✅ Register User
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

    // ✅ Login User
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

    // ✅ Verify Password
    static async verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = await import('bcryptjs');
        return bcrypt.compare(inputPassword, hashedPassword);
    }

    // ✅ Store Refresh Token in DB
    static async storeRefreshToken(user_id: string, refreshToken: string): Promise<boolean> {
        try {
            await pool.query('CALL RefreshTokenUpdate(?, ?)', [user_id, refreshToken]);
            return true;
        } catch (error) {
            console.error('Error storing refresh token:', error);
            return false;
        }
    }

    // ✅ Verify Refresh Token from DB
    static async verifyRefreshToken(user_id: string, refreshToken: string): Promise<boolean> {
        try {
            const [rows]: any = await pool.query('CALL RefreshTokenVerify(?)', [user_id]);
            return rows[0].length > 0; // Returns true if token exists
        } catch (error) {
            console.error('Error verifying refresh token:', error);
            return false;
        }
    }

    // ✅ Delete Refresh Token from DB (Logout)
    static async deleteRefreshToken(refreshToken: string): Promise<boolean> {
        try {
            await pool.query('CALL RefreshTokenDelete(?)', [refreshToken]);
            return true;
        } catch (error) {
            console.error('Error deleting refresh token:', error);
            return false;
        }
    }
}

export default pool;
