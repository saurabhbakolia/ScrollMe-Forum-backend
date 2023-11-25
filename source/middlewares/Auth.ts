import jwt, { Secret, JwtPayload, Jwt } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/errors/getErrorMessage';


export const JWT_SECRET_KEY: Secret = process.env.SECRET_KEY!;
export interface CustomRequest extends Request {
    token: string | JwtPayload;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Invalid token');
        }
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        (req as CustomRequest).token = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            status: "Invalid token",
            code: 401,
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};