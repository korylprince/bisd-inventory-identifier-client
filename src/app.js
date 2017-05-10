import "./style/app.styl";

import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

import mainComponent from "./components/main.vue";

var Main = Vue.extend(mainComponent);
new Main().$mount("#app");
