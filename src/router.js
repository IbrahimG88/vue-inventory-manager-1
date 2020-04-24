import VueRouter from 'vue-router';
import Vue from 'vue';
import Bar from './components/Bar';
import Foo from './components/Foo';
import Todos from './components/Todos';
import AddItem from './components/AddItem';
import Inventory from './components/Inventory';
import Inventory2 from './components/Inventory2';



Vue.use(VueRouter);

 const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/todos', component: Todos },
    { path: '/addItem', component: AddItem },
    { path: '/inventory', component: Inventory },
    { path: '/inventory2', component: Inventory2 }
  ];



export const router = new VueRouter({
    routes // short for `routes: routes`
  });