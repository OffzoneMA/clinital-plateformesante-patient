import axiosInstance from "../../../services/Axios";
import PateintApi from "../patientApi/PateintApi";

class PatientService{
    async getAllPorch(){
        return await axiosInstance.get(PateintApi.getAllPateint());
    }

}export default new PatientService();