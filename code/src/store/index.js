import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: sessionStorage.getItem('state')
        ? JSON.parse(sessionStorage.getItem('state'))
        : {
              userInfo: ''
          },
    mutations: {
        setUserInfo(state, value) {
            state.userInfo = value;
        }
    },
    actions: {},
    modules: {}
});
