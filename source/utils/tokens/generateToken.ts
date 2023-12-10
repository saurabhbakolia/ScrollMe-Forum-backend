import jwt from "jsonwebtoken";
import UserTokenModel from "../../models/UserToken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export const generateUserTokens = async (user: any) => {
    try {
        const payload = { _id: user._id?.toString(), username: user.username, roles: user.roles };
        const accessToken = jwt.sign(payload, secretKey, { expiresIn: "3 min" });
        const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "2 day" });
        const isUserTokenExist = await UserTokenModel.findOne({ userId: user._id });
        if (isUserTokenExist) await UserTokenModel.deleteOne();

        console.log("userId", user);
        const userToken = await UserTokenModel.create({
            userId: user._id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            isLoggedIn: false
        });

        return userToken;
    } catch (error) {
        console.error('Error in generateUserTokens:', error);
        throw new Error("Error in generating tokens");
    }
}