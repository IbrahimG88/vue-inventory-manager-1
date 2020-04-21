/* eslint-disable vue/no-unused-components */
<template>
  <v-app>
    <v-content>
      <v-toolbar
      dark
      extended
      short
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>

 
      <v-toolbar-items>
       
      </v-toolbar-items>

<template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="tabLink('/todos')" >Tab 1</v-tab>
          <v-tab @click="tabLink('/inventory')">Inventory</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

     

       <p>
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
        <router-link to="/todos">Go to Todos</router-link>
                <router-link to="/addItem">Go to AddItem</router-link>
      </p>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
       
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="navBarLink(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>
     
      
    </v-content>
  </v-app>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import router from './router';

export default {
  name: "App",
  data (){
    return {
    drawer: true,
        items: [
          { title: 'Foo', icon: 'mdi-view-dashboard', route:'/foo'},
          { title: 'Photos', icon: 'mdi-image', route:'/todos' },
          { title: 'About', icon: 'mdi-help-box', route:'/bar' },
          { title: 'Inventory', icon: 'mdi-help-box', route:'/inventory' }
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: true,
        miniVariant: false,
        expandOnHover: false,
        background: false
  }
  },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      }
    },
    methods: {
      navBarLink (item) {
        if (this.$route.path !== item.route){
         this.$router.push(item.route);
          }
      },
      tabLink(route) {
         if (this.$route.path !== route){
          this.$router.push(route)
         }
      }
    }
};
</script>

<!-- Image extended short 
<v-toolbar
      dark
      extended
      short
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
    ... other components here
    </v-toolbar>
-->