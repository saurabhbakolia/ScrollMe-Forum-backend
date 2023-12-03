import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";
import { DecodedDataResponseType } from "../../types/DecodedDataResponseType";

const JWT_SECRET_KEY = process.env.SECRET_KEY!;

export const verifyRefreshToken = async (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        UserTokenModel.findOne({ refreshToken: refreshToken })
            .then((token) => {
                if (!token) {
                    return reject(new Error("Invalid refresh token"));
                }
                const { refreshToken } = token;
                jwt.verify(refreshToken, JWT_SECRET_KEY, (error, decodedDetails) => {
                    if (error) {
                        return reject(new Error("Invalid refresh token"));
                    }
                    return resolve({
                        status: "success",
                        code: 200,
                        message: "Refresh token valid",
                        data: decodedDetails,
                        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                    });
                });

            }).catch((error) => reject({
                status: "server error",
                code: 500,
                message: "Refresh token is not valid" + error,
                timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
            }));
    });
};