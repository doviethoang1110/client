import Option_valueService from './option_value.service';
export const option_value = {
  namespaced:true,
  state:{
    option_values:[],
  },
  actions:{
    findAll({commit}){
      return Option_valueService.option_values().then(
        response => {
          commit("FETCH",response);
          return Promise.resolve(response);
        },
      )
    }
  },
  mutations: {
    FETCH(state, response) {
      state.option_values = response;
    }
  },
  getters:{
    fetch:(state) => state.option_values,
  }
};
