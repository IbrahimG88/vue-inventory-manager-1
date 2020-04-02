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
   <model-list-select :list="options"
                     v-model="objectItem"
                     option-value="id"
                     :custom-text="codeAndNameAndDesc"
                     placeholder="select item">
  </model-list-select>
   </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { ModelListSelect } from 'vue-search-select'

export default {
  name: "Todos",
  data() {
    return {
      options1: [
          { code: '01', name: 'aa', desc: 'desc01' },
          { code: '02', name: 'ab', desc: 'desc02' },
          { code: '03', name: 'bc', desc: 'desc03' },
          { code: '04', name: 'cd', desc: 'desc04' },
          { code: '05', name: 'de', desc: 'desc05' },
          { code: '06', name: 'ef', desc: 'desc06' }
        ],
      objectItem: {},
      // the search component data ends here
      showAllItems: true,
      editing: false,
      showItem: true,
      index: null,
      hasSaved: false,
      isEditing: null,
      model: null,
      options:[
        {
            id:1,
            name: "TSH",
            brand: "Vidas",
            category: "Endocrinology",
            testsPerUnit: "60",
            testsUsedPerDay: "20",
            get daysTillDepletion () {
                return this.testsPerUnit/this.testsUsedPerDay;
        }
        },
        {
            id:2,
            name: "B-HCG",
            brand: "Tosoh",
            category: "Endocrinology",
            testsPerUnit: "30",
            testsUsedPerDay: "10",
            get daysTillDepletion () {
                return this.testsPerUnit/this.testsUsedPerDay;
        }
        }
      ],
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