import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class OrderService {
  orders(page){
    return axios
      .get(store.state.API_URL+"/orders?page="+page,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  findOne(id){
    return axios.
    get(store.state.API_URL+"/orders/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        return error;
      });
  }
  orderStatus(){
    return axios.
    get(store.state.API_URL+"/orders/orderstatus",{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        return error;
      })
  }
  update(orderStatus){
    return axios
      .put(store.state.API_URL+"/orders",orderStatus,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/orders/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }
}
export default new OrderService();
