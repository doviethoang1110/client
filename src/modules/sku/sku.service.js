import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class SkuService {
  skus(id){
    return axios
      .get(store.state.API_URL+"/products/"+id+"/skus",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  add(sku){
    return axios
      .post(store.state.API_URL+"/skus",sku,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(sku){
    return axios
      .put(store.state.API_URL+"/skus",sku,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
}
export default new SkuService();
