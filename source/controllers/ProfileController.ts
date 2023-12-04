import { Request, Response } from "express";
import * as profileService from "../services/UserProfileService";
import { getErrorMessage } from "../utils/errors/getErrorMessage";
import { CustomRequest } from "../middlewares/Auth";


export const createProfile = async (req: Request, res: Response) => {
    try {
        await profileService.createProfile(req.body);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Profile successfully created",
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

export const editProfile = async (req: Request, res: Response) => {
    try {
        await profileService.editProfile(req.body);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "Profile successfully edited",
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









