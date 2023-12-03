import UserProfileModel, { I_UserProfileDocument } from "../models/UserProfileModel";

type DocumentDefinition<T> = Omit<T, keyof Document>;

export const createProfile = async (profile: DocumentDefinition<I_UserProfileDocument>) => {
    try {
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