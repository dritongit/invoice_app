import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticateJWT: RequestHandler = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ message: 'Access Denied' });
        return; // ✅ Ensures function stops execution
    }

    const decoded = verifyToken(token.replace('Bearer ', ''));
    if (!decoded) {
        res.status(403).json({ message: 'Invalid Token' });
        return; // ✅ Ensures function stops execution
    }

    (req as any).user = decoded;
    next(); // ✅ Calls `next()` only when authorized
};
