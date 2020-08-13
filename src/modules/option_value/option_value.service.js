import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class Option_valueService {
  option_values(){
    return axios
      .get(store.state.API_URL+"/option_values",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
}
export default new Option_valueService();
