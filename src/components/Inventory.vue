<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mx-auto search-bar">
          <model-list-select
            :list="allInventory"
            v-model="objectItem"
            option-value="id"
            :custom-text="nameAndCategoryAndBrand"
            placeholder="select item"
          ></model-list-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="800">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

          <v-card-title>{{objectItem.name}}</v-card-title>

          <v-card-subtitle>{{ objectItem.brand}}</v-card-subtitle>
          <v-card-subtitle>{{ objectItem.category}}</v-card-subtitle>

          <v-card-actions>
            <v-btn text @click="history = !history">History</v-btn>

            <v-btn color="purple" text @click="prices = !prices">Prices</v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                  Tests per unit: {{ objectItem.testsPerUnit}} 
                   <v-spacer></v-spacer>
                  Tests Used per day: {{ objectItem.testsUsedPerDay}}
                   <v-spacer></v-spacer>
                  Days till Depletion: {{objectItem.daysTillDepletion}} 
              </v-card-text>
            </div>
            
          </v-expand-transition>
          <v-expand-transition>
          <div v-show="history">
                <v-divider></v-divider>
                <v-card-text>
                    I am history
                    </v-card-text>
            </div>
            </v-expand-transition>
            <v-expand-transition>
          <div v-show="prices">
                <v-divider></v-divider>
                <v-card-text>
                    I am prices
                    </v-card-text>
            </div>
            </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  name: "Inventory",
  data() {
    return {
      objectItem: {},
      show: false,
      showCard: false,
      history: false,
      prices: false
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