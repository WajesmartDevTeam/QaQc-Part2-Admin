<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div
          class="card"
          style="padding: 20px;"
        >

          <div
            id="form-fields"
            class="card-content"
          >
            <div class="form-group row">
              <label
                for="staticEmail"
                class=" col-xs-4 col-sm-4 col-form-label"
              >Visitor's
                Name</label>
              <div
                id="1"
                class="col-xs-8 col-sm-8 ans"
              >
                <p class="form-control" v-html="store.username"></p>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Date</label>
              <div
                id="2"
                class="col-xs-8 col-sm-8 ans"
              >
                <p class="form-control" v-html="store.date"></p>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Location
                Visited</label>
              <div
                id="3"
                class="col-xs-8 col-sm-8 ans"
              >
                <p class="form-control" v-html="store.name" ></p>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Manager(s)
                on
                Duty</label>
              <div
                id="4"
                class="col-xs-8 col-sm-8 ans"
              >
                <p class="form-control" v-html="store.store_manager"></p>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Day of
                Week</label>
              <div
                id="5"
                class="col-xs-8 col-sm-8 ans"
              >
                <p class="form-control" v-html="store.day"></p>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <th>Category</th>
                <th>Points Earned</th>
                <th>Possible Points</th>
                <th>Percent</th>
              </thead>
              <tbody>
                <tr v-for="(section, index) in sections" v-bind:key="index">
                  <td v-html="section.section_name"></td>
                  <td
                    id="28"
                    class="ans"
                  >
                    <p v-html="section.points_earned"></p>
                  </td>
                  <td v-html="section.possible_points"></td>
                  <td
                    id="29"
                    class="ans"
                  >
                    <p v-html="section.total_percent"></p>
                  </td>
                </tr>
              </tbody>
              <tfoot class="total">
                <tr>
                  <th>TOTAL</th>
                  <th
                    id="30"
                    class="points ans"
                  >
                    <p v-html="earned_total"></p>
                  </th>
                  <th v-html="possible_total"></th>
                  <th
                    id="31"
                    class="percent ans"
                  >
                    <p v-html="percent_total"></p>
                  </th>
                </tr>
              </tfoot>
            </table>
            <h5 class="subtitle">Comments</h5>
            <div class="form-group" v-for="(answer, index) in answers" v-bind:key="index" >
              <label
                for="inputPassword"
                class="form-label"
              >{{answer.questiontext}}:</label>
              <div
                id="32"
                class="ans"
              >
                <p class="form-box" v-html="answer.answers"></p>

              </div>
            </div>            
          </div>
          <div class="row ">
            <div
              v-for="(img, index) in images"
              v-bind:key="index"
              class="col-4 h-25"
            >
              <img
                :src="'http://localhost:8000'+img.answers"
                class="img-fluid"
                style="height: 200px;"
              >
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['id', 'date'],
  data () {
    return {
      // values: [],
      sections: [],
      images: [],
      store: [],
      answers: [],

    };
  },
  created () {
    this.getForm();
  },
  computed : {
    earned_total() {
      if(this.sections.length != 0) {
        let sum = 0;
        this.sections.forEach(section => {
          sum += parseInt(section.points_earned);
        });
        return sum;
      } else {
        return 0;
      }
    },

    possible_total () {
      if(this.sections.length != 0) {
        let sum = 0;
        this.sections.forEach(section => {
          sum += parseInt(section.possible_points);
        });
        return sum;
      } else {
        return 0;
      }
    },

    percent_total () {
      if(this.sections.length != 0) {
        let sum = 0, i = 0;
        this.sections.forEach(section => {
          sum += parseFloat(section.total_percent);
          ++i;
        });
        console.log(sum);
        return Math.round(((sum / 100) / i) * 100);
      } else {
        return 0;
      }
    }
  },
  methods: {
    getForm () {
      var recent = {
        what: "scoredreportview",
        params: {
          store_id: this.id,
          filter: this.date
        }
      };
      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.status) {
            console.log(response.data)
            let {store, answers, sections, images} = response.data;
            this.store = store;
            this.sections = sections;
            this.answers = answers;
            this.images = images;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
            // console.log(response)
            // for (let i = 0; i <= 33; i++) {
            //   response.data.forEach(item => {
            //     if (i == item.questionno) {
            //       // console.log(item.questiontext)
            //       if (item.questiontext == "Restaurant/Location Restaurant/Location") {
            //         let stores = this.$store.getters.stores
            //         stores.forEach(j => {
            //           if (j.id == item.answers) {
            //             item.answers = j.address + ", " + j.location;
            //             console.log(item.answers)
            //           }
            //         })
            //       }
            //       document.getElementById(i).querySelectorAll("p")[0].innerHTML = item.answers

            //     }
            //   });
            // }

            // this.images = response.images;
</script>
<style scoped>
.form-box {
  border: 1px solid #dee2e6;
  height: 120px;
  padding: 5px;
}
</style>

