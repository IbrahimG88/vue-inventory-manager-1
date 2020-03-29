<template>
  <div>
    <h3>Todos</h3>
    <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">{{ todo.title }}</div>
    <ul>
      
    <li  v-for="(item, index) in allInventory" v-bind:key="item.name" class="inventoryItem">
      <div v-if="showAllItems">
      {{item}}
      
      <div v-if="showItem">
      {{ item.name }} 
      </div>
      </div>
        <button @click="editItem(item, index)">Edit</button>
      </li>
    </ul>
    <div v-if="editing">
      {{index}}
      <!-- we will use the index from data() as given value in editItem(): this.index= index; -->
        <input  type="text" v-model.lazy="allInventory[index].name" >
        <button @click="editItem(item, index)">Edit finished</button>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  data() {
    return {
      showAllItems: true,
      editing: false,
      showItem: true,
      index:null,
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
    ...mapActions(["updateItem"]),
    editItem(item, index) {
      console.log("index",index);
      console.log("item to edit all inventry:", this.allInventory[index]);
      
      // theconditional rendering:
      this.showAllItems = !this.showAllItems;
      this.editing = !this.editing;
      this.showItem = !this.showItem;

      //index from data() = item index clicked:
      // we use updateItem and passing the item that modifies allInventory[index]
      // then allInventory is updated => in the template: v-for=(item, index) in allInventory uses
      // the updated, edited list 
      this.index= index;

      this.updateItem(item);
      console.log(this.allInventory);
    }
  },
  computed: mapGetters(["allTodos", "allInventory"])
};
</script>

<style>
</style>