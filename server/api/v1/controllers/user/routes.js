import Express from "express";
import controller from "./controller";

export default Express.Router()
    .get('/get-docs', controller.getDocs)
