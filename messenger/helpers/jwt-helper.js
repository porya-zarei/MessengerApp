// import jwt from "../../node_modules/jsonwebtoken/index";
import {TokenExpiredError, decode, verify} from "jsonwebtoken";

export const decodeToken = (token) => {
    return decode(token, {complete: true});
};

export const isExpired = (token) => {
    try {
        const {exp} = decode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false;
    }
};
