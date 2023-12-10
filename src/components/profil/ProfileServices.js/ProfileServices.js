import ApiProfile from "../ApiProfile/ApiProfile";

const { default: axiosInstance } = require("../../../services/Axios");

class ProfleServices{
    async getProfileMedecin(id){
        return await axiosInstance.get(ApiProfile.getProfileMed(id));
    }
} export default new ProfleServices();