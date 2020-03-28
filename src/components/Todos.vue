<template>
  <div>
      <h3>
          Todos
      </h3>
      <div v-for= "todo in allTodos" v-bind:key="todo.id"  class="todo">
		{{ todo.title }}
	</div>
    <div v-for= "item in allInventory" v-bind:key="item.id"  class="inventoryItem">
		{{ item }}
	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "Todos",
    computed: mapGetters(['allTodos', 'allInventory'])
}
</script>

<style>

</style>