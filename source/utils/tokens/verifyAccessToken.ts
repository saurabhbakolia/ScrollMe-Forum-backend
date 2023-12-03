import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";
import { DecodedDataResponseType } from "../../types/DecodedDataResponseType";

const JWT_SECRET_KEY = process.env.SECRET_KEY!;

export const verifyAccessToken = async (accessToken: string) => {
    return new Promise((resolve, reject) => {
        UserTokenModel.findOne({ accessToken: accessToken })
            .then((token) => {
                if (!token) {
                    return reject(new Error("Token not found!"));
                }
                const { accessToken } = token;
                jwt.verify(accessToken, JWT_SECRET_KEY, (error, decodedDetails) => {
                    if (error) {
                        return reject(new Error("Invalid access token"));
                    }
                    return resolve({
                        status: "success",
                        code: 200,
                        message: "Access token valid",
                        data: decodedDetails,
                        timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                    });
                });

            }).catch((error) => reject({
                status: "server error",
                code: 500,
                message: "Access token is not valid" + error,
                timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
            }));
    });
};
