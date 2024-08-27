import jwt from 'jsonwebtoken';
import config from 'config';
import response from '../../config/response';
import responseMessage from '../../config/responseMessage';
import { __token } from '../../text';

const jwtSecret = config.get('jwtOptions.jwtSecret');

module.exports = {
    verifyToken(req, res, next) {
        const token = req.cookies[__token]; // Extract token directly from cookies
        if (token) {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    // Clear the cookie if the token is invalid or expired
                    res.clearCookie(__token, { path: '/' });
                    return res.status(401).json({ responseCode: 401, responseMessage: 'Invalid or expired token' });
                }
                // Attach the decoded token data to the request object
                req.user = decoded;
                next();
            });
        } else {
            return res.status(400).json(response.badRequest({}, responseMessage.NO_TOKEN));
        }
    }
};