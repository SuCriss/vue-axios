import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './http'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'a2f22d847417c04d57c374bfd2789337',
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  uiVersion:"1.0"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
