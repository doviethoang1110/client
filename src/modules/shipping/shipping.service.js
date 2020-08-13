import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class ShippingService {
  shippings(){
    return axios
      .get(store.state.API_URL+"/shippings",{headers:authHeader()})
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
  add(shipping){
    return axios
      .post(store.state.API_URL+"/shippings",shipping,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(shipping){
    return axios
      .put(store.state.API_URL+"/shippings",shipping,{headers:authHeader()})
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
  // multidelete(ids){
  //   return axios
  //     .post(store.state.API_URL+"/permissions/multidelete",ids,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     }).catch(error=>{
  //       return error;
  //     });
  // }
}
export default new ShippingService();
