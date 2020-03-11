import Vue from 'vue'
import app from './App.vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const Aclient = new ApolloClient({
  uri: "http://localhost:3000/graphql"
})

const aProvider = new VueApollo({
  defaultClient: Aclient,
})

Vue.use(VueApollo)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { app },
  provide: aProvider.provide(),
template: '<app/>'
})
// new Vue({
//   render: h => h(app),
//   aProvider,
// }).$mount('#app')
