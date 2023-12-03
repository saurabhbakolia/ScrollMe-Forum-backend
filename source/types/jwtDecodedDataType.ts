export interface JWTDecodedDataType {
    _id: string;
    username: string;
    roles: string[];
    iat: number;
    exp: number;
};