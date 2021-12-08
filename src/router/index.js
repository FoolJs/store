import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import tokenStore from '../store/token';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/goods/:category',
        name: 'Goods',
        props: true,
        component: () => import('../views/Goods'),
    },
    {
        path: '/goods-details/:name',
        name: 'GoodsDetails',
        props: true,
        component: () => import('../views/GoodsDetails'),
    },
    {
      path: '/shopping-cart',
      name: 'ShoppingCart',
      component: () => import('../views/ShoppingCart')
    },
    {
      path: '/address',
      name: 'Address',
      component: () => import('../views/Address')
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach( async (to, from , next) => {
  if ( !tokenStore.state.token ) {
    tokenStore.state.token = localStorage.getItem( 'token' );
  }
  next();
} );



export default router
