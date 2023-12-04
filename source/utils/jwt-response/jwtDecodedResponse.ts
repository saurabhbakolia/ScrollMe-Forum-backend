import { JwtPayload } from "jsonwebtoken";
import { JWTDecodedDataType } from "../../types/jwtDecodedDataType";

export const jwtDecodedResponse = (jwtResponse: JwtPayload): JWTDecodedDataType => {
    const decodedData: JWTDecodedDataType = {
        _id: jwtResponse._id,
        username: jwtResponse.username,
        roles: jwtResponse.roles,
    };
    return decodedData;
};