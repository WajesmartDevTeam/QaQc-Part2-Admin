import axios from "axios";
import Vue from "vue";
import store from "./store";

// const URL = "https://qa.sundryhrms.website/api/";
const URL = "http://localhost:8000/api/";

export default {
    name: "Request",

    makeGetRequest: request => {
        Vue.prototype.$swal.close();

        if (request.showLoader == undefined) {
            var loading_html =
                '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://i.ya-webdesign.com/images/minimalist-transparent-loading-gif-6.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }

        var request_urls = {
            //openings: 'listappliedjobposting',
            scoredreportview: "getFullReport",
            nonscoredreportview: "getFullReportNonScoring",
            total_reports: "getTotalFormsforSuperAdmin",
            action_plans: "actionPlans",
            stores: "allstores",
            store_reports: "getFormsAndVisitsStats",
            ammvr_compliance: "amvrCompliance",
            ammvr: "amvrreport",
            am: "AMVRvisitsAndNonVisits",
            mid: "MidAMVRvisitsAndNonVisits",
            amvrCompliance: "MVRdailyVisitationCount",
            midmvrCompliance: "MVRdailyVisitationCount",
            foodsafetyCompliance: "FoodSafetyCompliance",
            openingsoa: "openingsoAMReport",
            foodsafety: "foodsafetyReport",
            fsVisit: "KrssvisitsAndNonVisits",
            greenbook: "greenbookReport",
            greenbookCompliance: "dailyVisitationCount",
            redbookCompliance: "dailyVisitationCount",
            gb: "GbvisitsAndNonVisits",
            middaymvr: "midamvreport",
            middaymvr_compliance: "midamvrCompliance",
            middaysoa: "closingsoReport",
            redbook: "redbookReport",
            rb: "RbvisitsAndNonVisits",
            users: "AdminUser",
            ammvrview: "getAmvrformbyid",
            openingsoaview: "getsoformbyid",
            foodsafetyview: "getkrssFormsById",
            greenbookview: "getgreenbookFormsById",
            middaymvrview: "getMiddayreport",
            middaysoaview: "getSoPmFormsById",
            redbookview: "getredbookFormsById",
            graphapi: "https://graph.microsoft.com/v1.0/me/memberOf"



        };

        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return key + "=" + obj[key];
                })
                .join("&");
            var request_url = URL + request_urls[request.what] + "?" + str;


        } else if (request.type == "graphapi") {
            var request_url = request_urls[request.what];
        } else {
            var request_url = URL + request_urls[request.what];
        }

        console.log(
            "%cSending get request to: " + "%c" + request_url,
            "color:#00ff00;font-size:14px;background:#000;",
            "color:#ff0000;font-size:14px;background:#000;"
        );

        return new Promise((resolve, reject) => {
            axios
                .get(request_url)
                .then(response => {
                    Vue.prototype.$swal.close();

                    if (
                        response.data.status == "True" ||
                        response.data.status == true ||
                        response.data.status == "true"
                    ) {
                        var response = {
                            data: response.data.data,
                            type: request.what,
                            images: response.data.images,
                            status: "true",
                            url: URL
                        };

                        resolve(response);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    makePostRequest: request => {
        Vue.prototype.$swal.close();

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:200px;width:200px;margin: 0 auto;"><img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });


        }


        var request_urls = {
            login: "authentication",
            register: "createSA",
            reset: "reset"
        };

        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return key + "=" + obj[key];
                })
                .join("&");
            var request_url = URL + request_urls[request.what] + "?" + str;
        } else {
            var request_url = URL + request_urls[request.what];
        }

        if (request.url == undefined) {
            var request_url = URL + request_urls[request.what];
        } else {
            var request_url = request.url;
        }

        if (request.headers !== undefined) {
            var config = {
                headers: request.headers
            };
        } else {
            var config = {};
        }

        var data = request.data !== undefined ? request.data : "";

        console.log(
            "%cSending post request to: " + request_url,
            "color:#00ff00;font-size:14px;background:#000;"
        );
        // console.log(data);

        return new Promise((resolve, reject) => {
            axios
                .post(request_url, data, config)
                .then(response => {
                    Vue.prototype.$swal.close();

                    if (
                        response.data.status == "True" ||
                        response.data.status == true ||
                        response.data.status == "true"
                    ) {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true",
                            url: URL
                        };

                        resolve(response);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(err => {
                    Vue.prototype.$swal.close();
                    reject(err);
                });
        });
    },

    editItem: (request) => {

        console.log('%cSending put request: ', 'color:#fff;font-size:14px;background:#00ff00;')



        // if (request.useToken || request.useToken == undefined) {
        //     var token = store.getters.token
        //     request.headers = {
        //         'Authorization': 'Bearer ' + token
        //     }
        // }

        Vue.prototype.$swal.close();

        if (request.showLoader || request.showLoader == undefined) {
            var loading_html =
                '<div style="height:150px;width:150px;margin: 0 auto;"><img style="width: 100%;" src="https://i.ya-webdesign.com/images/minimalist-transparent-loading-gif-6.gif" /></div>';

            Vue.prototype.$swal.fire({
                title: "",
                html: loading_html,
                showConfirmButton: false,
                showCancelButton: false
            });
        }

        var request_urls = {
            edit: "AdminUser/4354642",
            updateTask: "updateTask"
        };

        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return key + "=" + obj[key];
                })
                .join("&");
            var request_url = URL + request_urls[request.what] + "?" + str;
        } else {
            var request_url = URL + request_urls[request.what];
        }

        if (request.url == undefined) {
            var request_url = URL + request_urls[request.what];
        } else {
            var request_url = request.url;
        }

        if (request.headers !== undefined) {
            var config = {
                headers: request.headers
            };
        } else {
            var config = {};
        }

        var data = request.data !== undefined ? request.data : "";

        console.log(
            "%cSending post request to: " + request_url,
            "color:#00ff00;font-size:14px;background:#000;"
        );
        console.log(data);

        return new Promise((resolve, reject) => {
            axios
                .put(request_url, data, config)
                .then(response => {
                    Vue.prototype.$swal.close();

                    if (
                        response.data.status == "True" ||
                        response.data.status == true ||
                        response.data.status == "true"
                    ) {
                        response = {
                            data: response.data,
                            type: request.what,
                            status: "true",
                            url: URL
                        };

                        resolve(response);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(err => {
                    Vue.prototype.$swal.close();
                    reject(err);
                });
        });


    },

    makeDeleteRequest: request => {
        var what = request.what;

        var request_urls = {
            delete: "AdminUser"
        };

        if (request.params !== undefined) {
            var obj = request.params;
            var str = Object.keys(obj)
                .map(key => {
                    return obj[key];
                })

            var request_url = URL + request_urls[request.what] + "/" + str;
        } else {
            var request_url = URL + request_urls[request.what];
        }
        // console.log(request_url)
        // if (request.url == undefined) {
        //     var request_url = URL + request_urls[request.what];
        // } else {
        //     var request_url = request.url;
        // }

        if (request.headers !== undefined) {
            var config = {
                headers: request.headers
            };
        } else {
            var config = {};
        }




        console.log(
            "%cDeleting: " + request_url,
            "color:#00ff00;font-size:14px;background:#000;"
        );

        return new Promise((resolve, reject) => {
            axios
                .delete(request_url)
                .then(response => {
                    //console.log(response.data.success)
                    if (
                        response.data.status == "True" ||
                        response.data.status == true ||
                        response.data.status == "true" ||
                        response.data.success == true
                    ) {
                        response = {
                            type: what,
                            status: "true",
                            url: URL
                        };

                        resolve(response);
                    } else {
                        reject("Error");
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};