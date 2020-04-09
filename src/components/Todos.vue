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
    <model-list-select
      :list="allInventory"
      v-model="objectItem"
      option-value="id"
      :custom-text="codeAndNameAndDesc"
      placeholder="select item"
    ></model-list-select>

    <!-- to fix the empty curly braces appearing on screen while object empty-->
    <div v-if="Object.keys(objectItem).length !== 0">{{ objectItem }}</div>
    <div>
      <button @click="calculateTimeDifference">calculate time</button>
    </div>
    <div>
      DaysTillDepletion: {{item.daysTillDepletion}}
      <button
        @click="calculateDaysTillDepletion"
      >calculate days till depletion</button>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { ModelListSelect } from "vue-search-select";
import { DateTime } from "luxon";
// eslint-disable-next-line no-unused-vars
import Interval from "luxon/src/interval.js";
import { db } from "@/main";

export default {
  name: "Todos",
  data() {
    return {
      //fpr luxon:
      //lastSavedTimets: ,
      //lastSavedTimedt:,
      duration: 0,
      //
      objectItem: {},
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
        name: "Hello world",
        brand: "",
        category: "",
        testsPerUnit: "",
        testsUsedPerDay: "",
        daysTillDepletion: "300"
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
    codeAndNameAndDesc(item) {
      return `${item.name} - ${item.category} - ${item.brand}`;
    },
    reset1() {
      this.objectItem = {};
    },
    selectFromParentComponent1() {
      // select option from parent component
      this.objectItem = this.options[0];
    },
    async calculateTimeDifference() {

      let lastSavedTimets = await db.collection("appVariables").orderBy('createdAt').limit(1).get();
      let lastSavedTimedt = DateTime.fromMillis(lastSavedTimets);
      //let now = DateTime.local();
      //timestamp ts
      // for now
      let ts = new Date().getTime(); //timestamp 3434324 for firebase
      let dt = DateTime.fromMillis(ts);//datetime to be used in interval 


      console.log("ts", ts);
        console.log("dt", dt);
      let i = Interval.fromDateTimes(lastSavedTimedt, dt);
      let duration = i.toDuration("seconds").toObject();
      let seconds = JSON.stringify(duration.seconds);
      this.duration = seconds;

      lastSavedTimets = new Date().getTime();//timestamp 23993294
      lastSavedTimedt =  DateTime.fromMillis(lastSavedTimets); // datetime
      
      //from the data()
   // this.lastSavedTimets = lastSavedTimets;
    //  this.lastSavedTimedt = lastSavedTimedt;

      await db.collection("appVariables").add({
        lastSavedTimets: lastSavedTimets
      });
      console.log(seconds);
    },
    calculateDaysTillDepletion() {
      let timePassed = this.duration;
      console.log("time passed:" + timePassed);
      this.allInventory.forEach(item => {
        item.daysTillDepletion = (item.daysTillDepletion - timePassed).toFixed(
          1
        );

        return item;
      });
    }
  },
  mounted() {
    console.log(this.lastSavedTime);
  },
  computed: mapGetters(["allTodos", "allInventory"])
};
</script>

<style>
</style>