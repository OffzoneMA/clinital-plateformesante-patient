import axiosInstance from "../../../services/Axios";
import Compteapi from "../compteapi/Compteapi";

class AccountService{

    async ResetPassword(data){
    return await axiosInstance.post(Compteapi.ResetPassword(),data);
}

}
export default new AccountService();