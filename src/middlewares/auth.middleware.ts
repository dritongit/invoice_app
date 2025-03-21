import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyAccessToken } from '../config/jwt';

// Extend Request type to include user
interface UserRequest extends Request {
    user?: { user_id: number; email: string; role: string };
}

export const authenticateJWT: RequestHandler = (req: UserRequest, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ message: 'Access Denied' });
        return; // ✅ Ensures function stops execution
    }

    const decoded = verifyAccessToken(token.replace('Bearer ', ''));
    if (!decoded) {
        res.status(403).json({ message: 'Invalid Token' });
        return; // ✅ Ensures function stops execution
    }

    (req as any).user = decoded as { user_id: number; email: string; role: string };
    next(); // ✅ Calls `next()` only when authorized
};
