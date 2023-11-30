import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";

const JWT_SECRET_KEY = process.env.SECRET_KEY!;

export const verifyRefreshToken = async (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        UserTokenModel.findOne({ refreshToken: refreshToken })
            .then((token) => {
                if (!token) {
                    return reject(new Error("Invalid refresh token"));
                }

                jwt.verify(refreshToken, JWT_SECRET_KEY, (error, decodedDetails) => {
                    if (error) {
                        return reject(new Error("Invalid refresh token"));
                    }
                    return resolve({ decodedDetails: decodedDetails });
                });

            }).catch((error) => reject({
                status: 500,
                message: "Refresh token not valid"
            }));
    });
};