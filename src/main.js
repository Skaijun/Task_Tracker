import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "materialize-css/dist/js/materialize.min.js";
// import './registerServiceWorker'
// npm install materialize-css@next

Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
