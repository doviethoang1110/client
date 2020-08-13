import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class BannerService {
  banners(page){
    return axios
      .get(store.state.API_URL+"/banners?page="+page,{headers:authHeader()})
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
  add(banner){
    return axios
      .post(store.state.API_URL+"/banners",banner,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/banners/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }
}
export default new BannerService();
