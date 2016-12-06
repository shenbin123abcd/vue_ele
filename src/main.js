import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      redirect: '/goods' ,
    },
    {
      name: 'goods',
      path: '/goods',
      component: goods ,
    },
    {
      name: 'ratings',
      path: '/ratings',
      component: ratings ,
    },
    {
      name: 'seller',
      path: '/seller',
      component: seller ,
    },
  ]
});


const myVueApp = new Vue({
  router ,
  el: '#root',
  render: h => h(App)
});



