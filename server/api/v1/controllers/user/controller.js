
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage";


const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict',
  maxAge: 5 * 60 * 1000,
};

export class userController {
  async userLogin(req, res, next) {
    try {
      return res.status(401).json(new response({}, responseMessage.INCORRECT_EMAIL));

    // } else {

    //   const { email, password } = req.body;
    //   if (email === "admin@gmail.com") {
    //     if (password === "admin") {
    //       res.cookie("authToken", "token_here", cookieOptions);
    //       return res.status(401).json(new response({}, responseMessage.INCORRECT_PASSWORD));
    //     }
    //   } else {
    //     return res.status(401).json(new response({}, responseMessage.INCORRECT_EMAIL));
    //   }
    // } catch (error) {
    //   console.error("Login Error:", error);
    //   return res.status(500).json(new response({}, "Internal Server Error"));
    // }
  }

}

export default new userController();
