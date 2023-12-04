import { CustomRequest } from "../middlewares/Auth";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors/getErrorMessage";
import * as userService from "../services/UserService";
import { generateUserTokens } from "../utils/tokens/generateToken";
import { getMongoDBErrorMessage } from "../utils/errors/getMongoDBErrorMessage";
import UserTokenModel from "../models/UserToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTDecodedDataType } from "../types/jwtDecodedDataType";

const JWT_SECRET_KEY = process.env.SECRET_KEY!;

export const loginOne = async (req: Request, res: Response) => {
    try {
        const foundUser = await userService.login(req.body);
        if (!foundUser) {
            throw new Error("Invalid username or password");
        };
        const { accessToken, refreshToken } = await generateUserTokens(foundUser);
        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1 * 60 * 1000 }); // 3 min
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 3 * 60 * 1000 }); // 7 min
        res.status(200).json({
            "status": "success",
            "code": 200,
            "message": "User successfully logged in",
            "timestamp": new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "code": 500,
            "message": getErrorMessage(error),
            "timestamp": new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};

export const registerOne = async (req: Request, res: Response) => {
    try {
        await userService.register(req.body);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "User successfully registered",
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            code: 500,
            message: getMongoDBErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};

export const logoutOne = async (req: Request, res: Response) => {
    try {
        const authenticatedUser = (req as CustomRequest).user;
        if (!authenticatedUser) {
            throw new Error('Username required!');
        }
        const userToken = await UserTokenModel.findOne({ userId: authenticatedUser._id });
        if (!userToken) {
            throw new Error('Invalid user token!');
        }
        await userToken.deleteOne();

        res.status(200).json({
            status: "success",
            code: 200,
            message: "User successfully logged out",
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            code: 500,
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};


export const getUser = async (req: Request, res: Response) => {
    try {
        const authenticatedUser = (req as CustomRequest).user;
        if (!authenticatedUser) {
            throw new Error('No user found!');
        }
        const userInformation = await userService.getUser(authenticatedUser);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "User information successfully retrieved",
            data: userInformation,
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            code: 500,
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};