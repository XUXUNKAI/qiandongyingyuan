import Vue from 'vue'

import axios from 'axios'

import VueAxios from 'vue-axios'

import VueCookies from 'vue-cookies'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'


import App from './App.vue'
import router from './router'


Vue.use(VueAxios, axios)

Vue.use(VueCookies)

Vue.use(ElementUI)


Vue.config.productionTip = false

//设置基础请求路径
axios.defaults.baseURL = 'http://182.92.95.116'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//携带cookie
axios.defaults.withCredentials = true

//添加axios请求拦截器, 该方法在请求之前触发
axios.interceptors.request.use(config => {
  // 

  if (config.method === 'post') {
    //进行data参数序列化
    //config.data: 参数
    if (config.data) {
      let dataString = '';

      for (let key in config.data) {
        dataString += key + '=' + config.data[key] + '&'
      }

      config.data = dataString.slice(0, -1);
      
    }

  }

  return config;

}, err => {

  return Promise.reject(err);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
