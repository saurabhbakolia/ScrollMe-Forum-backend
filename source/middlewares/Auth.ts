import jwt, { Secret, JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getErrorMessage } from '../utils/errors/getErrorMessage';
import { verifyAccessToken } from '../utils/tokens/verifyAccessToken';
import { DecodedDataResponseType } from '../types/DecodedDataResponseType';
import { verifyRefreshToken } from '../utils/tokens/verifyRefreshToken';
import { newAccessToken } from '../utils/tokens/newAccessToken';
import { JWTDecodedDataType } from '../types/jwtDecodedDataType';


export const JWT_SECRET_KEY: Secret = process.env.SECRET_KEY!;
export interface CustomRequest extends Request {
    user: JWTDecodedDataType;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies['accessToken'];
        const refreshToken = req.cookies['refreshToken'];
        if (!accessToken && !refreshToken) {
            throw new Error('No token provided');
        } else if (!accessToken && refreshToken) {
            console.log("AccessToken expired and RefreshToken is available");
            verifyRefreshToken(refreshToken)
                .then(async (decodedData) => {
                    const newToken = await newAccessToken(refreshToken);
                    res.cookie("accessToken", newToken, { httpOnly: true, maxAge: 1 * 60 * 1000 }); // 15 min
                    const user: JWTDecodedDataType = {
                        _id: (decodedData as JWTDecodedDataType)._id,
                        username: (decodedData as JWTDecodedDataType).username,
                        roles: (decodedData as JWTDecodedDataType).roles
                    };

                    (req as CustomRequest).user = user;
                    next();
                })
                .catch((error) => {
                    res.status(401).json({
                        status: "User RefreshToken expired!",
                        code: 401,
                        message: getErrorMessage(error),
                        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                    });
                });
        } else if (accessToken) {
            console.log("AccessToken is available");
            verifyAccessToken(accessToken)
                .then((decodedData) => {
                    if (!decodedData) {
                        throw new Error('Invalid token');
                    };
                    const user: JWTDecodedDataType = {
                        _id: (decodedData as JWTDecodedDataType)._id,
                        username: (decodedData as JWTDecodedDataType).username,
                        roles: (decodedData as JWTDecodedDataType).roles
                    };
                    (req as CustomRequest).user = user;
                    next();
                })
                .catch((error) => {
                    // throw new Error(error);
                    res.status(401).json({
                        status: "User is logged out, please log in again!",
                        code: 401,
                        message: getErrorMessage(error),
                        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                    });
                });
        }

    } catch (error) {
        res.status(401).json({
            status: "User authorization failed!",
            code: 401,
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};