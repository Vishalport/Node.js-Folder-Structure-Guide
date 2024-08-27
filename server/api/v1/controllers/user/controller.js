import Joi from "joi";
import _ from "lodash";
import response from "../../../../../config/response";
import responseMessage from "../../../../../assets/responseMessage";
import { __token } from "../../../../../text";
import commonFunction from "../../../../helper/utils"
import { userServices } from '../../services/user';
import { INVALID_EMAIL_FORMATE, INVALID_PASSWORD_FORMATE } from "../../../../../config/responseMessage";

const { findUser } = userServices;

export class userController {

  async userLogin(req, res, next) {
    const validationSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'co'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
    });
    try {
      const { error, value } = validationSchema.validate(req.body);
      if (error) {
        const errorMessages = error.details.map(detail => {
          switch (detail.path[0]) {
            case 'email':
              return INVALID_EMAIL_FORMATE;
            case 'password':
              return INVALID_PASSWORD_FORMATE;
            default:
              return detail.message;
          }
        });

        return res.status(400).json({
          responseCode: 400,
          responseMessage: errorMessages.join(' ')
        });
      }

      const { email, password } = value;
      const userInfo = await findUser({ email, password });
      if (!userInfo) {
        return res.status(401).json(response.unauthorized({}, responseMessage.INCORRECT_CREDENTIAL));
      }

      const token = await commonFunction.getToken({ userInfo });

      if (token) {
        res.cookie(__token, token, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 30), // Cookie valid for 30 minutes
          httpOnly: true,
          sameSite: 'lax'
        });
      }

      return res.json(response.success({ [__token]: token }, responseMessage.USER_DETAILS));
    } catch (error) {
      console.log('error', error);
      return next(error);
    }
  }




  async getInfo(req, res, next) {
    try {
      const userResult = req.user
      return res.json(response.success(userResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return res.status(500).json(new response({}, "Internal Server Error"));
    }
  }
}
export default new userController();
