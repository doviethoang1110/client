import store from "../../store";
import ProductService from './product.service';
export const product = {
  namespaced:true,
  state:{
    products:[],
    one:null,
    totalPage:0,
  },
  actions:{
    findAll({commit},page){
      return ProductService.products(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},product){
      return ProductService.add(product).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('product/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},product){
      return ProductService.update(product).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('product/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    findOne({commit},id){
      return ProductService.findOne(id).then(
        response => {
          commit("FETCHONE",response);
          return Promise.resolve(response);
        }
      )
    },
    // delete({commit},id){
    //   return PermissionService.delete(id).then(
    //     response =>{
    //       commit("DELETE",response);
    //       store.dispatch("permission/findAll");
    //       return Promise.resolve(response);
    //     }
    //   )
    // },
    // multidelete({commit},ids) {
    //   return PermissionService.multidelete(ids).then(
    //     response => {
    //       commit("MULTI_DELETE",response);
    //       store.dispatch('permission/findAll');
    //       return Promise.resolve(response);
    //     }
    //   )
    // }
  },
  mutations: {
    FETCH(state, response) {
      state.products = response.listPro;
      state.totalPage = response.totalPage;
    },
    ADD_SUCCESS(state, response) {
      store.state.errors = [];
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      store.state.errors = error;
    },
    FETCHONE(state, response) {
      state.one = response;
    },
    UPDATE_SUCCESS(state, response) {
      store.state.inlineErr = "";
      store.state.success = response;
    },
    UPDATE_FAIL(state,error) {
      store.state.inlineErr = error;
    },
    // DELETE(state,response){
    //   store.state.success = response;
    // },
    // MULTI_DELETE(state,response){
    //   store.state.success = response;
    // }
  },
  getters:{
    fetch:(state) => state.products,
    totalPage:(state)=>state.totalPage,
    errors:(state) => store.state.errors,
    fetchOne:(state) => state.one,
    inlineErr:(state) => store.state.inlineErr
  }
};
