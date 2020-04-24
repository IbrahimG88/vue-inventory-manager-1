<template>
<div class="mx-auto search-bar">
 <model-list-select
            :list="allInventory"
            v-model="objectItem"
            option-value="id"
            :custom-text="nameAndCategoryAndBrand"
            placeholder="select item"
          ></model-list-select>
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