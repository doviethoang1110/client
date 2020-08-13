import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class PermissionService {
  permissions(page){
    return axios
      .get(store.state.API_URL+"/permissions?page="+page,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  findOne(id){
    return axios.
    get(store.state.API_URL+"/permissions/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        return error;
      });
  }
  add(permissions){
    return axios
      .post(store.state.API_URL+"/permissions",permissions,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(permission){
    return axios
      .put(store.state.API_URL+"/permissions",permission,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/permissions/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }
  multidelete(ids){
    return axios
      .post(store.state.API_URL+"/permissions/multidelete",ids,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error=>{
        return error;
      });
  }
}
export default new PermissionService();
