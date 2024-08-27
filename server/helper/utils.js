import config from 'config';
import jwt from 'jsonwebtoken';

const jwtSecret = config.get('jwtOptions.jwtSecret');
const expiresIn = config.get('jwtOptions.expiresIn');

module.exports = {
    getToken: async (payload) => {
        const token = await jwt.sign(payload, jwtSecret, {
            expiresIn: expiresIn
        });
        return token;
    }
}
