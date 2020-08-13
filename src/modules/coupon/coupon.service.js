import axios from 'axios';
import store from '../../store';
import authHeader from "../../services/auth-header";
class CouponService {
  coupons(){
    return axios
      .get(store.state.API_URL+"/coupons",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  users(){
    return axios
      .get(store.state.API_URL+"/users",{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  user(id){
    return axios
      .get(store.state.API_URL+"/users/"+id,{headers:authHeader()})
      .then(response=>{
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
  add(coupon){
    return axios
      .post(store.state.API_URL+"/coupons",coupon,{headers:authHeader()})
      .then(response => {
        return response.data;
      });
  }
  deliver(coupon){
    return axios
      .post(store.state.API_URL+"/coupons/deliver",coupon,{headers:authHeader()})
      .then(response =>{
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  }
  update(coupon){
    return axios
      .put(store.state.API_URL+"/coupons",coupon,{headers:authHeader()})
      .then(response => {
        console.log(response);
        return response.data;
      });
  }
  // findOne(slug){
  //   return axios.
  //   get(store.state.API_URL+"/brands/"+slug,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     })
  //     .catch(error =>{
  //       return error;
  //     });
  // }
  // delete(slug){
  //   return axios
  //     .delete(store.state.API_URL+"/brands/"+slug,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     }).catch(error => {
  //       return error
  //     });
  // }
  // multidelete(ids){
  //   return axios
  //     .post(store.state.API_URL+"/brands/delete",ids,{headers:authHeader()})
  //     .then(response =>{
  //       return response.data;
  //     }).catch(error=>{
  //       return error;
  //     });
  // }
}
export default new CouponService();
