import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 8;


export interface I_UserDocument extends mongoose.Document {
    username: string;
    fullName: string;
    password: string;
    email: string;
    pronouns: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
};

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    pronouns: { type: String },
    roles: [{ type: String }],
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() }
});

UserSchema.pre<I_UserDocument>('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, (error, hash) => {
        if (error) return next(error);

        user.password = hash;
        next();
    });
});

export const UserModel = mongoose.model<I_UserDocument>('User', UserSchema);