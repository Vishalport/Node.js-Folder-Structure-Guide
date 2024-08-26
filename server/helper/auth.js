import config from "config";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
import responseMessage, { BLOCK_BY_ADMIN, DELETE_BY_ADMIN, USER_NOT_FOUND } from '../../config/responseMessage';
import response from "../../config/response";
import { BLOCK, DELETE } from "../enums/status";

module.exports = {
    verifyToken(req, res, next) {
        if (req.cookies.token) {
            jwt.verify(req.cookies.token, config.get('jwtsecret'), (err, result) => {
                if (err) {
                    return res.json(err);
                }
                else {
                    req.result;
                    next();
                }
            })
        } else {
            return res.json(response.badRequest({}, responseMessage.NO_TOKEN))
        }
    },
}