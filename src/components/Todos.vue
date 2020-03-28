<template>
  <div>
    <h3>Todos</h3>
    <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">{{ todo.title }}</div>
    <ul>
      
    <li v-for="item in allInventory" v-bind:key="item.name" class="inventoryItem">
      {{item}}

      <div v-if="showItem">
      {{ item.name }} 
      </div>
      <div v-if="editing">
        <input  type="text" v-model.lazy="item.name" >
        </div>
        <button @click="editItem">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  data() {
    return {
      editing: false,
      showItem: true,
      item: {
        id: "",
        title: "",
        name: "",
        brand: "",
        category: "",
        testsPerUnit: "",
        testsUsedPerDay: "",
        get daysTillDepletion() {
          return this.testsPerUnit / this.testsUsedPerDay;
        }
      }
    }
    },
  methods: {
    ...mapActions(["updateTodo"]),
    editItem(item) {
      this.editing = !this.editing;
      this.showItem = !this.showItem;
      item.name = this.item.name && this.item.name.trim();
      this.updateItem(item);
    }
  },
  computed: mapGetters(["allTodos", "allInventory"])
};
</script>

<style>
</style>