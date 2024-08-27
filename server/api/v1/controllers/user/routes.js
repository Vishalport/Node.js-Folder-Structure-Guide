import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth"

export default Express.Router()
    .post('/login', controller.userLogin)
    .use(auth.verifyToken)
    .get('/get-profile', controller.getInfo)