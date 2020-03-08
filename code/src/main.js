import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@utils/global.js';
import '@/permission.js';
Vue.use(Antd);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$backEnd = 'http://localhost:3000';
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
