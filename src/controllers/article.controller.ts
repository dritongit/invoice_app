import { Request, Response } from 'express';
import { Article } from '../models/article.model';

// Use the custom UserRequest type
interface UserRequest extends Request {
    user?: { user_id: string; email: string; role: string };
}
    export class ArticleController {
        async getAllArticles(req: UserRequest , res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const user_id = req.user.user_id
                const articles = await Article.getAll(user_id);
                res.json(articles);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching articles' });
            }
        }
    
        async getArticleById(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Article.getById(req.user.user_id, req.params.id);
                if (!article) {
                    res.status(404).json({ message: 'Article not found' });
                    return;
                }
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching article' + error });
            }
        }
    
        async createArticle(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Article.create(req.body.article_id, req.user.user_id, req.body.name, req.body.description, req.body.taxed, req.body.tax_rate, req.body.discounted, req.body.discount_percent, req.body.discount_value, req.body.unit_price);
                res.status(201).json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article' });
            }
        }
    
        async updateArticle(req: UserRequest, res: Response): Promise<void> {
            try {
                if (!req.user) {
                    res.status(403).json({ message: 'Unauthorized' });
                    return;
                }
                const article = await Article.update(req.params.id, req.user.user_id, req.body.name, req.body.description, req.body.taxed, req.body.tax_rate, req.body.discounted, req.body.discount_percent, req.body.discount_value, req.body.unit_price);
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error updating article' });
            }
        }
    
        async deleteArticle(req: UserRequest, res: Response): Promise<void> {
            if (!req.user) {
                res.status(403).json({ message: 'Unauthorized' });
                return;
            }
            try {
                const article = await Article.delete(req.params.id, req.user.user_id);
                res.json({ message: 'Article deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting article' });
            }
        }
    }