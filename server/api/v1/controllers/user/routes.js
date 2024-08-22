import Express from "express";
import controller from "./controller";

export default Express.Router()
    .get('/get-info', controller.getInfo)
    .post('/login', controller.userLogin)
