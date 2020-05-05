<template>
  <div>
    Reorder...
    <div class="mx-auto search-bar">
      <model-list-select
        :list="allInventory"
        v-model="objectItem"
        option-value="id"
        :custom-text="nameAndCategoryAndBrand"
        placeholder="select item"
      ></model-list-select>
    </div>
    <v-card>
      <v-card-title>
        Reorder 
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          placeholder="Type the Number of days remaining limit"
          single-line
          hide-details
        ></v-text-field>
        
      </v-card-title>
      <br>
      <v-data-table
        v-model="selected"
        :single-select="singleSelect"
        item-key="name"
        show-select
        :headers="headers"
        :items="allInventory"
        :search="search"
        :custom-filter=" filterRemainingDays"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ModelListSelect } from "vue-search-select";
// eslint-disable-next-line no-unused-vars
import { DateTime } from "luxon";
// eslint-disable-next-line no-unused-vars
import Interval from "luxon/src/interval.js";
// eslint-disable-next-line no-unused-vars
import { db } from "@/main";

export default {
  name: "Reorder",
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
  components: {
    ModelListSelect
  },
  methods: {
    ...mapActions(["updateItem", "deleteItem"]),
    nameAndCategoryAndBrand(item) {
      return `${item.name} - ${item.category} - ${item.brand}`;
    },
    reset1() {
      this.objectItem = {};
    },
    selectFromParentComponent1() {
      // select option from parent component
      this.objectItem = this.options[0];
    },
    filterRemainingDays(value, search, item) {
        if(search - item.daysTillDepletion >= 0){
            return item;
        }
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