<template>
  <div>
    <md-table
      v-model="forms"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Form Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Action">
          <md-button class="md-raised md-warning">
            <a :href="item.link">View</a></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "form-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      selected: [],
      forms: [
        {
          id: 1,
          name: "AM MVR FEEDBACK REPORT",
          link: "/admin/amvrfeedback"
        },
        {
          id: 2,
          name: "AM STANDARD OPERATIONS AUDIT",
          link: "/admin/openingsoa"
        },
        {
          id: 3,
          name: "MID-DAY MVR FEEDBACK REPORT",
          link: "/admin/midamvfeedback"
        },
        {
          id: 4,
          name: "MID-DAY STANDARD OPERATIONS AUDIT",
          link: "/admin/midopeningsoa"
        },
        {
          id: 5,
          name: "FOOD SAFETY REPORT",
          link: "/admin/krss"
        },
        {
          id: 6,
          name: "GREENBOOK CHECKLIST",
          link: "/admin/kdo"
        },
        {
          id: 7,
          name: "REDBOOK CHECKLIST",
          link: "/admin/redbook"
        },
         {
          id: 8,
          name: "SCORED REPORTS",
          link: "/admin/Scored_Reports"
        },
         {
          id: 9,
          name: "NON SCORED REPORTS",
          link: "/admin/Non_Scored_Reports"
        }
      ]
    };
  }
};
</script>
