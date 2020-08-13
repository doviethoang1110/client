import axios from "axios";
import store from "../../store";
import authHeader from "../../services/auth-header";

class ReviewService {
  reviews(page){
    return axios
      .get(store.state.API_URL+"/reviews?page="+page,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  update(review){
    return axios
      .put(store.state.API_URL+"/reviews",review,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  delete(id){
    return axios
      .delete(store.state.API_URL+"/reviews/"+id,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error => {
        return error
      });
  }
  multidelete(ids){
    return axios
      .post(store.state.API_URL+"/reviews/multidelete",ids,{headers:authHeader()})
      .then(response =>{
        return response.data;
      }).catch(error=>{
        return error;
      });
  }
}
export default new ReviewService();
