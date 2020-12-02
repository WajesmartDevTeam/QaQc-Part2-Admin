<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <md-field class="filter">
          <label for="font">Filter by...</label>
          <md-select
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
          </md-select>
        </md-field>
      </div>
      <div class=" info md-layout-item md-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">No. of Stores Visited</p>
          </template>
          <template
            slot="footer"
            class="md-alignment-right"
          >
            <div
              class="stats"
              v-html="no_of_stores"
            ></div>
          </template>
        </stats-card>
      </div>
      <div class="info md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-50">
        <stats-card data-background-color="purple">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">No. Of Submitted forms</p>
          </template>
          <template
            slot="footer"
            class="md-alignment-right"
          >
            <div
              class="stats"
              v-html="no_of_forms"
            ></div>
          </template>
        </stats-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Forms</h4>
          </md-card-header>
          <md-card-content>
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
                  <md-button class="md-raised md-warning">
                    <a v-bind:href="'openingsoaview/' + item.form_id">
                      <md-icon>dvr</md-icon>
                    </a>
                  </md-button>
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
      role: "",
      storeId: "",
      storeName: "",
      selectedPeriod: 5000,
      no_of_forms:
        "<img src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",
      no_of_stores:
        "<img src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",

      forms: []
    };
  },
  mounted () {
    this.role = this.$store.getters.role;
    if (this.role === "storeManager") {
      this.storeId = this.$store.getters.user_data.storeId;
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
    getStats () {
      this.no_of_forms =
        "<img src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";
      this.no_of_stores =
        "<img src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";

      var recent = {
        what: "openingsoa",
        showLoader: "no",
        params: {
          searchString: this.selectedPeriod
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "openingsoa") {
            if (this.role == "storeManager") {
              this.no_of_forms = this.$store.getters.store_reports.standardOperationOpening.FormsSubmitted;
              this.no_of_stores = this.$store.getters.store_reports.standardOperationOpening.Visits;

              response.data.Reports.forEach(i => {
                if (i.store_name == this.storeName) {
                  this.forms.push(i)
                }
              })
            }
            else {
              this.no_of_forms = response.data.Total_Submissions;
              this.no_of_stores = response.data.Total_Visits;
              this.forms = response.data.Reports;
            }
          }
        })
        .catch(e => {
          console.log(e);
          this.no_of_forms = "-";
          this.no_of_stores = "-";
        });
    },

    stats: function () {
      this.getStats();
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
