<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <md-field class="filter">
          <label for="font">Filter by date</label>
          <!-- <md-select
            v-model="selectedPeriod"
            name="filter"
            id="filter"
            md-dense
          >
            <md-option value="7">Last 7 days</md-option>
            <md-option value="31">Last 1 month</md-option>
            <md-option value="92">current Quarter</md-option>
            <md-option value="183">Last 6 months</md-option>
            <md-option value="366">Last 1 year</md-option>
          </md-select> -->
          <md-input
            type="date"
            v-model="selectedPeriod"
            required
          ></md-input>
        </md-field>
      </div>
      <div
        v-if="role == 'superAdmin'"
        class=" info md-layout-item md-medium-size-50  md-xsmall-size-100   md-size-30"
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
            <div class="stats">1/Day</div>
          </template>
        </stats-card>
      </div>
      <div
        v-if="role == 'superAdmin'"
        class=" info md-layout-item md-medium-size-50  md-xsmall-size-100 md-size-35"
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
            <p class="category">No. Of Uncompliant Stores</p>
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
                    v-bind:href="'redbookview/' + item.form_id"
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
      role: "",
      compliance: [],
      storeId: "",
      storeName: "",
      selectedPeriod: 1,
      no_of_compliant:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",
      no_of_uncompliant:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",

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

    this.selectedPeriod = yyyy + '-' + mm + '-' + dd;
  },
  mounted () {
    this.role = this.$store.getters.role;
    if (this.role === "storeManager") {
      this.storeId = this.$store.getters.user_data.id;
    }

    this.stats();
  },
  methods: {
    getStats () {
      this.no_of_compliant =
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";
      this.no_of_uncompliant =
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";

      var recent = {
        what: "redbookCompliance",

        params: {
          date: this.selectedPeriod,
          form: "redbook"
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "redbookCompliance") {
            this.no_of_compliant = response.data.redbook.compliant
            this.no_of_uncompliant = response.data.redbook.non_compliant


          }
        })
        .catch(e => {
          console.log(e);
          this.no_of_compliant = "-";
          this.no_of_uncompliant = "-";
        });
    },
    getReport () {

      var recent = {
        what: "redbook",

        params: {
          filter: this.selectedPeriod,
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "redbook") {
            if (response.data.Reports.length == 0) {
              this.no_form = true
            }
            if (this.role == "storeManager") {
              this.forms = []
              response.data.Reports.forEach(i => {
                if (i.store_name == this.storeName) {
                  this.forms.push(i);
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

      var recent = {
        what: "rb",

        params: {
          filter: this.selectedPeriod
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "rb") {
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
        })
        .catch(e => {
          console.log(e);

        });
    },

    stats: function () {
      this.getCompliance()
      this.getStats();
      this.getReport()

    }
  },
  watch: {
    selectedPeriod: function (val) {
      //do something when the data changes.
      if (val) {
        this.forms = []
        this.stats();
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
