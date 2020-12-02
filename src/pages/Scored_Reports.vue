<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <md-field class="filter">
          <label for="font">Filter by month</label>

          <md-input
            type="month"
            v-model="selectedPeriod"
            required
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50">
        <br>
        <p style="float: right; font-weight: bold;">{{record_date}}</p>
      </div>
      <div
        v-if="role == 'superAdmin'"
        class=" info md-layout-item  md-xsmall-size-100 md-medium-size-50  md-size-30"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Inspection Count</p>
          </template>
          <template
            slot="footer"
            class="md-alignment-right"
          >
            <div class="stats">2/Month</div>
          </template>
        </stats-card>
      </div>
      <div
        v-if="role == 'superAdmin'"
        class=" info md-layout-item md-medium-size-50   md-xsmall-size-100 md-size-35"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">No. of Compliant Stores</p>
          </template>
          <template
            slot="footer"
            class="md-alignment-right"
          >
            <div
              class="stats"
              v-html="no_of_compliant"
            ></div>
          </template>
        </stats-card>
      </div>
      <div
        v-if="role == 'superAdmin'"
        class="info md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-35"
      >
        <stats-card data-background-color="purple">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">No. of Uncompliant Stores</p>
          </template>
          <template
            slot="footer"
            class="md-alignment-right"
          >
            <div
              class="stats"
              v-html="no_of_uncompliant"
            ></div>
          </template>
        </stats-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Inspection Compliance</h4>
          </md-card-header>
          <md-card-content style="height: 600px;
            overflow-y: auto;">
            <md-table
              v-model="compliance"
              table-header-color="orange"
              md-sort="visited"
              md-sort-order="desc"
            >
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="ID">{{
                  compliance.indexOf(item) + 1
                }}</md-table-cell>
                <md-table-cell md-label="Store">{{item.address}}, {{item.location}}</md-table-cell>
                <md-table-cell
                  md-sort-by="visited"
                  md-label="Visit Status"
                >
                  <md-button
                    v-if="item.visited == true"
                    class="md-raised md-success"
                    title="Visited"
                  ><i class="fa fa-check"></i> </md-button>
                  <md-button
                    v-if="item.visited == false"
                    title="Not visited"
                    class="md-raised md-danger"
                  > <i class="fa fa-times"></i></md-button>
                </md-table-cell>

              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <!-- <div
        v-if="role ==='superAdmin'"
        class="md-layout-item md-size-100"
       >
        <md-field class="filter">
          <label for="font">Filter Compliance by...</label>
          <md-select
            v-model="compliance_filter"
            name="filter"
            id="filter"
            md-dense
          >
            <md-option value="today">Today</md-option>
            <md-option value="yesterday">Yesterday</md-option>
          </md-select>
        </md-field>
      </div> -->
      <div
        v-if="role ==='superAdmin'"
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Top Compliant Stores</h4>
          </md-card-header>
          <md-card-content style="height: 400px;
         overflow-y: auto;">
            <md-table
              v-model="top_stores"
              table-header-color="green"
            >
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="Store Name">{{
                  item.store_name
                }}</md-table-cell>
                <md-table-cell md-label="Percent">{{
                  item.total_percent
                }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        v-if="role ==='superAdmin'"
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">Least Compliant Stores</h4>
          </md-card-header>
          <md-card-content style="height: 400px;
           overflow-y: auto;">
            <md-table
              v-model="least_stores"
              table-header-color="red"
            >
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="Store Name">{{
                  item.store_name
                }}</md-table-cell>
                <md-table-cell md-label="Percent">{{
                  item.total_percent
                }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card v-if="no_form == false">
          <md-card-header data-background-color="orange">
            <h4 class="title">Forms</h4>
          </md-card-header>
          <md-card-content style="height: 600px;
             overflow-y: auto;">
            <md-table
              v-model="forms"
              table-header-color="orange"
            >
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
              >
                <md-table-cell md-label="ID">{{
                  forms.indexOf(item) + 1
                }}</md-table-cell>
                <md-table-cell md-label="Store Name">{{
                  item.store_name
                }}</md-table-cell>
                <md-table-cell md-label="Date">{{
                  item.created_at
                }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <a
                    title="view report"
                    class="bg-warning"
                    style="padding: 3px 15px;  border-radius: 5px;"
                    v-bind:href="'scoredreportview/' + item.form_id"
                  >
                    <md-icon class="text-white">dvr</md-icon>
                  </a>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard } from "@/components";

export default {
  components: {
    StatsCard
  },
  data () {
    return {
      no_form: false,
      record_date: "",
      role: "",
      storeId: "",
      storeName: "",
      compliance: [],
      selectedPeriod: "",
      compliance_filter: "today",
      no_of_compliant:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",
      no_of_uncompliant:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",

      top_stores: [],
      least_stores: [],
      forms: []
    };
  },
  created () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    this.selectedPeriod = yyyy + '-' + mm;
  },
  mounted () {
    this.role = this.$store.getters.role;
    if (this.role === "storeManager") {
      this.storeId = this.$store.getters.user_data.id;
    }

    this.stats();
    let stores = this.$store.getters.stores
    stores.forEach(j => {

      if (j.id == this.storeId) {
        this.storeName = j.address;
      }
    })
  },
  methods: {
    getReport () {
      let filter = this.selectedPeriod
      filter = filter + "-30"
      var recent = {
        what: "ammvr",
        params: {
          filter: filter
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "ammvr") {
            if (response.data.Reports.length == 0) {
              this.no_form = true
            }
            if (this.role == "storeManager") {
              this.forms = []
              response.data.Reports.forEach(i => {
                if (i.store_name == this.storeName) {
                  this.forms.push(i);
                  this.no_form = false
                }

              })

            }
            else {
              this.forms = response.data.Reports;

            }
            if (this.forms.length == 0) {
              this.no_form = true
            }
          }
        })
        .catch(e => {
          console.log(e);
          this.no_form = true
        });
    },
    getCompliance () {
      let filter = this.selectedPeriod
      filter = filter + "-30"
      var recent = {
        what: "ammvr_compliance",
        params: {
          filter: filter
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {

          if (response.type == "ammvr_compliance") {


            this.top_stores = response.data.compliant_Stores;
            this.least_stores = response.data.nonCompliant_Stores;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getStats () {
      let filter = this.selectedPeriod
      filter = filter + "-30"
      var recent = {
        what: "amvrCompliance",
        params: {
          date: filter,
          form: "amvr"
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "amvrCompliance") {
            this.no_of_compliant = response.data.amvr.compliant
            this.no_of_uncompliant = response.data.amvr.non_compliant
            this.record_date = response.data.amvr.message
          }
        })
        .catch(e => {
          console.log(e);
          this.no_of_compliant = "-";
          this.no_of_uncompliant = "-";
        });
    },
    getInspection () {
      let filter = this.selectedPeriod
      filter = filter + "-30"
      var recent = {
        what: "am",
        params: {
          filter: filter
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "am") {
            if (response.data.length == 0) {
              this.no_form = true
            }

            else {
              // console.log(response.data)
              if (this.role == 'storeManager') {
                this.compliance = []
                response.data.forEach(i => {
                  if (i.id == this.storeId) {
                    this.compliance.push(i)
                  }

                })
              }
              else {
                this.compliance = response.data;
              }

            }

          }
        })
        .catch(e => {
          console.log(e);

        });
    },

    stats: function () {
      this.getStats();
      this.getCompliance();
      this.getReport();
      this.getInspection()
    }
  },
  watch: {
    selectedPeriod: function (val) {
      //do something when the data changes.
      if (val) {
        this.forms = []
        this.stats();
      }
    },
    compliance_filter: function (val) {
      //do something when the data changes.
      if (val) {
        this.getCompliance();
      }
    }
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
</style>
