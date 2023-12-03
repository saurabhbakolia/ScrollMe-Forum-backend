import jwt, { Secret, JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/errors/getErrorMessage';
import { verifyAccessToken } from '../utils/tokens/verifyAccessToken';
import { DecodedDataResponseType } from '../types/DecodedDataResponseType';
import { verifyRefreshToken } from '../utils/tokens/verifyRefreshToken';
import { newAccessToken } from '../utils/tokens/newAccessToken';


export const JWT_SECRET_KEY: Secret = process.env.SECRET_KEY!;
export interface CustomRequest extends Request {
    user: DecodedDataResponseType;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies['accessToken'];
        const refreshToken = req.cookies['refreshToken'];
        if (!accessToken && !refreshToken) {
            throw new Error('No token provided');
        } else if (!accessToken && refreshToken) {
            verifyRefreshToken(refreshToken)
                .then((decodedData) => {
                    (req as CustomRequest).user = decodedData as DecodedDataResponseType;
                    newAccessToken(refreshToken);
                    next();
                })
                .catch((error) => {
                    res.status(401).json({
                        status: "Invalid token",
                        code: 401,
                        message: getErrorMessage(error),
                        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                    });
                });
        }
        verifyAccessToken(accessToken)
            .then((decodedData) => {
                if (!decodedData) {
                    throw new Error('Invalid token');
                };
                (req as CustomRequest).user = decodedData as DecodedDataResponseType;
                next();
            })
            .catch((error) => {
                res.status(401).json({
                    status: "Invalid token",
                    code: 401,
                    message: getErrorMessage(error),
                    timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                });
            });
    } catch (error) {
        res.status(401).json({
            status: "Invalid token",
            code: 401,
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};