import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";
import { jwtDecodedResponse } from "../jwt-response/jwtDecodedResponse";

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
                    return resolve(jwtDecodedResponse(decodedDetails as JwtPayload));
                });

            }).catch((error) => reject(
                new Error("Error in verifying access token")
            ));
    });
};
