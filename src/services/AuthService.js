import axios from 'axios';
import { ORIGIN } from './api'


const AUTH_URL = ORIGIN + '/api/auth'

class AuthService {
    async verifyToken(token) {
        const URL = AUTH_URL + '/checkToken/' + token;
        try {
            const response = await axios.get(URL);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async logIn(payload) {
        const URL = AUTH_URL + '/signin';
        try {
            const response = await axios.get(URL, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthService();