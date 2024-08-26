
import response from "../../../../../config/response";
import responseMessage from "../../../../../assets/responseMessage";
import { __token } from "../../../../../text";
import commonFunction from "../../../../helper/utils"
import { userServices } from '../../services/user';

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  maxAge: 5 * 60 * 1000,
};


const { findUser } = userServices;

export class userController {

  async userLogin(req, res, next) {
    try {
      const { email, password, userType } = req.body;
      const userInfo = await findUser({ email, password, userType });
      if (!userInfo) {
        return res.json(response.unauthorized({}, responseMessage.INCORRECT_CREDENTIAL));
      }
      const token = await commonFunction.getToken({
        email: email,
        password: password,
        userInfo
      });
      res.cookie(__token, token, cookieOptions);
      return res.json(response.success(req.session, responseMessage.USER_DETAILS));
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
