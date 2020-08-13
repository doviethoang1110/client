import OptionService from './option.service';
export const option = {
  namespaced:true,
  state:{
    options:[],
  },
  actions:{
    findAll({commit}){
      return OptionService.options().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    }
  },
  mutations: {
    FETCH(state, response) {
      state.options = response;
    }
  },
  getters:{
    fetch:(state) => state.options,
  }
};
