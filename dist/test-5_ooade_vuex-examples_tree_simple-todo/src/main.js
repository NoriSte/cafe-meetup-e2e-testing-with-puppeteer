import Vue from 'vue'

import App from './App.vue'
import store from '../store'

global.vueInstance = new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
