import { JWTDecodedDataType } from "./jwtDecodedDataType";

export type DecodedDataResponseType = {
    status: string;
    code: number;
    message: string;
    data: JWTDecodedDataType;
    timestamp: string;
}