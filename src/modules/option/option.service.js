import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class OptionService {
  options(){
    return axios
      .get(store.state.API_URL+"/options",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
}
export default new OptionService();
