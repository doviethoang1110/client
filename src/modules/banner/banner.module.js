import store from "../../store";
import BannerService from './banner.service';

export const banner = {
  namespaced:true,
  state:{
    banners:[],
    errors:[],
    totalPage:0
  },
  actions:{
    findAll({commit},page){
      return BannerService.banners(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},banner){
      return BannerService.add(banner).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('banner/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},banner){
      return BannerService.add(banner).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('banner/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    delete({commit},id){
      return BannerService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("banner/findAll");
          return Promise.resolve(response);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.banners = response.listBanner;
      state.totalPage = response.totalPage;
    },
    ADD_SUCCESS(state, response) {
      state.errors = [];
      store.state.success = response;
    },
    ADD_FAILURE(state,error) {
      state.errors = error;
    },
    UPDATE_SUCCESS(state, response) {
      state.errors = [];
      state.success = response;
    },
    UPDATE_FAIL(state,error) {
      state.errors = error;
    },
    DELETE(state,response){
      store.state.success = response;
    },
  },
  getters:{
    fetch:(state) => state.banners,
    totalPage:(state) => state.totalPage,
    errors:(state) => state.errors
  }
};
