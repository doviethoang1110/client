import store from "../../store";
import BlogService from './blog.service';

export const blog = {
  namespaced:true,
  state:{
    blogs:[],
    errors:[],
    totalPage:0
  },
  actions:{
    findAll({commit},page){
      return BlogService.blogs(page).then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    },
    add({commit},blog){
      return BlogService.add(blog).then(
        response => {
          commit("ADD_SUCCESS",response);
          store.dispatch('blog/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("ADD_FAILURE",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    update({commit},blog){
      return BlogService.add(blog).then(
        response => {
          commit("UPDATE_SUCCESS",response);
          store.dispatch('blog/findAll',0);
          return Promise.resolve(response);
        },
        error => {
          commit("UPDATE_FAIL",error.response.data.data);
          return Promise.reject(error);
        }
      )
    },
    delete({commit},id){
      return BlogService.delete(id).then(
        response =>{
          commit("DELETE",response);
          store.dispatch("blog/findAll");
          return Promise.resolve(response);
        }
      )
    },
  },
  mutations: {
    FETCH(state, response) {
      state.blogs = response.listBlogs;
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
    fetch:(state) => state.blogs,
    totalPage:(state) => state.totalPage,
    errors:(state) => state.errors
  }
};
