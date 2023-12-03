import mongoose, { Schema } from "mongoose";

export enum Pronouns {
    HE_HIM = "he/him",
    SHE_HER = "she/her",
    THEY_THEM = "they/them",
    HE_THEY = "he/they",
    SHE_THEY = "she/they",
    THEY_HE = "they/he",
    THEY_SHE = "they/she",
    ASK_MY_PRONOUNS = "ask my pronouns"
};

export interface I_UserProfileDocument extends mongoose.Document {
    userId: Schema.Types.ObjectId;
    aboutUs: string;
    location: string;
    website: string;
    pronouns: Pronouns;
    profileHeaderImage: string;
    userCardBackgroundImage: string;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
};

const UserProfileSchema: mongoose.Schema<I_UserProfileDocument> = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    aboutUs: { type: String },
    location: { type: String },
    website: { type: String },
    pronouns: { type: String, enum: Object.values(Pronouns) },
    profileHeaderImage: { type: String },
    userCardBackgroundImage: { type: String },
    dateOfBirth: { type: Date },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() }
});

const UserProfileModel = mongoose.model<I_UserProfileDocument>('UserProfile', UserProfileSchema);

export default UserProfileModel;