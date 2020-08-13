import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class ProductService {
  products(page){
    return axios
      .get(store.state.API_URL+"/products?page="+page,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  findOne(id){
    return axios.
    get(store.state.API_URL+"/products/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        return error;
      });
  }
  add(product){
    return axios
      .post(store.state.API_URL+"/products",product,{headers:authHeader(),"Content-Type": "multipart/form-data"})
      .then(response => {
        return response.data;
      });
  }
  update(product){
    return axios
      .post(store.state.API_URL+"/products/edit",product,{headers:authHeader(),"Content-Type": "multipart/form-data"})
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
export default new ProductService();
