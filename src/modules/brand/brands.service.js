import axios from 'axios';
import store from '../../store';
import authHeader from "../../services/auth-header";
class BrandsService {
    brands(page){
      return axios
        .get(store.state.API_URL+"/brands?page="+page,{headers:authHeader()})
        .then(response=>{
          return response.data;
        })
        .catch(error => {
          return error;
        });
    }
    getAll(){
      return axios
        .get(store.state.API_URL+"/brands/getAll",{headers:authHeader()})
        .then(response=>{
          return response.data;
        })
        .catch(error => {
          return error;
        });
    }
    add(brand){
      return axios
        .post(store.state.API_URL+"/brands",brand,{headers:authHeader()})
        .then(response => {
          return response.data;
        });
    }
    findOne(id){
      return axios.
        get(store.state.API_URL+"/brands/"+id,{headers:authHeader()})
        .then(response =>{
          return response.data;
        })
        .catch(error =>{
          return error;
        });
    }
    delete(slug){
      return axios
        .delete(store.state.API_URL+"/brands/"+slug,{headers:authHeader()})
        .then(response =>{
          return response.data;
        });
    }
}
export default new BrandsService();
