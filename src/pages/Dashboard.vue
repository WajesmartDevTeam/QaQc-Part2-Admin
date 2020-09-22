<template>
  <div class="content">
    <div class="md-layout">

      <div class="info md-layout-item md-size-100">
        <img
          style="width:100%"
          src="https://image.freepik.com/free-vector/welcome-lettering-yellow-origami-speech-bubble-with-triangles_1262-11380.jpg"
          alt=""
        >
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
      no_action: false,
      role: "",
      storeId: "",
      updateView: false,
      selectedPeriod: 5000,
      no_of_forms:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",
      no_of_stores:
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>",

      action_plans: [],
      update: {}
    };
  },
  beforeCreate: function () {
    document.body.className.replace("home", "");
  },
  mounted () {

    this.role = this.$store.getters.role;

    if (this.role === "storeManager") {
      this.storeId = this.$store.getters.user_data.id;
      this.$store.dispatch("store_reports");
    }
    this.$store.dispatch("stores")
      .then(response => {
        // this.stats();
      })
      .catch(e => {
        console.log(e);
        this.$store.dispatch("stores")
      });

  },
  methods: {
    getStats () {
      this.no_of_forms =
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";
      this.no_of_stores =
        "<img style='margin-top: -40px;' src='http://www.broadwaybalancesamerica.com/images/ajax-loader.gif'/>";


      if (this.role == "storeManager") {
        var recent = {
          what: "store_reports",
          showLoader: "no",
          params: {
            storeId: this.storeId,
            searchString: this.selectedPeriod
          }
        };
      }
      else {
        var recent = {
          what: "total_reports",
          showLoader: "no",
          params: {
            searchString: this.selectedPeriod
          }
        };
      }


      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "total_reports") {
            this.no_of_forms = response.data.totalForms;
            this.no_of_stores = response.data.totalStoresVisted;
            this.forms = response.data.Reports;

          }
          else {
            // console.log(response);
            let totalForms = 0;
            let totalStoresVisited = 0;

            Object.values(response.data).forEach(i => {
              totalForms += parseInt(i.FormsSubmitted)
              totalStoresVisited += parseInt(i.Visits);
            });
            this.no_of_forms = totalForms;
            this.no_of_stores = totalStoresVisited;
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
    },
    // edit (form_id, questionno) {
    //   this.updateView = true;
    //   this.update.formId = form_id;
    //   this.update.questionno = questionno;

    // },
    // updateStatus () {
    //   var html =
    //     '<img src="https://freefrontend.com/assets/img/css-loaders/css-fun-Little-loader.gif"/>';

    //   this.$swal.fire({
    //     title: "Processing",
    //     html: html,
    //     showConfirmButton: false,
    //     showCancelButton: false,
    //     width: "380px",
    //     allowOutsideClick: false
    //   });

    //   var req = {
    //     what: "updateTask",
    //     data: this.update
    //   };

    //   this.$socket
    //     .editItem(req)
    //     .then(response => {
    //       if (response.type) {
    //         this.$swal.fire("Success", response.data.message, "success");
    //         location.reload();

    //       }
    //     })
    //     .catch(e => {
    //       console.log(e);
    //       this.$swal.fire("Error", e.message, "error");
    //     });


    // }
  },
  watch: {
    selectedPeriod: function (val) {
      //do something when the data changes.
      if (val) {
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
