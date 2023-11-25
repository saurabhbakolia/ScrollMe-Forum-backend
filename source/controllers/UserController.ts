import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors/getErrorMessage";
import * as userService from "../services/UserService";

export const loginOne = async (req: Request, res: Response) => {
    try {
        const foundUser = await userService.login(req.body);
        res.status(200).json({
            "status": "success",
            "code": 200,
            "data": foundUser,
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
            message: getErrorMessage(error),
            timestamp: new Date().toLocaleString('en-US', { formatMatcher: 'best fit' })
        });
    }
};