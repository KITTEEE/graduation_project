import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state: sessionStorage.getItem('state')
        ? JSON.parse(sessionStorage.getItem('state'))
        : {
              userInfo: '',
              power: ''
          },
    mutations: {
        setUserInfo(state, value) {
            state.userInfo = value;
        },
        setPower(state, value) {
            state.power = value;
        }
    },
    actions: {
        getPower({ commit }, uid) {
            console.log(uid);
            return new Promise((reslove, reject) => {
                axios
                    .get(`http://localhost:3000/api/users/getPower?uid=${uid}`)
                    .then(res => {
                        console.log('getPower', res);
                        commit('setPower', res.data.data);
                        reslove();
                    })
                    .catch(err => {
                        console.log('getPower err', err);
                        reject(err);
                    });
            });
        }
    },
    modules: {}
});
