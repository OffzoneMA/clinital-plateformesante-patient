import { toast } from "react-toastify";
import axiosInstance from "../../../services/Axios";
import Compteapi from "../Apiaccount/Compteapi";

class AccountService {
  async ResetPassword(data) {
    return await axiosInstance.post(Compteapi.ResetPassword(), data);
  }

  deleteProche = async (idproch) => {
    return await axiosInstance.delete(Compteapi.deletProch(idproch));
  };

  addProche = async (data) => {
    return await axiosInstance.post(Compteapi.AddPatient, data);
  };

  modifierProche = async (id, data) => {
    return await axiosInstance.post(Compteapi.UpdatePatient(id), data);
  };
  getProchesOfCurrentUser = async () => {
    return await axiosInstance.get(Compteapi.getAllProch());
  };
  getPatientById=async (id)=>{
    return await axiosInstance.get(Compteapi.getPatientById(id));
  };
  getMainPatient=async ()=>{
    return await axiosInstance.get(Compteapi.getMainPatient());
  };
  UpdatePatient=async(id,data)=>{
    try {
      return await axiosInstance.post(Compteapi.UpdatePatient(id),data);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   
  }
}
export default new AccountService();
