import store from "../../store";
import RoleService from './role.service';
import PermissionService from "../permission/permission.service";

export const role = {
  namespaced:true,
  state:{
    roles:[],
    permissions:[],
    error:"",
  },
  actions:{
    findAll({commit}){
      return RoleService.roles().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    findPermission({commit}){
      return RoleService.getPermiss().then(
        response => {
          commit("PERMISSIONS",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},role){
      return RoleService.add(role).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('role/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},role){
      return RoleService.update(role).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('role/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.roles = response;
    },
    PERMISSIONS(state,response){
      state.permissions = response;
    },
    ADD_SUCCESS(state, response) {
      state.error = "";
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      state.error = error;
    },
    UPDATE_SUCCESS(state, response) {
      state.error = "";
      state.success = response;
    },
    UPDATE_FAIL(state,error) {
      state.error = error;
    },
  },
  getters:{
    fetch:(state) => state.roles,
    getPermissions:(state) => state.permissions,
    errors:(state) => store.state.errors,
    error:(state) => state.error
  }
};
