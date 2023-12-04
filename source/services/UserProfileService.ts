import UserProfileModel, { I_UserProfileDocument } from "../models/UserProfileModel";

type DocumentDefinition<T> = Omit<T, keyof Document>;

export const createProfile = async (profile: DocumentDefinition<I_UserProfileDocument>) => {
    try {
        // check if the userProfile already exists 
        const existingUserProfile = await UserProfileModel.findOne({ userId: profile.userId });
        if(existingUserProfile) throw new Error("User profile already exists");
        await UserProfileModel.create(profile);
    } catch (error) {
        throw error;
    }
};

export const editProfile = async (profile: DocumentDefinition<I_UserProfileDocument>) => {
    try {
        await UserProfileModel.findOneAndUpdate({ userId: profile.userId }, profile);
    } catch (error) {
        throw error;
    }
};