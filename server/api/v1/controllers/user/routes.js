import Express from "express";
import controller from "./controller";

export default Express.Router()
    .post('/get-info', controller.userLogin)
