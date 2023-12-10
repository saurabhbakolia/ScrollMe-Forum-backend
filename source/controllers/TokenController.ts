import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../middlewares/Auth';
import UserTokenModel from '../models/UserToken';

export const verifyRefreshToken = async (req: Request, res: Response) => {
    try {
        const authenticatedUser = (req as CustomRequest).user;
        if (!authenticatedUser) {
            throw new Error('Invalid user!');
        }
    
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Token successfully verified!",
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    } catch (error) {
        console.error('Error in verifyRefreshToken:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

