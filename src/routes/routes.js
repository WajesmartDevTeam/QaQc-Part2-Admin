import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Login from "@/pages/Login.vue";
import Tasks from "@/pages/Tasks.vue"
import Reset from "@/pages/Reset.vue";
import Register from "@/pages/Register.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Users from "@/pages/Users.vue";
import AMMVR from "@/pages/Am_mvr.vue";
import MIDDAYMVR from "@/pages/Midday_mvr.vue";
// import AM_standard from "@/pages/Am_standard.vue";
// import Midday_standard from "@/pages/Midday_standard.vue";
import Food_safety from "@/pages/Foodsafety.vue";
import Greenbook from "@/pages/Greenbook.vue";
import Redbook from "@/pages/Redbook.vue";
import AMMVRVIEW from "@/pages/view/Am_mvr_view.vue";
import MIDDAYMVRVIEW from "@/pages/view/Midday_mvr_view.vue";
// import AM_standard_view from "@/pages/view/AM_standard_view.vue";
// import Midday_standard_view from "@/pages/view/Midday_standard_view.vue";
import Food_safety_View from "@/pages/view/Food_safety_view.vue";
import Greenbook_View from "@/pages/view/Greenbook_view.vue";
import Redbook_View from "@/pages/view/Redbook_view";
import Scored_Reports from "@/pages/Scored_Reports.vue";
import Non_Scored_Reports from "@/pages/Non_Scored_Reports.vue";
import Scored_Report_View from "@/pages/view/Scored_Report_View.vue";
import Non_Scored_View from "@/pages/view/Non_Scored_View.vue";
import Competition_view from "@/pages/view/Competition_view.vue";
import Opportunities_view from "@/pages/view/Opportunities_view.vue";

const routes = [{
        path: "/",
        name: "Login",
        component: Login,
        // redirect: {
        //     name: "Login"
        // },
        meta: {
            public: true, // Allow access to even if not logged in
            onlyWhenLoggedOut: true
        },
    },
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: Login,
    //     meta: {
    //         public: true, // Allow access to even if not logged in
    //         onlyWhenLoggedOut: true
    //     }
    // },
    {
        path: "/reset",
        name: "Reset",
        component: Reset,
        meta: {
            public: true, // Allow access to even if not logged in
            onlyWhenLoggedOut: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/admin",
        component: DashboardLayout,

        children: [{
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard
            },
            {
                path: "tasks",
                name: "Action Tasks",
                component: Tasks
            },
            {
                path: "users",
                name: "Manage Users",
                component: Users
            },
            {
                path: "amvrfeedback",
                name: "AM MVR Feedback Report",
                component: AMMVR
            },

            {
                path: "midamvfeedback",
                name: "MIDDAY MVR Feedback Report",
                component: MIDDAYMVR
            },
             //{
            //     path: "openingsoa",
            //     name: "AM STANDARD OPERATIONS AUDIT",
            //     component: AM_standard
            // },
            // {
            //     path: "midopeningsoa",
            //     name: "MIDDAY STANDARD OPERATIONS AUDIT",
            //     component: Midday_standard
            // },
            {
                path: "krss",
                name: "FOOD SAFETY REPORT",
                component: Food_safety
            },
            {
                path: "kdo",
                name: "GREENBOOK CHECKLIST",
                component: Greenbook
            },
            {
                path: "redbook",
                name: "REDBOOK CHECKLIST",
                component: Redbook
            },
            {
                path: "amvrfeedbackview/:id",
                name: "AM MVR Feedback View",
                component: AMMVRVIEW
            },
            {
                path: "middaymvrfeedbackview/:id",
                name: "MIDDAY MVR Feedback View",
                component: MIDDAYMVRVIEW
            },
            // {
            //     path: "openingsoaview/:id",
            //     name: "AM STANDARD OPERATIONS AUDIT View",
            //     component: AM_standard_view
            // },
            // {
            //     path: "midopeningsoaview/:id",
            //     name: "MIDDAY STANDARD OPERATIONS AUDIT View",
            //     component: Midday_standard_view
            // },
            {
                path: "foodreportview/:id",
                name: "FOOD SAFETY REPORT View",
                component: Food_safety_View
            },
            {
                path: "greenbookview/:id",
                name: "GREENBOOK CHECKLIST View",
                component: Greenbook_View
            },
            {
                path: "redbookview/:id",
                name: "REDBOOK CHECKLIST View",
                component: Redbook_View
            },
           {
               path: "scoredreports",
               name: "SCORED REPORTS",
              component: Scored_Reports
           },
            {
              path: "nonscoredreports",
            name: "NON SCORED REPORTS",
               component: Non_Scored_Reports
           },
           {
            path: "scoredreportview/:id",
          name: "SCORED REPORT VIEW",
             component:Scored_Report_View
         },

          {
            path: "opportunitiesview/:id",
            name: "OPPORTUNITIES VIEW",
               component: Opportunities_view
          },
          

          {
            path: "competitionview/:id",
            name: "COMPETITION VIEW",
               component: Competition_view
          },

         {
            path: "nonscoredreportview/:id",
          name: "NON SCORED REPORT VIEW",
             component: Non_Scored_View
         }
        ]
    }
];

export default routes;