import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'your_secret_key'; // ✅ Properly typed
const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION || '1h'; // ✅ Ensure correct type

// Define JWT Payload Type
interface JwtPayload {
    user_id: number;
    email: string;
}

// Generate a JWT Token
export const generateToken = (user_id: number, email: string): string => {
    return jwt.sign({user_id, email} as JwtPayload, JWT_SECRET)
};

// Verify JWT Token
export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        return null; // Return null if verification fails
    }
};
