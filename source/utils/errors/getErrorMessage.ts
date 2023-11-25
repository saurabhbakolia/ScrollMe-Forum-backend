export const getErrorMessage = (error: unknown): String => {
    if (error instanceof Error) return error.message;
    return String(error);
};