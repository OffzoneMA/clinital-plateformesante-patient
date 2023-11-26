import axiosInstance from "../../../services/Axios"
import Connexionapi from "../apiendpoints/Connexionapi"
export default{
    async signin(data){
        console.log(data)
        return await axiosInstance.post(Connexionapi.login(),JSON.stringify(data));
    }
}