<template>
  <div>
    <h3>Todos</h3>
    <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">{{ todo.title }}</div>
    <ul>
      <li v-for="(item, index) in allInventory" v-bind:key="item.name" class="inventoryItem">
        <div v-if="showAllItems">
          {{item}}
          <i @click="deleteItem(item.id)" class="fas fa-trash-alt"></i>
          <div v-if="showItem">{{ item.name }}</div>
        </div>
        <button @click="editItem(item, index)">Edit</button>
      </li>
    </ul>
    <div v-if="editing">
      {{index}}
      <!-- we will use the index from data() as given value in editItem(): this.index= index; -->
      <input type="text" v-model.lazy="allInventory[index].name" />
      <button @click="editItem(item, index)">Edit finished</button>
    </div>
    <!-- vue-search-select component-->
   <model-list-select :list="allInventory"
                     v-model="objectItem"
                     option-value="id"
                     :custom-text="codeAndNameAndDesc"
                     placeholder="select item">
   </model-list-select>

    <div v-if="Object.keys(objectItem).length !== 0">
      {{ objectItem }}
    </div>
  
   </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { ModelListSelect } from 'vue-search-select'

export default {
  name: "Todos",
  data() {
    return {
      objectItem: {},
      showObjectItem: false,
      // the search component data ends here
      showAllItems: true,
      editing: false,
      showItem: true,
      index: null,
      hasSaved: false,
      isEditing: null,
      model: null,
      item: {
        id: "",
        title: "",
        name: "",
        brand: "",
        category: "",
        testsPerUnit: "",
        testsUsedPerDay: "",
        daysTillDepletion: ""
      }
    };
  },
  components: {
    ModelListSelect
  },
  methods: {
    ...mapActions(["updateItem", "deleteItem"]),
    editItem(item, index) {
      console.log("index", index);
      console.log("item to edit all inventry:", this.allInventory[index]);

      // theconditional rendering:
      this.showAllItems = !this.showAllItems;
      this.editing = !this.editing;
      this.showItem = !this.showItem;

      //index from data() = item index clicked:
      // we use updateItem and passing the item that modifies allInventory[index]
      // then allInventory is updated => in the template: v-for=(item, index) in allInventory uses
      // the updated, edited list
      this.index = index;

      this.updateItem(item);
      console.log(this.allInventory);
    },
    //methods for vue-search-select ModelListComponent
     codeAndNameAndDesc (item) {
        return `${item.name} - ${item.category} - ${item.brand}`
      },
      reset1 () {
        this.objectItem = {}
      },
      selectFromParentComponent1 () {
        // select option from parent component
        this.objectItem = this.options[0]

      }
  },
  computed: mapGetters(["allTodos", "allInventory"])
};
</script>

<style>
</style>