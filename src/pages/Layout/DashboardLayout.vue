<template>
  <div
    class="wrapper"
    :class="{ 'nav-open': $sidebar.showSidebar }"
  >
    <notifications></notifications>

    <side-bar>
      <sidebar-link to="/admin/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link
        to="/admin/tasks"
        title="Track Action Tasks assigned"
      >
        <md-icon>dashboard</md-icon>
        <p>Task Monitor</p>
      </sidebar-link>
     <!-- <sidebar-link
        to="/admin/amvrfeedback"
        title="AM MVR Feedback Report"
      >
        <md-icon>library_books</md-icon>
        <p>AM MVR Feedback</p>
      </sidebar-link> 
       <sidebar-link to="/admin/openingsoa">
        <md-icon>library_books</md-icon>
        <p>AM Standard Operations</p>
      </sidebar-link> -->
     <!-- <sidebar-link
        to="/admin/midamvfeedback"
        title="MIDDAY MVR Feedback Report"
      >
        <md-icon>library_books</md-icon>
        <p>MID-DAY MVR Feedback</p>
      </sidebar-link> -->

      <!-- <sidebar-link to="/admin/midopeningsoa">
        <md-icon>library_books</md-icon>
        <p>MID-DAY Standard Operations</p>
      </sidebar-link> -->

     <!-- <sidebar-link
        to="/admin/krss"
        title="Food Safety Report"
      >
        <md-icon>library_books</md-icon>
        <p>Food Safety Report</p>
      </sidebar-link> -->

      <sidebar-link
        to="/admin/scoredreports"
        title="Reports"
      >
        <md-icon>library_books</md-icon>
        <p>Reports</p>
      </sidebar-link>

<!--      <sidebar-link-->
<!--          to="/admin/nonscoredreports"-->
<!--          title="Scored Report"-->
<!--      >-->
<!--        <md-icon>library_books</md-icon>-->
<!--        <p>Non Scored Report</p>-->
<!--      </sidebar-link>-->

     <!-- <sidebar-link
        to="/admin/nonscoredreports"
        title="Non Scored Report"
      >
        <md-icon>library_books</md-icon>
        <p>Non Scored Report</p>

      </sidebar-link> -->
<!--      -->
<!--     <li class="active" >-->
<!--                <a data-toggle="collapse" href="#formsExamples" aria-expanded="false" class="collapsed md-list-item-content md-ripple">-->
<!--                    <i class=" md-icon md-icon-font md-theme-default">library_books</i>-->
<!--                    <p class=" md-ripple">Non Scored Report-->
<!--                      <b class="caret"></b>-->
<!--                    </p>-->
<!--                </a>-->

<!--                <div class="collapse" id="formsExamples" aria-expanded="false" style="height: 0px;">-->
<!--                    <ul class="nav side- md-list md-theme-default">-->
<!--                        <li class="active md-list-item">-->
<!--                            <router-link to="/admin/opportunitiesview/:id" title="" data-color="orange" class="md-list-item-router md-list-item-container md-button-clean">-->
<!--                               -->
<!--                                <p class="sidebar-normal  md-ripple"> Opportunities </p>-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                        <li class="active md-list-item">-->
<!--                            <router-link to="/admin/competitionview/:id" class="md-list-item-router md-list-item-container md-button-clean">-->
<!--                                -->
<!--                                <p class="sidebar-normal md-ripple"> Competition </p>-->
<!--                            </router-link>-->
<!--                        </li>-->
<!--                        -->
<!--                    </ul>-->
<!--                </div>-->
<!--            </li>-->
      
           
    <!--  <sidebar-link
        to="/admin/kdo"
        title="Greenbook Checklist Report"
      >
        <md-icon>library_books</md-icon>
        <p>Greenbook Checklist</p>
      </sidebar-link> -->
     <!-- <sidebar-link
        to="/admin/redbook"
        title="Redbook Checklist Report"
      >
        <md-icon>library_books</md-icon>
        <p>Redbook Checklist</p>
      </sidebar-link> --> 
      <sidebar-link
        to="/admin/users"
        title="View all admins"
        v-if="this.$store.getters.role == 'superAdmin'"
      >
        <md-icon>person</md-icon>
        <p>Admin Users</p>
      </sidebar-link>
      <sidebar-link
        to="/"
        title="logout" style="margin-bottom:50px;margin-left:19px"
      >
        <span
          style="height:25px;"
          @click="logout"
        >
          <md-icon>power_settings_new</md-icon>
          <p>Log out</p>
        </span>

      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
 
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter
  },
  methods: {
    logout () {
      this.$store.dispatch('logout', true)
      this.$router.push({ name: "Login" });
    }
  }
};


</script>
<style>
.md-theme-default a:not(.md-button) {
  color: #ffffff !important;
}
.select-wrapper{
  position: relative;	
}
.select-wrapper:after{
  font-family: FontAwesome;
  	content: '\f107';
  	font-size: 28px;
  	position: absolute;
  	top: 12px;
  	right: 20px;
  	
  	pointer-events: none;
}
select::-ms-expand {
  display: none;
}



.caret{
  
  
  margin-top: 13px;
  position:  absolute;
  right: 30px;
  left: 130px;
  display: inline-block;
    width: 10px;
    height: 15px;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid\9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}
</style>
