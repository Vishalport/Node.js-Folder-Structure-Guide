
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage";
export class userController {
 
  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (email === "admin@gmail.com") {
        if (password === "admin") {
          return res.status(200).json(new response({ email, password }, responseMessage.USER_DETAILS));
        } else {
          return res.status(401).json(new response({}, responseMessage.INCORRECT_PASSWORD));
        }
      } else {
        return res.status(401).json(new response({}, responseMessage.INCORRECT_EMAIL));
      }
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json(new response({}, "Internal Server Error"));
    }
  }
  
}

export default new userController();
