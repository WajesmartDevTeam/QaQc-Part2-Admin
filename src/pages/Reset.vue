<template>
  <div id="reset">
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
    <form v-on:submit.prevent="processReset">
      <md-card>
        <md-card-header data-background-color="orange">
          <h4 class="title">Password Reset</h4>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Email</label>
                <md-input
                  v-model="reset.email"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Old Password</label>
                <md-input
                  v-model="reset.old_password"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>New Password</label>
                <md-input
                  v-model="reset.new_password"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Confirm Password</label>
                <md-input
                  v-model="reset.confirm_password"
                  type="password"
                  required
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">

              <a
                style="color: #fc940c!important;float: right;"
                href="/login"
              >Go to Login Page</a>
            </div>

            <div class="md-layout-item md-size-100 ">
              <button class="btn md-raised md-size-100">Reset Passwword</button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>
<script>
export default {
  name: "reset",
  data () {
    return {
      reset: {
        email: "",
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      status: {
        status: "",
        message: ""
      }
    };
  },
  methods: {
    processReset () {
      this.status.status = "Processing";
      var req = {
        what: "reset",
        data: reset
      };

      this.$socket
        .makePostRequest(req)
        .then(response => {
          if (this.$store.getters.isLoggedIn) {
            this.status.status = "Success";
            this.status.message = "reset successful, redirecting...";
            window.location.href = "/login";
          }
        })
        .catch(err => {
          this.status.status = "Error";
          this.status.message = "Invalid reset details";

          setTimeout(() => {
            this.status.status = "";
          }, 3000);
        });
    }
  }
};
</script>
<style scoped>
div.md-toolbar-row {
  display: none !important;
}
#reset {
  padding: 5% 0;
}
#reset form {
  width: 380px;
  margin: auto;
}
@media screen and (max-width: 320px) {
  #reset form {
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
