import axios from 'axios';
import store from '../../store';
import authHeader from "../../services/auth-header";
class CategoryService {
  categories(){
    return axios
      .get(store.state.API_URL+"/categories",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  add(category){
    return axios
      .post(store.state.API_URL+"/categories",category,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  update(category){
    return axios
      .put(store.state.API_URL+"/categories",category,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  findOne(slug){
    return axios.
    get(store.state.API_URL+"/categories/"+slug,{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        return error;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/categories/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }

}
export default new CategoryService();
