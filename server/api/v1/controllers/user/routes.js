import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth"

export default Express.Router()

    .get('/get-info', controller.getInfo)
    .post('/login', controller.userLogin)
    .use(auth.verifyToken)
    .get('/get-profile', controller.getInfo)
