import store from "../../store";
import PermissionService from './permission.service';

export const permission = {
  namespaced:true,
  state:{
    permissions:[],
    totalPage:0,
    one:null,
  },
  actions:{
    findAll({commit},page){
      return PermissionService.permissions(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},permissions){
      return PermissionService.add(permissions).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('permission/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},category){
      return PermissionService.update(category).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('permission/findAll',0);
          store.dispatch('permission/findOne',[category.id]);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    findOne({commit},id){
      return PermissionService.findOne(id).then(
        response => {
          commit("FETCHONE",response);
          return Promise.resolve(response);
        }
      )
    },
    delete({commit},id){
      return PermissionService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("permission/findAll",0);
          return Promise.resolve(response);
        }
      )
    },
    multidelete({commit},ids) {
      return PermissionService.multidelete(ids).then(
        response => {
          commit("MULTI_DELETE",response);
          store.dispatch('permission/findAll',0);
          return Promise.resolve(response);
        }
      )
    }
  },
  mutations: {
    FETCH(state, response) {
      state.permissions = response.listPermissions;
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
    DELETE(state,response){
      store.state.success = response;
    },
    MULTI_DELETE(state,response){
      store.state.success = response;
    }
  },
  getters:{
    fetch:(state) => state.permissions,
    totalPage:(state) => state.totalPage,
    errors:(state) => store.state.errors,
    fetchOne:(state) => state.one,
    inlineErr:(state) => store.state.inlineErr
  }
};
