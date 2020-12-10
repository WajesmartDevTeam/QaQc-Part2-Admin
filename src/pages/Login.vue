<template>
  <div id="login">

  </div>
</template>


<script>
export default {
  name: "login",
  data () {
    return {
      type: 'A',
      remember: "",
      login: {
        email: "",
        password: ""
      },
      status: {
        status: "",
        message: ""
      },
      myMSALObj: null,
      msalConfig: {
        auth: {
          clientId: 'dfd74765-cfab-4e7f-bdcb-c619d600dfee', //This is your client ID
          authority: "https://login.microsoftonline.com/ce18dbbe-5ce8-4dac-bbcc-874dba4c0a40",
          // postLogoutRedirectUri: "https://qaqc.sundryhrms.website/"
          postLogoutRedirectUri: "https://qaqc-admin.marketsquareng.website/",
        }
      },
      graphConfig: {
        graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
        // graphMeEndpoint: "https://graph.microsoft.com/v1.0/groups/e360bff7-b072-46b5-b3c3-642716ebf740/members"
        
      },
      requestObj: {
        scopes: ["group.read.all"]
      }
    };
  },
  beforeCreate: function () {
    document.body.className = 'home';
  },
  created () {
    let msal = document.createElement('script')
    msal.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js')
    document.head.appendChild(msal)

    let aadcdn = document.createElement('script')
    aadcdn.setAttribute('src', 'https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/msal.js')
    document.head.appendChild(aadcdn)
  },
  mounted () {

    this.myMSALObj = new Msal.UserAgentApplication(this.msalConfig);
    // Register Callbacks for redirect flow
    // myMSALObj.handleRedirectCallbacks(acquireTokenRedirectCallBack, acquireTokenErrorRedirectCallBack);
    this.myMSALObj.handleRedirectCallback(this.authRedirectCallBack);
    if (this.$store.getters.logout == true) {
      this.signOut();
      // location.reload()
    }
    else {
      let that = this

      setTimeout(function () {
        that.signIn();
      },
        500);
    }
  },
  methods: {
    async signIn () {
      var html =
        '<img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/>';
      this.$swal.fire({
        title: "Processing",
        html: html,
        showConfirmButton: false,
        showCancelButton: false,
        width: "300px",
        allowOutsideClick: false
      });
     
      try {
        const loginResponse = await this.myMSALObj.loginPopup(this.requestObj);
        // this.showWelcomeMessage();
        this.acquireTokenPopupAndCallMSGraph();
      } catch (ex) {
        console.log(ex);
        this.$swal.close();
        let message = '<p>' + ex.message + '</p> ';
        if(ex.message.includes('pop') ) {
          message += "<p>Allow Pop Ups for this domain at the top right of the url bar in your browser and then refresh this page</p>";
        }
        this.$swal.fire({
          title: "Opps !",
          html: message,
          showConfirmButton: false,
          showCancelButton: false,
          width: "300px",
          allowOutsideClick: false
        });
      }
    },

    signOut () {
      this.$store.dispatch("loggedIn", false);
      this.$store.dispatch("logout", false);
      this.myMSALObj.logout();
      // this.type = "A"
      this.$router.push("index");

      // window.location.href = "https://qaqc.sundryhrms.website/"

    },
    async acquireTokenPopupAndCallMSGraph () {
      //Always start with acquireTokenSilent to obtain a token in the signed in user from cache
      try {
        const tokenResponse = await this.myMSALObj.acquireTokenSilent(this.requestObj);
        this.callMSGraph(this.graphConfig.graphMeEndpoint, tokenResponse.accessToken, this.graphAPICallback);
      } catch (ex) {
        console.log(ex);

      }
    },
    callMSGraph (theUrl, accessToken, callback) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
          callback(JSON.parse(this.responseText));
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous
      xmlHttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xmlHttp.send();
    },
    graphAPICallback (data) {
      console.log(data)
      let access = false;
      let role;
      data.value.forEach(i => {
        if (i.mailNickname == "storemanagers" || i.mailNickname == "superadmin") {
          this.$store.dispatch('loggedIn', true)
          access = true;
          role = i.mailNickname;
        }
      });
       if (access === true) {

        let user = {
          email: this.myMSALObj.getAccount().userName
        }
        //get storemanagers data
        if (role == "storemanagers") {
          this.$store.dispatch('role', "storeManager");
          this.$store.dispatch('login', user)
            .then((res) => {
              this.$swal.fire("Success", "Welcome " + this.myMSALObj.getAccount().name + "", "success");
              window.location.href = "admin/dashboard"
            })
            .catch((err) => {
              this.$swal.fire("Error", err.message, "error");
              this.$store.getters.logout == true
              this.signOut();
            })
        }
        else {
          this.$store.dispatch('role', "superAdmin")
          this.$swal.fire("Success", "Welcome " + this.myMSALObj.getAccount().name + "", "success");
          window.location.href = "admin/dashboard"
        }




      }
      else {
        this.$swal.fire({
          title: "Error",
          text: "User Access Denied. Contact your Admin to grant you access.",
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Sign Out',
          width: "300px",
          allowOutsideClick: false
        }).then(() => {
            this.$store.dispatch("logout", true);
            this.signOut();
            //location.reload();
          });

      }
     
    },
    showWelcomeMessage () {
      // this.$store.dispatch('email', this.myMSALObj.getAccount().userName);
      this.status = {
        status: "Success",
        message: "Welcome " + this.myMSALObj.getAccount().userName + " to QA/QC Audit. Redirecting in 3seconds..."
      }

      this.type = 'B';
    },
    authRedirectCallBack (error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.tokenType === "access_token") {
          this.callMSGraph(this.graphConfig.graphMeEndpoint, response.accessToken, this.graphAPICallback);
        } else {
          console.log("token type is:" + response.tokenType);
        }
      }
    },
    requiresInteraction (errorCode) {
      if (!errorCode || !errorCode.length) {
        return false;
      }
      return errorCode === "consent_required" ||
        errorCode === "interaction_required" ||
        errorCode === "login_required";
    },
  }

};
</script>

<style>
body.home {
  height: 100%;
  min-height: 35rem;
  position: relative;
  font-family: "Source Sans Pro";
  font-weight: 300;
  background-image: url(https://qualityinspection.org/wp-content/uploads/2011/11/whatistheAQL.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
<style scoped>
div.md-toolbar-row {
  display: none !important;
}
#login {
  padding: 10% 0;
}
#login form {
  width: 380px;
  margin: auto;
}
#SignIn:hover {
  box-shadow: 1px 4px 8px grey;
}
@media screen and (max-width: 320px) {
  #login form {
    width: 320px;
    margin: auto;
  }
}
.logo-holder {
  width: 130px !important;
}
.logo-holder img {
  width: 100% !important;
  margin: 0 auto;
}
.alert {
  width: 50%;
  margin: auto;
}
.btn {
  color: #fff;
  background: #fd950d;
  outline: none;
  border: none;
}

button:hover {
  cursor: pointer;
  animation: jelly 0.5s;
}

@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
