import axiosInstance from "../../../services/Axios"
import Connexionapi from "../apiendpoints/Connexionapi"
export default{
    async signin(userCredentials){
        return await axiosInstance.post(Connexionapi,userCredentials);
    }
}