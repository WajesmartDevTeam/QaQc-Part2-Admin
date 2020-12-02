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
                <input type="text" class="form-control">
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
                <input type="text" class="form-control">
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
                <input type="text" class="form-control">
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
                <input type="text" class="form-control">
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
                <input type="text" class="form-control">
              </div>
            </div>
          
          
          <div>
              <h4 style="margin-top:50px;"><b>Opportunities</b></h4>
               <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Are there categories we can improve range and stocking? (YES/NO)

                </label>
              <div
                id="6"
                class="col-xs-8 col-sm-8 ans"
              >
                <input type="text" class="form-control">
              </div>
                </div>
                 <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Are there new product lines that can be introduced to store? (YES/NO)

                </label>
              <div
                id="7"
                class="col-xs-8 col-sm-8 ans"
              >
                <input type="text" class="form-control">
              </div>
                </div>
                 <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Are there events we can do to increase footfall to the store? (YES/NO)

                </label>
              <div
                id="8"
                class="col-xs-8 col-sm-8 ans"
              >
                <input type="text" class="form-control">
              </div>
                </div>
                 <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Is there a room for another store in the city? (YES/NO)

                </label>
              <div
                id="9"
                class="col-xs-8 col-sm-8 ans"
              >
                <input  type="text" class="form-control">
              </div>
                </div>
                 <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Is there room for a differentiated offering in the market? (YES/NO)

                </label>
              <div
                id="10"
                class="col-xs-8 col-sm-8 ans"
              >
                <input type="text" class="form-control">
              </div>
                </div>
                 <div class="form-group row">
              <label
                for="inputPassword"
                class="col-xs-4 col-sm-4 col-form-label"
              >Are there any other opportunities for improved sales at this store? (YES/NO)

                </label>
              <div
                id="11"
                class="col-xs-8 col-sm-8 ans"
              >
                <input type="text" class="form-control">
              </div>
                 </div>
            </div>
          
           

          
           
              
            <h5 class="subtitle"><b>Comments</b></h5>
            <div class="form-group">
              <label
                for="inputPassword"
                class="form-label"
              >Top 5 things the store did well:</label>
              <div
                id="15"
                class="ans"
              >
                <textarea rows="5" cols= "138"  class="form-box"></textarea>

              </div>
            </div>
            <div class="form-group">
              <label
                for="inputPassword"
                class="form-label"
              >Top 5 things the store needs to improve on: </label>
              <div
                id="16"
                class="ans"
              >
                <textarea rows="5" cols= "138"  class="form-box"></textarea>
              </div>

               <br>
                <div class="float-right">
                  <button
                    @click="submitForm"
                    class="btn md-raised md-warning text-white btn-warning "
                    style="margin-bottom:10px"
                  >Save
                  </button>
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
                :src="'http://qa.sundryhrms.website'+img"
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
  data () {
    return {

      images: {}
    };
  },
  mounted () {
    this.getForm(this.$route.params.id);

  },
  methods: {
    getForm (id) {
      var recent = {
        what: "opportunitiesview",
        // showLoader: "no",
        params: {
          form_id: id
        }
      };

      this.$socket
        .makeGetRequest(recent)
        .then(response => {
          if (response.type == "opportunitiesview") {
            // console.log(response)
            for (let i = 0; i <= 16; i++) {
              response.data.forEach(item => {
                if (i == item.questionno) {
                  // console.log(item.questiontext)
                  if (item.questiontext == "Restaurant/Location Restaurant/Location") {
                    let stores = this.$store.getters.stores
                    stores.forEach(j => {
                      if (j.id == item.answers) {
                        item.answers = j.address + ", " + j.location;
                        console.log(item.answers)
                      }
                    })
                  }
                  document.getElementById(i).querySelectorAll("p")[0].innerHTML = item.answers

                }
              });
            }

            this.images = response.images;
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
