import store from "../../store";
import OrderService from './order.service';

export const order = {
  namespaced:true,
  state:{
    orders:[],
    totalPage:0,
    error:"",
    one:null,
    orderStatus:[],
  },
  actions:{
    findAll({commit},page){
      return OrderService.orders(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    update({commit},payload){
      return OrderService.update(payload).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('order/findOne',payload.id);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    findOne({commit},id){
      return OrderService.findOne(id).then(
        response => {
          commit("FETCHONE",response);
          return Promise.resolve(response);
        }
      )
    },
    findOrderStatus({commit}){
      return OrderService.orderStatus().then(
        response =>{
          commit("ORDER_STATUS",response);
          return Promise.resolve(response);
        }
      )
    },
    delete({commit},id){
      return OrderService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("order/findAll");
          return Promise.resolve(response);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.orders = response.listOrders;
      state.totalPage = response.totalPage;
    },
    ORDER_STATUS(state,response){
      state.orderStatus = response;
    },
    FETCHONE(state, response) {
      state.one = response;
    },
    UPDATE_SUCCESS(state, response) {
      state.error = "";
      state.success = response;
    },
    UPDATE_FAIL(state,error) {
      state.error = error;
    },
    DELETE(state,response){
      store.state.success = response;
    },
  },
  getters:{
    fetch:(state) => state.orders,
    totalPage:(state) => state.totalPage,
    one:(state) => state.one,
    error:(state) => state.error,
    orderStatus:(state)=>state.orderStatus
  }
};
