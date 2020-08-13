import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class BlogService {
  blogs(page){
    return axios
      .get(store.state.API_URL+"/blogs?page="+page,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  add(banner){
    return axios
      .post(store.state.API_URL+"/blogs",banner,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/blogs/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }
}
export default new BlogService();
