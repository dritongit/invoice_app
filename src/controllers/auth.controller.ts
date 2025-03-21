import { Request, Response } from 'express';
import { Auth } from '../models/auth.model';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../config/jwt';
import bcrypt from 'bcryptjs';

export class AuthController {
    // ✅ Register user
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { uuid, email, password, role } = req.body;

            // Hash password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = await Auth.register(uuid, email, hashedPassword, role);
            if (!newUser) {
                res.status(400).json({ error: 'User registration failed' });
                return;
            }

            // Generate tokens
            const accessToken = generateAccessToken(newUser.id, newUser.email, newUser.role);
            const refreshToken = generateRefreshToken(newUser.id, newUser.email, newUser.role);

            // Store refresh token in the database
            await Auth.storeRefreshToken(newUser.id, refreshToken);

            res.status(201).json({ 
                message: 'User registered successfully', 
                accessToken, 
                refreshToken, 
                role: newUser.role 
            });

        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // ✅ Login user
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await Auth.login(email, password);

            if (!user) {
                res.status(401).json({ error: 'Email ose fjalëkalim i pasaktë!' });
                return;
            }

            // Generate tokens
            const accessToken = generateAccessToken(user.user_id, user.email, user.role);
            const refreshToken = generateRefreshToken(user.user_id, user.email, user.role);

            // Store refresh token in the database
            await Auth.storeRefreshToken(user.user_id, refreshToken);

            res.json({ 
                accessToken, 
                refreshToken, 
                role: user.role 
            });

        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;
    
            if (!refreshToken) {
                res.status(400).json({ error: 'Refresh token required' });
                return;
            }
    
            const decoded = verifyRefreshToken(refreshToken);
            if (!decoded) {
                res.status(403).json({ error: 'Invalid refresh token' });
                return;
            }
    
            // ✅ Kontrollo nëse refreshToken ekziston në DB
            const isTokenValid = await Auth.verifyRefreshToken(String(decoded.user_id), refreshToken);
            if (!isTokenValid) {
                res.status(403).json({ error: 'Invalid refresh token' });
                return;
            }
    
            // ✅ Gjenero një `accessToken` të ri
            const accessToken = generateAccessToken(decoded.user_id, decoded.email, decoded.role);
    
            res.json({ accessToken });
    
        } catch (error) {
            console.error('Refresh Token Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

    // Logout user (Delete refresh token)
    async logout(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(400).json({ error: 'Refresh token required' });
                return;
            }

            // Delete refresh token from database
            await Auth.deleteRefreshToken(refreshToken);

            res.json({ message: 'Logged out successfully' });

        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
