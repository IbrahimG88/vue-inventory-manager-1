
<template>
  <div>
    <v-card>
      <v-card-title>
        Add Stocks
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          v-if="fillStocks==false"
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
        v-if="fillStocks==false"
      ></v-data-table>
      <v-btn
        class="ma-2"
        outlined
        color="indigo"
        right
        fixed
        :disabled="selected.length < 1"
        @click="fillStocks = !fillStocks"
        v-if="fillStocks==false"
      >Add new Stocks Data</v-btn>
    </v-card>

    <v-form v-if="fillStocks">
      <v-container>
        <div v-for="item in selected" :key="item.id">
          <v-card>
            <v-col cols="12" md="3">
              <v-text-field v-model="item.id" label="Id" required />
              <v-text-field v-model="item.name" label="Name" required />
              <v-text-field v-model="item.brand" label="Brand or Instrument" required />
              <v-text-field v-model="item.category" label="Category" required />
              <v-text-field v-model="item.testsPerUnit" label="Tests Per Unit" required />
              <v-text-field v-model="item.testsUsedPerDay" label="Tests Used Per Day" required />
              daysTillDepletion: {{ item.daysTillDepletion != Infinity && item.daysTillDepletion ? item.daysTillDepletion : "Complete the data" }}
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-text-field v-model="item.name" label="Name" required />
              <v-select :items="items" item-text="name" item-value="name" v-model="item.amountType" label="Amount in..." solo></v-select>
            </v-col>
            {{item.amountType}}
          </v-card>
          <br />
        </div>
        <!--
        <v-col cols="12" md="3">
          <v-text-field v-model="item.id" label="Id" required />
          <v-text-field v-model="item.name" label="Name" required />
          <v-text-field v-model="item.brand" label="Brand or Instrument" required />
          <v-text-field v-model="item.category" label="Category" required />
          <v-text-field v-model="item.testsPerUnit" label="Tests Per Unit" required />
          <v-text-field v-model="item.testsUsedPerDay" label="Tests Used Per Day" required />
          <v-text-field v-model="daysTillDepletion" label="Days Till Depletion" />
        </v-col>
        -->
        <v-row>
          <v-btn color="success" @click="submit">Submit Item</v-btn>
          <v-col cols="12" md="1"></v-col>
          <v-btn @click="clear">Clear</v-btn>
        </v-row>
      </v-container>
    </v-form>
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
  name: "AddStocks",
  data() {
    return {
      fillStocks: false,
      items: [{"name": "Units"}, {"name": "Tests"}],
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
    },
    submit() {
      console.log("submitted");
    },
    clear() {
      console.log("clear");
    }
  },
  computed: mapGetters(["allTodos", "allInventory"]),
  daysTillDepletion() {
    if (this.item.testsPerUnit != 0 && this.item.testsUsedPerDay != 0) {
      return (this.item.testsPerUnit / this.item.testsUsedPerDay).toFixed(1);
    } else {
      return "";
    }
  }
};
</script>



<style scoped>
.search-bar {
  width: 800px;
}
</style>


