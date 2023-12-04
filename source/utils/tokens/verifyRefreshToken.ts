import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";
import { jwtDecodedResponse } from "../jwt-response/jwtDecodedResponse";

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
                    return resolve(jwtDecodedResponse(decodedDetails as JwtPayload));
                });

            }).catch((error) => reject(
                new Error("Error in verifying refresh token!")
            ));
    });
};