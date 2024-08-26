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
                    // userModel.findOne({ _id: result._id }, (error, result2) => {
                    //     if (error) {
                    //         return next(error)
                    //     }
                    //     else if (!result2) {
                    //         return res.status(404).json({
                    //             responseCode: 404,
                    //             responseMessage: USER_NOT_FOUND
                    //         })
                    //     }
                    //     else {
                    //         if (result2.status == BLOCK) {
                    //             return res.status(403).json({
                    //                 responseCode: 403,
                    //                 responseMessage: BLOCK_BY_ADMIN
                    //             })
                    //         }
                    //         else if (result2.status == DELETE) {
                    //             return res.status(401).json({
                    //                 responseCode: 401,
                    //                 responseMessage: DELETE_BY_ADMIN
                    //             })
                    //         }
                    //         else {
                    //             req.userId = result._id;
                    //             req.userDetails = result
                    //             next();
                    //         }
                    //     }
                    // })
                }
            })
        } else {
            return res.json(response.badRequest({}, responseMessage.NO_TOKEN))
        }
    },
}