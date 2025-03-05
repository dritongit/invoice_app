import pool from '../config/db';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export class Article {
    static async getAll() {
        const id = 1;
        const [rows] = await pool.query('CALL GetArticles(1)', [id]);
        return rows;
    }

    static async getById(id: number) {
        const user_id = 1;
        const [rows] = await pool.query('CALL GetArticleById(?, ?)', [user_id, id]);
        return rows || null;
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
