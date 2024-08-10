
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage";
export class userController {
 
  async getDocs(req, res, next) {
    try {
      return res.json(new response({}, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }
}

export default new userController();
