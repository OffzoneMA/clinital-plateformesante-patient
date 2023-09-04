import axios from 'axios';
import CONSTANTS from '../constant/constant';
import { ORIGIN, TOKEN, USER_ID } from './api'

const RDV_URL = ORIGIN + '/api/rdv/patient'
const GET_RDV_URL = ORIGIN + '/api/rdv/rdvs/patient'
const SCHEDULS_URL = ORIGIN + '/api/med'
const MOVE_URL = ORIGIN + '/api/rdv'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }

class RdvService {
    async getAllRdv() {
        const URL = GET_RDV_URL;
        try {
            const response = await axios.get(URL, AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllRdvByTooMonth(month) {
        const URL_1 = RDV_URL + '/rdvbymonth' + `/${USER_ID}` + `/${month - 1}`;
        const URL_2 = RDV_URL + '/rdvbymonth' + `/${USER_ID}` + `/${month}`;
        try {
            const resPrev = await axios.get(URL_1, AUTHORIZATION);
            const resNext = await axios.get(URL_2, AUTHORIZATION);
            return {data:[...resPrev.data, ...resNext.data]};
        } catch (error) {
            throw error;
        }
    }

    async getRdvById(id) {
        const URL = RDV_URL + '/rdvById' + `/${id}`;
        try {
            const response = await axios.get(URL, AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }
   
    async cancelRdv(id) {
        const URL = RDV_URL + '/cancelRdv' + `/${id}`;
        try {
            const response = await axios.post(URL, {} , AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getScheduls(docId, date) {
        const URL = SCHEDULS_URL + '/agenda' + `/${docId}/1/${date}`;
        try {
            const response = await axios.get(URL, AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async addRdv(rdv) {
        const URL = RDV_URL + '/addRdv';
        try {
            const response = await axios.post(URL, rdv ,AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async moveRdv(rdvId, date) {
        const URL = MOVE_URL + '/MoveRdv' + `/${rdvId}`;
        try {
            const response = await axios.post(URL, date ,AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new RdvService();