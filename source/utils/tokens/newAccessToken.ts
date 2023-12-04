import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyRefreshToken } from "./verifyRefreshToken";
import UserTokenModel from "../../models/UserToken";
import { JWTDecodedDataType } from "../../types/jwtDecodedDataType";
// import { DecodedDataResponseType } from "../../types/DecodedDataResponseType";

const secretKey = process.env.SECRET_KEY!;

export const newAccessToken = async (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        if (!refreshToken) {
            reject(new Error("Refresh token is required"));
        };

        verifyRefreshToken(refreshToken)
            .then(async (decodedData) => {
                const user = decodedData as JWTDecodedDataType;
                const payload = { _id: user._id, username: user.username, roles: user.roles };
                const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1 min" });
                await UserTokenModel.findOneAndUpdate({ userId: user._id }, {
                    accessToken: accessToken, 
                    updatedAt: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
                });
                console.log("AccessToken updated: ", user);
                resolve(accessToken);
            })
            .catch((error) => {
                reject(new Error("Error in generating new access token"));
            });
    })
};
