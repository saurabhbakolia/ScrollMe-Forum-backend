import mongoose, { Schema } from "mongoose";

export interface I_UserTokenDocument extends mongoose.Document {
    userId: Schema.Types.ObjectId;
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const UserTokenSchema: mongoose.Schema<I_UserTokenDocument> = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    isLoggedIn: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() }
});

const UserTokenModel = mongoose.model<I_UserTokenDocument>('UserToken', UserTokenSchema);

export default UserTokenModel;
