<template>
  <div id="login">
    <div
      class="alert"
      role="alert"
      v-show="status.status !== ''"
      v-bind:class="{
        'alert-danger': status.status == 'Error',
        'alert-warning': status.status == 'Processing',
        'alert-success': status.status == 'Success'
      }"
    >
      <strong>{{ status.status }}</strong> {{ status.message }}
    </div>
    <br />
    <br />
    <form v-on:submit.prevent="processRegister">
      <md-card>
        <md-card-header data-background-color="orange">
          <h4 class="title">Admin Register</h4>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Name</label>
                <md-input
                  v-model="register.name"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Email</label>
                <md-input
                  v-model="register.email"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Password</label>
                <md-input
                  v-model="register.password"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Confirm Password</label>
                <md-input
                  v-model="cpassword"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 ">
              <button class="btn md-raised md-size-100">Register</button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>
<script>
export default {
  name: "login",
  data () {
    return {
      cpassword: "",
      register: {
        name: "",
        email: "",
        password: ""
      },
      status: {
        status: "",
        message: ""
      }
    };
  },
  methods: {
    processRegister () {
      this.status.status = "Processing";

      var recent = {
        what: "register",
        data: this.register
      };

      this.$socket
        .makePostRequest(recent)
        .then(response => {
          if (response.type == "register") {
            this.status.status = "Success";
            this.status.message = "Registration successful, redirecting...";
            window.location.href = "/login";
          }
        })
        .catch(e => {
          this.status.status = "Error";
          this.status.message =
            "password and confirm password fields mismatch. Please Try Again!!!";
          setTimeout(() => {
            this.status.status = "";
          }, 3000);
        });
    }
  },
  watch: {
    cpassword: function (val) {
      //do something when the data changes.
      if (val !== this.register.password) {
        this.status.status = "Error";
        this.status.message = "password and confirm password fields mismatch";
      } else {
        this.status.status = "Processing";
        this.status.message = "";
      }
    }
  }
};
</script>
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
