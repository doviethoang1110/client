import CouponService from './coupon.service';
import store from '../../store';

export const coupon = {
  namespaced:true,
  state:{
    coupons:[],
    users:[],
    error:"",
    one:null
  },
  actions:{
    findAll({commit}){
      return CouponService.coupons().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    findUsers({commit}){
      return CouponService.users().then(
        response => {
          commit("USER",response);
          return Promise.resolve(response);
        },
      )
    },
    findUser({commit},id){
      return CouponService.user(id).then(
        response => {
          commit("ONE",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},coupon){
      return CouponService.add(coupon).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('coupon/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    deliver({commit},coupon){
      return CouponService.deliver(coupon).then(
        response => {
          commit("DELIVER_SUCCESS",response);
          return Promise.resolve(response);
        },
        error => {
          commit("DELIVER_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},coupon){
      return CouponService.update(coupon).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('coupon/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    // edit({commit},slug){
    //   return CategoryService.findOne(slug).then(
    //     response =>{
    //       commit("EDIT",response);
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
    // findOne({commit},slug){
    //   return CategoryService.findOne(slug).then(
    //     response => {
    //       commit("FETCHONE",response);
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
    // delete({commit},id){
    //   return CategoryService.delete(id).then(
    //     response =>{
    //       commit("DELETE",response);
    //       store.dispatch("category/findAll");
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
  },
  mutations: {
    FETCH(state, response) {
      state.coupons = response;
    },
    ADD_SUCCESS(state, response) {
      state.error = "";
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      state.error = error;
    },
    USER(state,response){
      state.users = response;
    },
    ONE(state,response){
      state.one = response;
    },
    DELIVER_SUCCESS(state, response) {
      state.error = "";
      store.state.success = response;
    },
    DELIVER_FAILURE(state,error) {
      state.error = error;
    },
    UPDATE_SUCCESS(state, response) {
      state.error = "";
      store.state.success = response;
    },
    UPDATE_FAIL(state,error) {
      state.error = error;
    },
    // DELETE(state,response){
    //   store.state.success = response;
    // }
  },
  getters:{
    fetch:(state) => state.coupons,
    user:(state) => state.users,
    error:(state) => state.error,
    one:(state) => state.one
  }
};
