import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class PaymentService {
  payments(){
    return axios
      .get(store.state.API_URL+"/payments",{headers:authHeader()})
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
  add(payment){
    return axios
      .post(store.state.API_URL+"/payments",payment,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(payment){
    return axios
      .put(store.state.API_URL+"/payments",payment,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  // delete(id){
  //   return axios
  //     .delete(store.state.API_URL+"/permissions/"+id,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     }).catch(error => {
  //       return error
  //     });
  // }
}
export default new PaymentService();
