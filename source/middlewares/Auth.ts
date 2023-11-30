import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/errors/getErrorMessage';


export const JWT_SECRET_KEY: Secret = process.env.SECRET_KEY!;
export interface CustomRequest extends Request {
    user: JwtPayload | string | JwtPayload & { [key: string]: any };
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies['accessToken'];
        if (!accessToken) {
            throw new Error('No token provided');
        }
        const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        (req as CustomRequest).user = decoded;
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