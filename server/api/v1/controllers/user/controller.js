
import response from "../../../../../config/response";
import responseMessage from "../../../../../assets/responseMessage";
import { __token } from "../../../../../text";
import userType from "../../../../enums/userType";
import { USER } from "../../../../enums/userType";
import commonFunction from "../../../../helper/utils"

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  maxAge: 5 * 60 * 1000,
};

export class userController {

  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email === "admin@gmail.com") {
        if (password === "admin") {
          const token = await commonFunction.getToken({
            email: email,
            password: password,
            userType: USER
          });
          res.cookie(__token, token, cookieOptions);
          return res.json(response.success({ email, token }, responseMessage.USER_DETAILS));
        } else {
          return res.json(response.unauthorized({}, responseMessage.INCORRECT_PASSWORD));
        }
      } else {
        return res.json(response.unauthorized({}, responseMessage.INCORRECT_EMAIL));
      }
    } catch (error) {
      return res.json(response.internal("Internal Server Error"));
    }
  }
  
  async getInfo(req, res, next) {
    try {
      const userResult = req.result
      return res.status(200).json(new response(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return res.status(500).json(new response({}, "Internal Server Error"));
    }
  }
}
export default new userController();
