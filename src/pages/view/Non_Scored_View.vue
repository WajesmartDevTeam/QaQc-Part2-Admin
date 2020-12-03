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
            <div>
              <h4 style="margin-top:50px;"><b>Opportunities</b></h4>
              <div class="form-group row" v-for="(opportunity, index) in opportunities" v-bind:key="index">
                <label
                    for="inputPassword"
                    class="col-xs-4 col-sm-4 col-form-label"
                >{{opportunity.questiontext}}:

                </label>
                <div
                    id="6"
                    class="col-xs-8 col-sm-8 ans"
                >
                  <input type="text" class="form-control" :value="opportunity.answers">
                </div>
              </div>
            </div>
            <div>
              <h4 style="margin-top:50px;"><b>Competition</b></h4>
              <div class="form-group row" v-for="(competition, index) in competitions" v-bind:key="index">
                <label
                    for="inputPassword"
                    class="col-xs-4 col-sm-4 col-form-label"
                >{{competition.questiontext}}:

                </label>
                <div
                    id="6"
                    class="col-xs-8 col-sm-8 ans"
                >
                  <input type="text" class="form-control" :value="competition.answers">
                </div>
              </div>
            </div>
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
      opportunities: [],
      competitions: [],
      images: [],
      store: [],
      answers: [],

    };
  },
  created () {
    this.getForm();
  },
  methods: {
    getForm () {
      var recent = {
        what: "nonscoredreportview",
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
              let {store, answers, opportunities, competitions , images} = response.data;
              this.store = store;
              this.opportunities = opportunities;
              this.competitions = competitions;
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
</script>
<style scoped>
.form-box {
  border: 1px solid #dee2e6;
  height: 120px;
  padding: 5px;
}
</style>

