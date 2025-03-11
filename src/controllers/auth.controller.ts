import { Request, Response } from 'express';
import { Auth } from '../models/auth.model';
import { Settings } from '../models/settings.model';
import { generateToken } from '../config/jwt';
import bcrypt from 'bcryptjs';


export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { uuid, email, password, role } = req.body;

            // Hash password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = await Auth.register(uuid, email, hashedPassword, role);
            
            if (newUser) {
                const token = generateToken(newUser.id, newUser.role);
                res.status(201).json({ message: 'User registered successfully', token, role: newUser.role });
            } else {
                res.status(400).json({ error: 'User registration failed' });
            }
        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await Auth.login(email, password);

            if (user) {
                const token = generateToken(user.user_id,user.role);
                res.json({ token, role: user.role });
            } else {
                res.status(401).json({ error: 'Email ose fjalëkalim i pasaktë!' });
            }
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
