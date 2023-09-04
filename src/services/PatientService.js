import axios from 'axios';
import { ORIGIN, TOKEN, USER_ID } from './api'

const PATIENT_URL = ORIGIN + '/api/patient'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
const ADD_DOC = ORIGIN + '/api/doc/addDoc'

class PatientService {
    async getAllProche() {
        const URL = PATIENT_URL + '/getall';
        try {
            const response = await axios.get(URL, AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async addDoc(payload) {
        const URL = ADD_DOC;
        try {
            const response = await axios.post(URL, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=${form._boundary}',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });

            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default new PatientService();