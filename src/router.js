import VueRouter from 'vue-router';
import Vue from 'vue';
import Bar from './components/Bar';
import Foo from './components/Foo';



Vue.use(VueRouter);

 const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ];



export const router = new VueRouter({
    routes // short for `routes: routes`
  });