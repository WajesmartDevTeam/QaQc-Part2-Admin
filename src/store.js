import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        loggedIn: "",
        logOut: false,
        role: "",
        stores: [],
        store_reports: {}
    },

    mutations: {
        userData(state, user) {
            state.user = user;
        },

        updateLogin(state, status) {
            state.loggedIn = status
        },
        updateLog(state, status) {
            state.logOut = status
        },
        updateRole(state, role) {
            state.role = role;
        },
        updateStores(state, stores) {
            state.stores = stores
        },
        updateStoreReport(state, reports) {
            state.store_reports = reports
        }
    },

    actions: {
        login({ commit, dispatch }, user) {
            return new Promise((resolve, reject) => {
                var request = {
                    what: "login",
                    data: user
                };

                Vue.prototype.$socket
                    .makePostRequest(request)

                .then(response => {
                        if (response.type == "login") {
                            commit("userData", response.data.data.userDetails);
                            commit("updateLogin", true);

                            if (this.state.role == "storeManager") {
                                this.dispatch("store_reports");
                                resolve(response.data.data.userDetails);
                            }
                            // console.log(response.data.data.userDetails)

                        } else {
                            commit("updateLogin", false);
                            reject("error");
                        }
                    })
                    .catch(error => {
                        commit("updateLogin", false);
                        reject(error);
                        console.log(error);
                    });
            });
        },
        role({ commit }, role) {
            commit("updateRole", role);
        },
        loggedIn({ commit }, data) {
            commit("updateLogin", data);
        },

        stores({ commit }) {
            return new Promise((resolve, reject) => {
                var request = {
                    what: "stores",
                    showLoader: "no",
                    params: {
                        store_code: "KJ"
                    }
                };

                Vue.prototype.$socket
                    .makeGetRequest(request)

                .then(response => {
                        if (response.type == "stores") {
                            commit("updateStores", response.data);
                            resolve(response.data)
                        } else {
                            reject("error");
                        }
                    })
                    .catch(error => {
                        reject(error);
                        console.log(error);
                    });
            });
        },
        store_reports({ commit }) {
            return new Promise((resolve, reject) => {
                var request = {
                    what: "store_reports",
                    showLoader: "no",
                    params: {
                        storeId: this.state.user.storeId,
                        searchString: 5000
                    }
                };

                Vue.prototype.$socket
                    .makeGetRequest(request)

                .then(response => {
                        if (response.type == "store_reports") {
                            commit("updateStoreReport", response.data);
                            resolve(response)
                        } else {
                            reject("error");
                        }
                    })
                    .catch(error => {
                        reject(error);
                        console.log(error);
                    });
            });
        },

        logout({ commit }, status) {
            commit("userData", {});
            commit("updateLogin", false);
            commit("updateRole", "");
            commit("updateStores", []);
            commit("updateStoreReport", []);
            commit("updateLog", status)
        }
    },

    getters: {
        isLoggedIn: state => state.loggedIn,
        user_data: state => state.user,
        role: state => state.role,
        stores: state => state.stores,
        store_reports: state => state.store_reports,
        logout: state => state.logOut
    },

    plugins: [createPersistedState()]
});