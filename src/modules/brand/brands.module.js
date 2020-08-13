import BrandService from './brands.service';
import store from '../../store';

export const brand = {
  namespaced:true,
  state:{
    brands:[],
    allBrands:[],
    errors:[],
    one:null,
    edit:null,
    totalPage:0
  },
  actions:{
    getAll({commit}){
      return BrandService.getAll().then(
        response => {
          commit("FETCH_ALL",response);
          return Promise.resolve(response);
        },
      )
    },
    findAll({commit},page){
      return BrandService.brands(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    findOne({commit},id){
      return BrandService.findOne(id).then(
        response => {
          commit("FETCHONE",response);
          return Promise.resolve(response);
        }
      )
    },
    add({commit},brand){
      return BrandService.add(brand).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('brand/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},brand){
      return BrandService.add(brand).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('brand/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    edit({commit},id){
        return BrandService.findOne(id).then(
          response =>{
            commit("EDIT",response);
            return Promise.resolve(response);
          }
        )
    },
    delete({commit},slug){
      return BrandService.delete(slug).then(
        response =>{
          console.log(response)
          commit("DELETE",response);
          store.dispatch("brand/findAll",0);
          return Promise.resolve(response);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.brands = response.listBrands;
      state.totalPage = response.totalPage;
    },
    FETCH_ALL(state,response){
      state.allBrands = response;
    },
    FETCHONE(state, response) {
      state.one = response;
    },
    ADD_SUCCESS(state, response) {
      store.state.errors = [];
      state.errors = [];
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      store.state.errors = error;
      state.errors = error;
    },
    UPDATE_SUCCESS(state, response) {
      store.state.errors = [];
      state.errors = [];
      store.state.success = response;
    },
    UPDATE_FAIL(state,error) {
      store.state.errors = error;
      state.errors = error;
    },
    EDIT(state,response){
      state.edit = response;
    },
    DELETE(state,response){
      store.state.success = response;
    },
  },
  getters:{
    fetch:(state) => state.brands,
    fetchAll:(state) => state.allBrands,
    fetchOne:(state) => state.one,
    totalPage:(state) => state.totalPage,
    error:(state) => store.state.errors,
    errors:(state) => state.errors,
    edit:(state) => state.edit
  }
};
