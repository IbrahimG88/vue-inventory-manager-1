/* eslint-disable vue/no-unused-components */
<template>
  <v-app>
    <v-content>
      <p>
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
      </p>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
      <Todos />
    </v-content>
  </v-app>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: "App",
  components:{
    Todos
  }
};
</script>
