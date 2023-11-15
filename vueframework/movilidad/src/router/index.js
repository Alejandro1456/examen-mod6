import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/empleado',
    name: 'empleado',
    component: () => import(/* webpackChunkName: "empleado" */ '../views/Empleado.vue')
  },
  {
    path: '/empleado/:id',
    name: 'empleadoUpdate',
    component: () => import(/* webpackChunkName: "empleadoUpdate" */ '../views/EmpleadoUpdate.vue')
  }
  ,
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: () => import(/* webpackChunkName: "vehiculo" */ '../views/Vehiculos.vue')
  },
  {
    path: '/vehiculo/:id',
    name: 'vehiculoUpdate',
    component: () => import(/* webpackChunkName: "vehiculoUpdate" */ '../views/VehiculoUpdate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
