import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import EventList from '@/views/EventList.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: () =>
      import(/* webpackChunkName: "event-show" */ '../views/EventShow.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event

        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () =>
      import(/* webpackChunkName: "event-create" */ '../views/EventCreate.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
