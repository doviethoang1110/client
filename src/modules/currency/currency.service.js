import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class CurrencyService {
  currencies(){
    return axios
      .get(store.state.API_URL+"/currencies",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  // findOne(id){
  //   return axios.
  //   get(store.state.API_URL+"/permissions/"+id,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     })
  //     .catch(error =>{
  //       return error;
  //     });
  // }
  add(currency){
    return axios
      .post(store.state.API_URL+"/currencies",currency,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(currency){
    return axios
      .put(store.state.API_URL+"/currencies",currency,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
}
export default new CurrencyService();
