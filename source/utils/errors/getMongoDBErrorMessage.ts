export const getMongoDBErrorMessage = (error: any): String => {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        return "Username already exists";
    }
    return String(error);
};