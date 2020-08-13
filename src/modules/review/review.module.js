import store from "../../store";
import ReviewService from './review.service';

export const review = {
  namespaced:true,
  state:{
    reviews:[],
    totalPage:0
  },
  actions:{
    findAll({commit},page){
      return ReviewService.reviews(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    update({commit},review){
      return ReviewService.update(review).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('review/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    delete({commit},id){
      return ReviewService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("review/findAll",0);
          return Promise.resolve(response);
        }
      )
    },
    multidelete({commit},ids) {
      return ReviewService.multidelete(ids).then(
        response => {
          commit("MULTI_DELETE",response);
          store.dispatch('review/findAll',0);
          return Promise.resolve(response);
        }
      )
    }
  },
  mutations: {
    FETCH(state, response) {
      state.reviews = response.listReviews;
      state.totalPage = response.totalPage;
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
    MULTI_DELETE(state,response){
      store.state.success = response;
    }
  },
  getters:{
    fetch:(state) => state.reviews,
    totalPage:(state) => state.totalPage,
    error:(state) => state.error
  }
};
