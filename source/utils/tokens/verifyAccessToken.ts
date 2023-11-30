import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";

const JWT_SECRET_KEY = process.env.SECRET_KEY!;

export const verifyAccessToken = async (accessToken: string) => {
    return new Promise((resolve, reject) => {
        UserTokenModel.findOne({ accessToken: accessToken })
            .then((token) => {
                if (!token) {
                    return reject(new Error("Invalid access token"));
                }

                jwt.verify(accessToken, JWT_SECRET_KEY, (error, decodedDetails) => {
                    if (error) {
                        return reject(new Error("Invalid access token"));
                    }
                    return resolve({ decodedDetails: decodedDetails });
                });

            }).catch((error) => reject({
                status: 500,
                message: "Access token not valid"
            }));
    });
};