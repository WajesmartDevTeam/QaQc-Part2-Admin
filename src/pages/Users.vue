<template>
  <div class="container-fluid">

    <!-- Table List -->
    <div
      v-if="listusers"
      class="row"
    >
      <div class="col-md-12">
        <md-card>
          <md-card-header data-background-color="orange">
            <div class="d-flex justify-content-between">
              <h4 class="card-title">Users list</h4>

              <div class="float-right">
                <span
                  @click="listusers = false; edit = false;"
                  style="cursor: pointer"
                  title="Add Users"
                  class="fa fa-plus-square fa-2x"
                ></span>
              </div>
            </div>
          </md-card-header>

          <md-card-content>

            <div class="table-responsive">
              <input
                type="text"
                class="form-control"
                v-model="table_filter"
                placeholder="Search..."
              />
              <datatable
                :columns="table_columns"
                :data="users"
                :filter-by="table_filter"
                name="table_table"
              >
                <template scope="{ row }">
                  <tr>
                    <td>{{ users.indexOf(row) + 1 }}</td>
                    <td>{{ row.firstName }}</td>
                    <td>{{ row.lastName }}</td>
                    <td>{{ row.email }}</td>
                    <!-- <td>{{ row.phone }}</td> -->
                    <td>{{ row.role }}</td>
                    <!-- <td>

                      <i
                        @click="editUser(row)"
                        class="fa fa-edit"
                      ></i>
                      <i
                        @click="deleteUser(row.id)"
                        class="fa fa-trash"
                      ></i>

                    </td> -->
                  </tr>
                </template>
              </datatable>
              <div
                class=""
                style="text-align: center;"
              >
                <datatable-pager
                  v-model="page"
                  type="long"
                  :per-page="per_page"
                  table="table_table"
                ></datatable-pager>
              </div>
            </div>

          </md-card-content>
        </md-card>
      </div>
    </div>
    <!-- Form Field -->
    <div
      v-else
      class="row justify-content-center"
    >
      <div class="col-md-8">
        <md-card>
          <md-card-header data-background-color="orange">
            <div class="d-flex justify-content-between">
              <div>
                <h4 class="card-title">{{ edit ? 'Edit' : 'Add' }} User</h4>
                <p
                  v-if="!edit"
                  class="card-category"
                >Input all user information</p>
              </div>
              <i
                @click="listusers = true;"
                style="cursor: pointer"
                title="Close"
                class="material-icons"
              >close</i>
            </div>

          </md-card-header>
          <md-card-content>
            <form v-on:submit.prevent="addUser">

              <md-card-content>
                <div class="md-layout">
                  <!-- <div
                    class="md-layout-item md-small-size-100 md-size-100"
                    v-if="edit"
                  >
                    <div class="form-group">

                      <md-field>
                        <label>User Id</label>
                        <md-input
                          :readonly="edit"
                          id="userid"
                          v-model="user.id"
                        ></md-input>
                      </md-field>
                    </div>
                  </div> -->
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>First Name</label>
                      <md-input
                        v-model="user.firstName"
                        required
                      ></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Last Name</label>
                      <md-input
                        v-model="user.lastName"
                        required
                      ></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Email</label>
                      <md-input
                        type="email"
                        v-model="user.email"
                        required
                      ></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label>Phone</label>
                      <md-input
                        type="number"
                        v-model="user.phone"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-field>
                      <label for="role">Role</label>
                      <md-select
                        v-model="user.role"
                        name="role"
                        id="role"
                        required
                      >
                        <md-option value="superAdmin">Super Admin</md-option>
                        <md-option value="storeManager">Store Manager</md-option>
                      </md-select>
                    </md-field>
                  </div>
                  <div
                    v-if="user.role == 'storeManager'"
                    class="md-layout-item md-small-size-100 md-size-100"
                  >
                    <md-field>
                      <label for="store">Store</label>
                      <md-select
                        v-model="user.storeId"
                        name="store"
                        id="store"
                      >
                        <md-option
                          v-for="store in stores"
                          v-bind:key="store.id"
                          v-bind:value="store.id"
                        >{{store.address +", "+ store.location}}</md-option>

                      </md-select>
                    </md-field>
                  </div>
                  <div
                    v-if="edit == false"
                    class="md-layout-item md-small-size-100 md-size-100"
                  >
                    <md-field>
                      <label>Password</label>
                      <md-input
                        v-model="user.password"
                        type="password"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <span
                    v-show="status.status !== ''"
                    v-bind:class="{
        'text-danger': status.status == 'Error'
      }"
                  > {{ status.message }}</span>
                  <div
                    v-if="edit == false"
                    class="md-layout-item md-small-size-100 md-size-100"
                  >
                    <md-field>
                      <label>Confirm Password</label>
                      <md-input
                        v-model="cpassword"
                        type="password"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div
                    v-if="edit == false"
                    class="md-layout-item md-size-100 "
                  >
                    <button class="btn md-raised md-size-100">Register</button>
                  </div>
                  <div
                    v-if="edit == true"
                    class="md-layout-item md-size-100 "
                  >
                    <button class="btn md-raised md-size-100">Update User</button>
                  </div>
                </div>
              </md-card-content>

            </form>
          </md-card-content>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item ml-4">
                <span
                  style="cursor: pointer"
                  @click="listusers = true"
                >View list</span>
              </li>
            </ul>
          </nav>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      listusers: true,
      edit: false,
      table_filter: "",
      page: 1,
      per_page: 10,
      table_columns: [
        { label: "ID", field: "id", sortable: true, filterable: false },
        { label: " First Name", field: "first_name", sortable: true, filterable: true },
        { label: " Last Name", field: "last_name", sortable: true, filterable: true },
        { label: "email", field: "email", sortable: true, filterable: true },
        { label: "Role", field: "role", sortable: true, filterable: true },
      ],

      users: [],
      user: {
        storeId: ""
      },
      cpassword: "",

      status: {
        status: "",
        message: ""
      },
      stores: [],
      page_url: null
    };
  },
  mounted () {
    this.stores = this.$store.getters.stores
  },
  watch: {
    cpassword: function (val) {
      //do something when the data changes.
      if (val !== this.user.password) {
        this.status.status = "Error";
        this.status.message = "password and confirm password fields mismatch";
      }
      else {
        this.status.status = "Success";
        this.status.message = "";
      }
    }
  },

  created () {
    this.fetchUsers();
    this.searched = this.users;
  },

  methods: {
    searchOnTable () {
      this.searched = searchByName(this.users, this.search);
    },
    fetchUsers () {

      var html =
        '<img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/>';

      this.$swal.fire({
        title: "Processing",
        html: html,
        showConfirmButton: false,
        showCancelButton: false,
        width: "380px",
        allowOutsideClick: false
      });

      var recent = {
        what: "users",
        showLoader: "yes",

      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "users") {

            this.users = response.data
            // this.$swal.fire("Success", response.data.message, "success");
          }
        })
        .catch(e => {
          console.log(e);
          this.$swal.fire("Error", e.message, "error");
        });
    },
    addUser () {
      var html =
        '<img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/>';

      this.$swal.fire({
        title: "Processing",
        html: html,
        showConfirmButton: false,
        showCancelButton: false,
        width: "380px",
        allowOutsideClick: false
      });
      if (this.edit == false) {
        var recent = {
          what: "register",
          data: this.user
        };

        this.$socket
          .makePostRequest(recent)
          .then(response => {
            if (response.type) {
              this.$swal.fire("Success", response.data.message, "success");
              location.reload();

            }
          })
          .catch(e => {
            console.log(e)
            this.$swal.fire("Error", e.message, "error");
          });
      }
      else {
        var recent = {
          what: "edit",
          data: this.user
        };

        this.$socket
          .editItem(recent)
          .then(response => {
            console.log(response);
            if (response.type) {
              this.$swal.fire("Success", response.data.message, "success");
              location.reload();

            }
          })
          .catch(e => {
            console.log(e);
            this.$swal.fire("Error", e.message, "error");
          });
      }



    },
    deleteUser (id) {
      var html =
        '<img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/>';

      this.$swal.fire({
        title: "Processing",
        html: html,
        showConfirmButton: false,
        showCancelButton: false,
        width: "380px",
        allowOutsideClick: false
      });
      if (confirm("Are you sure?")) {
        var req = {
          what: "delete",
          params: {
            id: id
          }
        }

        this.$socket
          .makeDeleteRequest(req)
          .then(response => {
            if (response.type) {
              this.$swal.fire("Success", response.message, "success");
              this.fetchUsers();

            }
          })
          .catch(e => {
            console.log(e);
            this.$swal.fire("Error", e.message, "error");
          });

      }
    },

    editUser (user) {
      this.edit = true;
      this.listusers = false;
      // this.user.id = user.id;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.phone = user.phone;
      this.user.email = user.email;
      // this.user.role = user.role;
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
.fa {
  font-size: 20px;
}
.fa-trash {
  color: red;
}
.fa-edit {
  color: orange;
}
</style>
