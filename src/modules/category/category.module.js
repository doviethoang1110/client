import CategoryService from './category.service';
import store from '../../store';

export const category = {
  namespaced:true,
  state:{
    categories:[],
    one:null,
    edit:null
  },
  actions:{
    findAll({commit}){
      return CategoryService.categories().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},brand){
      return CategoryService.add(brand).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('category/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},category){
      return CategoryService.update(category).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('category/findAll');
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    edit({commit},slug){
      return CategoryService.findOne(slug).then(
        response =>{
          commit("EDIT",response);
          return Promise.resolve(response);
        }
      )
    },
    findOne({commit},slug){
      return CategoryService.findOne(slug).then(
        response => {
          commit("FETCHONE",response);
          return Promise.resolve(response);
        }
      )
    },
    delete({commit},id){
      return CategoryService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("category/findAll");
          return Promise.resolve(response);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.categories = response;
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
      store.state.errors = [];
      store.state.success = response;
    },
    UPDATE_FAIL(state,error) {
      store.state.errors = error;
    },
    DELETE(state,response){
      store.state.success = response;
    }
  },
  getters:{
    fetch:(state) => state.categories,
    errors:(state) => store.state.errors,
    fetchOne:(state) => state.one,
    edit:(state) => state.edit
  }
};
