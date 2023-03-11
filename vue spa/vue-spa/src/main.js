import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import $ from 'jquery'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use($)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Router)

const router = new Router({
 routes: [
   {
     path: '/',
     name:'home'
   }
 ]
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})