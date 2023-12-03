import { Document } from "mongoose";
import { UserModel, I_UserDocument } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTDecodedDataType } from "../types/jwtDecodedDataType";

type DocumentDefinition<T> = Omit<T, keyof Document>;

const JWT_SECRET_KEY: string = process.env.SECRET_KEY!;

export const register = async (user: DocumentDefinition<I_UserDocument>) => {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
};

export const login = async (user: DocumentDefinition<I_UserDocument>) => {
    try {
        const foundUser = await UserModel.findOne({
            username: user.username,
        });

        if (!foundUser) {
            throw new Error("Invalid username or password");
        }

        const isMatch = bcrypt.compareSync(user.password, foundUser.password);
        if (isMatch) {
            foundUser.isLoggedIn = true;
            await foundUser.save();
            return {
                _id: foundUser._id,
                username: foundUser.username,
                roles: foundUser.roles,
            };
        } else {
            throw new Error("Invalid username or password");
        }
    } catch (error) {
        throw error;
    }
};

export const logout = async (user: DocumentDefinition<I_UserDocument>, userAgent: any, authToken: any) => {
    try {
        console.log(userAgent);
    } catch (error) {
        throw error;
    }
};

export const getUser = async (user: JWTDecodedDataType) => {
        try {
            console.log("user", user);
            const getUser = await UserModel.findOne({
                username: user.username
            });
            console.log("getUser", getUser);

            if (!getUser) {
                throw new Error("User not found");
            }
            return {
                _id: getUser._id,
                username: getUser.username,
                roles: getUser.roles,
            }
        } catch (error) {
            throw error;
        }
};