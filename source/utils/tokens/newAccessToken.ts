import jwt from "jsonwebtoken";
import { verifyRefreshToken } from "./verifyRefreshToken";
import UserTokenModel from "../../models/UserToken";
import { JWTDecodedDataType } from "../../types/jwtDecodedDataType";
// import { DecodedDataResponseType } from "../../types/DecodedDataResponseType";

export const newAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new Error("Refresh token is required");
    };

    verifyRefreshToken(refreshToken)
        .then((decodedData) => {
            const payload = { _id: decodedData.data._id, username: decodedData.data.username, role: decodedData.data.role };
            // const payload = { _id: user._id?.toString(), username: user.username, role: user.roles };
            // const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1 min" });
            // const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "5 min" });
            // const isUserTokenExist = await UserTokenModel.findOne({ userId: user._id });
            // if (isUserTokenExist) await UserTokenModel.deleteOne();

            // console.log("userId", user);
            // const userToken = await UserTokenModel.create({
            //     userId: user._id,
            //     accessToken: accessToken,
            //     refreshToken: refreshToken,
            //     isLoggedIn: false
            // });
        })
        .catch((error) => {
            throw new Error(error);
        });
};
