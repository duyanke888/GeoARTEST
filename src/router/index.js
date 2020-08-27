import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import geoar from '@/components/geoar'
import AFrame from '@/components/AFrame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '',
      name: 'geoar',
      component: geoar
    },
    {
      path: '',
      name: 'AFrame',
      component: AFrame
    }
  ]
})
