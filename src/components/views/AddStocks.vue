
<template>
  <div>
    <v-card>
      <v-card-title>
        Inventory
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :single-select="singleSelect"
        item-key="name"
        show-select
        :headers="headers"
        :items="allInventory"
        :search="search"
      ></v-data-table>
        <v-btn class="ma-2" outlined color="indigo" right fixed :disabled="selected.length < 1">Add new Stocks Data</v-btn>
    </v-card>
     </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// eslint-disable-next-line no-unused-vars
import { DateTime } from "luxon";
// eslint-disable-next-line no-unused-vars
import Interval from "luxon/src/interval.js";
// eslint-disable-next-line no-unused-vars
import { db } from "@/main";

export default {
    name: 'AddStocks',
    data() {
    return {
      objectItem: {},
      search: "",
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: "Inventory item",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "Brand", value: "brand" },
        { text: "Category", value: "category" },
        { text: "Tests Per Unit", value: "testsPerUnit" },
        { text: "Tests Used Per Day", value: "testsUsedPerDay" },
        { text: "Days Till Depletion", value: "daysTillDepletion" }
      ]
    };
  },
 
  methods: {
    ...mapActions(["updateItem", "deleteItem"]),
    reset1() {
      this.objectItem = {};
    },
    selectFromParentComponent1() {
      // select option from parent component
      this.objectItem = this.options[0];
    }

  },
  computed: mapGetters(["allTodos", "allInventory"])
};

</script>



<style scoped>
.search-bar {
  width: 800px;
}
</style>


