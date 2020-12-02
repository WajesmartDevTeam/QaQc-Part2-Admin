<template>
  <div class="content">
    <div class="md-layout">

      <div
        v-if="updateView== false"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title"> MVR Action Tasks</h4>
          </md-card-header>
          <!-- <md-card-content
            v-if="no_action == false"
            style="height: 500px;
           overflow-y: auto;"
           >
            <md-table
              v-model="action_plans"
              table-header-color="orange"
              md-sort="status"
              md-card
              md-sort-order="asc"
            >
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="S/N">{{
                  action_plans.indexOf(item) + 1
                }}</md-table-cell>
                <md-table-cell md-label="Task">{{
                  item.task
                }}</md-table-cell>
                <md-table-cell md-label="Store Name">{{
                  item.store
                }}</md-table-cell>
                <md-table-cell md-label="Assigned To">{{
                  item.assigned_to
                }}</md-table-cell>
                <md-table-cell
                  :class="item.status_color"
                  md-label="status"
                  md-sort-by="status"
                >{{
                  item.status
                }}</md-table-cell>
                <md-table-cell md-label=" Start Date">{{
                  item.Assigned_date
                }}</md-table-cell>
                <md-table-cell md-label=" Due Date">{{
                  item.due_date
                }}</md-table-cell>
                <md-table-cell
                  v-if="role=='storeManager'"
                  md-label="Action"
                >
                  <md-button
                    class="md-raised md-warning"
                    @click="edit(item.form_id, item.questionno)"
                  >
                    <md-icon>edit</md-icon><span>update</span>
                  </md-button>
                </md-table-cell>

              </md-table-row>
            </md-table>
          </md-card-content> -->

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
                :data="action_plans"
                :filter-by="table_filter"
                name="table_table"
              >
                <template scope="{ row }">
                  <tr>
                    <td>{{ action_plans.indexOf(row) + 1 }}</td>
                    <td>{{ row.task }}</td>
                    <td>{{ row.store }}</td>
                    <td>{{ row.assigned_to }}</td>
                    <td>{{ row.Assigned_date }}</td>
                    <td>{{ row.due_date }}</td>
                    <td :class="row.status_color">{{ row.status }}
                      <span
                        v-if="role=='storeManager'"
                        title="update status"
                        @click="edit(row.id)"
                      >
                        <md-icon
                          style="font-size:10px"
                          class="text-warning"
                        >edit</md-icon>
                      </span>
                    </td>

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
          <div class="container-fluid">

            <!-- Table List -->
            <div
              v-if="listusers"
              class="row"
            >
              <div class="col-md-12">
                <md-card>

                </md-card>
              </div>
            </div>
            <div
              v-else
              class="row justify-content-center"
            >
              <div class="col-md-8">
                <md-card>

                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item ml-4 bg-warning">
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

          <md-card-content
            v-if="no_action"
            style="width:100%"
          >
            <img
              src="@/assets/img/no-data.png"
              alt=""
            >
          </md-card-content>

        </md-card>
      </div>
      <div
        v-if="updateView == true"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >

        <md-card class="W-50">
          <md-card-header data-background-color="blue">
            <h4 class="title"> Update AM MVR Task Status</h4>
          </md-card-header>
          <md-card-content>
            <form>

              <md-field>
                <label for="status">Select New Status</label>
                <md-select
                  v-model="update.status"
                  name="status"
                  id="status"
                  required
                >
                  <md-option value="pending">Pending</md-option>
                  <md-option value="ongoing">On going</md-option>
                  <md-option value="completed">Completed</md-option>
                </md-select>
              </md-field>

              <md-button
                @click="updateStatus"
                class="md-raised md-info"
              >Update</md-button>
            </form>

          </md-card-content>
        </md-card>
      </div>

    </div>
  </div>

</template>

<script>
// import { StatsCard } from "@/components";

export default {
  // components: {
  //   StatsCard
  // },
  data () {
    return {
      no_action: false,
      role: "",
      storeId: "",
      updateView: false,
      selectedPeriod: 5000,
      action_plans: [],
      update: {},

      listusers: true,
      table_filter: "",
      page: 1,
      per_page: 10,
      table_columns: [
        { label: "S/N", field: "id", sortable: true, filterable: false },
        { label: "Task", field: "task", sortable: true, filterable: true },
        { label: "Store Name", field: "store", sortable: true, filterable: true },
        { label: "Assigned To", field: "assigned_to", sortable: true, filterable: true },
        { label: "Start Date", field: "Assigned_date", sortable: true, filterable: true },
        { label: "Due Date", field: "due_date", sortable: true, filterable: true },
        { label: "Status", field: "status", sortable: true, filterable: true },

      ],
    };
  },
  beforeCreate: function () {
    document.body.className.replace("home", "");
  },
  mounted () {
    this.role = this.$store.getters.role;
    console.log(this.role)
    if (this.role === "storeManager") {
      this.storeId = this.$store.getters.user_data.id;
      this.$store.dispatch("store_reports");
    }

    this.getTasks()
    this.searched = this.action_plans;

  },

  methods: {

    getTasks () {
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
        what: "action_plans",
        showLoader: "no"
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          response.data.forEach(e1 => {
            let stores = this.$store.getters.stores
            stores.forEach(e2 => {
              if (e2.id == e1.store_id) {
                e1.store = e2.address + ", " + e2.location
              }

            })
            if (e1.status == "ongoing") {
              e1.status_color = "text-warning"
            }
            else if (e1.status == "pending") {
              e1.status_color = "text-danger"
            }
            else {
              e1.status_color = "text-success"
            }

          })
          if (response.type == "action_plans") {
            // this.action_plans = response.data;
            if (this.role === "storeManager") {
              response.data.forEach(i => {
                // console.log(this.storeId)
                if (i.store_id == this.storeId) {
                  this.action_plans.push(i)
                }

              })
            }
            else {
              this.action_plans = response.data;
            }

            if (this.action_plans.length == 0) {
              this.no_action = true
            }
            // console.log(this.action_plans)

          }
        })
        .catch(e => {
          console.log(e);

        });
    },

    searchOnTable () {
      this.searched = this.searchByName(this.action_plans, this.search);
    },
    edit (task_id, questionno) {

      this.updateView = true;
      this.update.id = task_id;
      this.update.admin_id = this.storeId;

    },
    updateStatus () {
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

      var req = {
        what: "updateTask",
        data: this.update
      };

      this.$socket
        .editItem(req)
        .then(response => {
          if (response.type) {
            this.$swal.fire("Success", response.data.message, "success");
            location.reload();

          }
        })
        .catch(e => {
          console.log(e);
          this.$swal.fire("Error", e.message, "error");
        });


    },

  }
};
</script>
<style>
div.md-toolbar-row {
  display: flex;
}
.info .md-card {
  height: 135px;
}
.md-card img {
  /* height: 100px !important;
  width: 177px !important; */
  margin-left: 3rem !important;
}
.md-card .md-card-actions .stats span {
  line-height: 22px;
  color: #999999;
  font-size: 20px;
  font-weight: bold;
  margin: 10% 45%;
}
</style>
