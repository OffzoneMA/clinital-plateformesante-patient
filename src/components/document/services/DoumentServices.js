import documentapiendpoints from "../apiendpoints/documentapiendpoints";
import Axios from "../../../services/Axios"
export default {
    index() {
      return Axios.get(documentapiendpoints.show());
    }}