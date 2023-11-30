import axios from '../../../services/Axios';
import CONSTANTS from '../../../constant/constant';
import { ORIGIN, TOKEN, USER_ID } from '../../../services/api'
import apiRdv from '../apiRdv/apiRdv';
import { toast } from 'react-toastify';
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

    getRdvById(id) {
        if (!id) {
            toast.error('its requires a valid ID.');
            return;
        }
    
        const endpoint = apiRdv.showByid(id);
    
        return new Promise((resolve, reject) => {
            axios.get(endpoint)
                .then(response => {
                    // Process and resolve the data
                    resolve(response.data);
                })
                .catch(error => {
                    // Log and reject the error
                    console.error(`Failed to retrieve RDV with ID ${id}`, error);
                    reject(new Error(`Unable to fetch RDV data: ${error.message}`));
                })
                .finally(() => {
                    // Any cleanup actions can be done here
                });
        });
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

/**
 * Asynchronously adds an RDV.
 * 
 * @param {Object} rdv - The RDV data to be added.
 * @returns {Promise<Object>} A promise that resolves to the response of the add operation.
 * @throws {Error} Throws an error if the request fails.
 */



    async moveRdv(rdvId, date) {
        const URL = MOVE_URL + '/MoveRdv' + `/${rdvId}`;
        try {
            const response = await axios.post(URL, date ,AUTHORIZATION);
            return response;
        } catch (error) {
            throw error;
        }
    }
//========================
addRdv(rdv) {
    return axios.post(apiRdv.addrdv(),JSON.stringify(rdv));
    }
async getAgenda(docid,week){
    return await axios.get(apiRdv.getagenda(docid,week));
}
}

export default new RdvService();