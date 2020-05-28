
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform'
window.Form = Form;
import moment from 'moment';

import Gate from './Gate';
Vue.prototype.$gate = new Gate(window.user);


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

//sweetAlert
import swal from 'sweetalert2'
window.swal = swal; 

//toaster
const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
  
});
window.Toast = Toast ;

//progress Bar
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '3px'
})

<<<<<<< HEAD
import Editor from 'vue-editor-js' 
Vue.use(Editor)


let routes = [
    { path: '/', component: require('./components/Home.vue') },
    { path: '/products', component: require('./components/Products.vue') },
    { path: '/about', component: require('./components/About.vue') },
=======
let routes = [
>>>>>>> 9a9b06a8b4634b781eab44388e2966b4778b5b85
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/profile', component: require('./components/Profile.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/developer', component: require('./components/Developer.vue') },
    { path: '*', component: require('./components/NotFound.vue') }    

  ]

  const router = new VueRouter({
    mode: 'history',
<<<<<<< HEAD
    base: process.env.BASE_URL,
    routes, 
=======
    routes , // short for `routes: routes`
>>>>>>> 9a9b06a8b4634b781eab44388e2966b4778b5b85
  
  })

  Vue.filter('upText',function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)  
  });

  Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY');
  });

  window.Fire = new Vue() ;

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//laravel Passport

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue')
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue')
);

Vue.component(
  'Not-Found',
  require('./components/NotFound.vue')
);

<<<<<<< HEAD
Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('Navbar',require('./components/Navbar.vue'));
Vue.component('add-to-cart',require('./components/AddToCart.vue'));
Vue.component('Products-list',require('./components/ProductList.vue'));
Vue.component('Hero',require('./components/Hero.vue'));
Vue.component('Login',require('./components/Login.vue'));

=======

Vue.component('example-component', require('./components/ExampleComponent.vue'));
>>>>>>> 9a9b06a8b4634b781eab44388e2966b4778b5b85

const app = new Vue({
    el: '#app',
    router,
    data: {
      search:''
    },
    methods: {
      //debounce is a lodash func that wait 1 sec until user write a keyword for searching 
      searchit: _.debounce(() => {
       Fire.$emit('searching'); 
      },1000)
    }
});
