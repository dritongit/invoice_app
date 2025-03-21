import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Sigurohemi që të kemi sekrete të definuara, përndryshe ndalet aplikacioni
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || (() => { throw new Error("Missing JWT_SECRET in .env"); })();
const REFRESH_SECRET: jwt.Secret = process.env.REFRESH_SECRET || (() => { throw new Error("Missing REFRESH_SECRET in .env"); })();

// ✅ Define JWT Payload Type
interface JwtPayload {
    user_id: number;
    email: string;
    role: string;
}

// ✅ Generate Access Token
export const generateAccessToken = (user_id: number, email: string, role: string): string => {
    return jwt.sign({ user_id, email, role } as JwtPayload, JWT_SECRET, { expiresIn: '1m' });
};

// ✅ Generate Refresh Token
export const generateRefreshToken = (user_id: number, email: string, role: string): string => {
    return jwt.sign({ user_id, email, role } as JwtPayload, REFRESH_SECRET, { expiresIn: '7d' });
};

// ✅ Verify Access Token
export const verifyAccessToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        return null; // Return null if verification fails
    }
};

// ✅ Verify Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
    } catch (error) {
        return null; // Return null if verification fails
    }
};
