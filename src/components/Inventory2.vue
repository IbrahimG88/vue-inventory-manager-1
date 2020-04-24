<template>
  <div>
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
  name: "Inventory2",
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