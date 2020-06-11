<template>
  <div>
    <h3>Add Item</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="number" v-model="item.id" placeholder="id..." />
        <input type="text" v-model="item.name" placeholder="name..." />
        <input type="text" v-model="item.brand" placeholder="brand..." />
        <input type="text" v-model="item.category" placeholder="category..." />
        <input type="number" v-model="item.testsPerUnit" placeholder="testsPerUnit..." />
        <input type="number" v-model="item.testsUsedPerDay" placeholder="testsUsedPerDay..." />
        daysTillDepletion: {{ daysTillDepletion != Infinity && daysTillDepletion  ? daysTillDepletion : "Complete the data" }}
        <input
          type="submit"
          value="Submit"
        />
      </form>
    </div>
    <v-form>
      <v-container>
        <v-col
        cols="12"
        md="3">
          <v-text-field 
            v-model = "item.id"
            label= "Id"
            required
          />
          <v-text-field 
            v-model = "item.name"
            label= "Name"
            required
          />
          <v-text-field 
            v-model = "item.brand"
            label= "Brand or Instrument"
            required
          />
          <v-text-field 
            v-model = "item.category"
            label= "Category"
            required
          />
          <v-text-field 
            v-model = "item.testsPerUnit"
            label= "Tests Per Unit"
            required
          />
          <v-text-field 
            v-model = "item.testsUsedPerDay"
            label= "Tests Used Per Day"
            required
          />
          <v-text-field 
            v-model = "daysTillDepletion"
            label= "Days Till Depletion"
          />
        </v-col>
        <v-row>
        <v-btn color="success" @click="submitItem">Submit Item</v-btn>
        <v-col
        cols="12"
        md="1"></v-col>
        <v-btn @click="clear">Clear</v-btn>
        </v-row>
      </v-container>
    </v-form>
    
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddItem",
  data() {
    return {
      item: {
        id: "",
        title: "",
        name: "",
        brand: "",
        category: "",
        testsPerUnit: "",
        testsUsedPerDay: ""
      },
      firstname: ""
    };
  },
  computed: {
    daysTillDepletion() {
      if(this.item.testsPerUnit != 0 && this.item.testsUsedPerDay != 0){
      return (this.item.testsPerUnit / this.item.testsUsedPerDay).toFixed(1);
      }
      else {
        return ""
      }
    }
  },
  methods: {
    ...mapActions(["addItem"]),
    onSubmit(e) {
      e.preventDefault();
      // this.title is bound to the data() title upthere
      this.item.daysTillDepletion = this.daysTillDepletion;
      this.addItem(this.item);

      this.item = {
        id: "",
        title: "",
        name: "",
        brand: "",
        category: "",
        testsPerUnit: "",
        testsUsedPerDay: ""
      };
    },
    submitItem() {
          this.item.daysTillDepletion = this.daysTillDepletion;
          this.addItem(this.item);
          this.clear();
    },
    clear() {
        this.item = {
            id: "",
            title: "",
            name: "",
            brand: "",
            category: "",
            testsPerUnit: "",
            testsUsedPerDay: ""
      };
    }
  }
};
</script>

<style>
</style>