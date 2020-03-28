<template>
  <div>
		<h3> Add Item </h3>
		<div class="add">
			<form @submit="onSubmit">
                <input type="number" v-model="item.id" placeholder="id...">
				<input type="text" v-model="item.name" placeholder="name...">
                <input type="text" v-model="item.brand" placeholder="brand...">
                <input type="text" v-model="item.category" placeholder="category...">
                <input type="number" v-model="item.testsPerUnit" placeholder="testsPerUnit...">
                <input type="number" v-model="item.testsUsedPerDay" placeholder="testsUsedPerDay...">
                daysTillDepletion: {{ item.testsPerUnit / item.testsUsedPerDay }}
               <input type="submit" value="Submit">
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "AddItem",
    data(){
		return {
            item:{
            id:'',
            title: '',
            name: '',
            brand: '',
            category: '',
            testsPerUnit:'',
            testsUsedPerDay: '',
            get daysTillDepletion () {
                return this.testsPerUnit/this.testsUsedPerDay;
            }
        }
		}
    },
    methods:{
    ...mapActions(['addItem']),
		onSubmit(e) {
			e.preventDefault();
			// this.title is bound to the data() title upthere
			this.addItem(this.item);
        }
    }
}
</script>

<style>

</style>