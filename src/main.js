/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import swal from "sweetalert2";
import Request from "./request";

import "bootstrap";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import DatatableFactory from 'vuejs-datatable/dist/vuejs-datatable.esm.js';

// configure router
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$socket = Request;
Vue.prototype.$swal = swal;


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(
        record => record.meta.onlyWhenLoggedOut
    );
    const loggedIn = store.getters.isLoggedIn;
    if (!isPublic && !loggedIn) {
        return next({
            path: "/",
            query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
        });
    }



    next();
});

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(DatatableFactory);
Vue.use(BootstrapVue);


/* eslint-disable no-new */
new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store,
    data: {
        Chartist: Chartist
    }
});