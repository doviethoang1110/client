import store from "../../store";
import PaymentService from './payment.service';

export const payment = {
  namespaced:true,
  state:{
    payments:[],
    error:"",
    // one:null,
  },
  actions:{
    findAll({commit}){
      return PaymentService.payments().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},payment){
      return PaymentService.add(payment).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('payment/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},payment){
      return PaymentService.update(payment).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('payment/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    // findOne({commit},id){
    //   return PermissionService.findOne(id).then(
    //     response => {
    //       commit("FETCHONE",response);
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
    // delete({commit},id){
    //   return PermissionService.delete(id).then(
    //     response =>{
    //       commit("DELETE",response);
    //       store.dispatch("permission/findAll");
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
  },
  mutations: {
    FETCH(state, response) {
      state.payments = response;
    },
    ADD_SUCCESS(state, response) {
      state.error = "";
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      state.error = error;
    },
    // FETCHONE(state, response) {
    //   state.one = response;
    // },
    UPDATE_SUCCESS(state, response) {
      state.error = "";
      state.success = response;
    },
    UPDATE_FAIL(state,error) {
      state.error = error;
    },
    // DELETE(state,response){
    //   store.state.success = response;
    // },
  },
  getters:{
    fetch:(state) => state.payments,
    // getPermissions:(state) => state.permissions,
    // errors:(state) => store.state.errors,
    error:(state) => state.error
  }
};
