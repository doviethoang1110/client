import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class RoleService {
  roles(){
    return axios
      .get(store.state.API_URL+"/roles",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  getPermiss(){
    return axios
      .get(store.state.API_URL+"/select",{headers:authHeader()})
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
  add(role){
    console.log(role)
    return axios
      .post(store.state.API_URL+"/roles",role,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(role){
    return axios
      .put(store.state.API_URL+"/roles",role,{headers:authHeader()})
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
export default new RoleService();
