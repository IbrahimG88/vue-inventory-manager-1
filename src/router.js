import VueRouter from 'vue-router';
import Vue from 'vue';
import Bar from './components/Bar';
import Foo from './components/Foo';
import Todos from './components/Todos';



Vue.use(VueRouter);

 const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/todos', component: Todos }
  ];



export const router = new VueRouter({
    routes // short for `routes: routes`
  });