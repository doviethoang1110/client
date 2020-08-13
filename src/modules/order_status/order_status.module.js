import store from "../../store";
import Order_statusService from './order_status.service';

export const status = {
  namespaced:true,
  state:{
    status:[],
    error:"",
    // one:null,
  },
  actions:{
    findAll({commit}){
      return Order_statusService.status().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},order){
      return Order_statusService.add(order).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('status/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},order){
      return Order_statusService.update(order).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('status/findAll');
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
      state.status = response;
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
    fetch:(state) => state.status,
    // getPermissions:(state) => state.permissions,
    // errors:(state) => store.state.errors,
    error:(state) => state.error
  }
};
