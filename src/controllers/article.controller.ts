import { Request, Response } from 'express';
import { Article } from '../models/article.model';
import { CreateArticleDto, UpdateArticleDto } from '../dtos/article.dto';
    
    export class ArticleController {
        async getAllArticles(req: Request, res: Response): Promise<void> {
            try {
                const articles = await Article.getAll();
                res.json(articles);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching articles' });
            }
        }
    
        async getArticleById(req: Request, res: Response): Promise<void> {
            try {
                const article = await Article.getById(parseInt(req.params.id));
                if (!article) {
                    res.status(404).json({ message: 'Article not found' });
                    return;
                }
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching article' + error });
            }
        }
    
        async createArticle(req: Request, res: Response): Promise<void> {
            try {
                const dto = new CreateArticleDto(req.body.title, req.body.content);
                const article = await Article.create(dto.title, dto.content);
                res.status(201).json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error creating article' });
            }
        }
    
        async updateArticle(req: Request, res: Response): Promise<void> {
            try {
                const dto = new UpdateArticleDto(parseInt(req.params.id), req.body.title, req.body.content);
                const article = await Article.update(dto.id, dto.title, dto.content);
                res.json(article);
            } catch (error) {
                res.status(500).json({ message: 'Error updating article' });
            }
        }
    
        async deleteArticle(req: Request, res: Response): Promise<void> {
            try {
                const article = await Article.delete(parseInt(req.params.id));
                res.json({ message: 'Article deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting article' });
            }
        }
    }