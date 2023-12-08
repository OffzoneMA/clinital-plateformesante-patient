import axiosInstance from "../../../services/Axios";
import searchApi from "../SearchApi/searchApi";

class SearchServices{

    async FetchSearchResult(link){
        return await axiosInstance.get(link);
    }

    async getAllCities(){
        return await axiosInstance.get(searchApi.getAllCities());
    }
    async getAllSpecialities(){
        return await axiosInstance.get(searchApi.getAllSpec());
    }

} export default new SearchServices();