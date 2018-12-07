import "vuetify/dist/vuetify.min.css"

import Vue from "vue"
import Vuetify from "vuetify"
import colors from "vuetify/es5/util/colors"

Vue.use(Vuetify, {
    theme: {
        primary: colors.blue.base,
        secondary: colors.red.base,
        accent: colors.red.accent2,
        error: colors.red.base,
        warning: colors.yellow.base,
        info: colors.blue.base,
        success: colors.green.base,
    },
})

import mainComponent from "./components/main.vue"

const Main = Vue.extend(mainComponent)
new Main().$mount("#app")
