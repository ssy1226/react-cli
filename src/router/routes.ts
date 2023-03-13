import { lazy } from 'react'
const Index = lazy(() => import(/* webpackChunkName: "Index" */ '@/pages/index/index'))
const About = lazy(() => import(/* webpackChunkName: "About" */ '@/pages/about/index'))
const Login = lazy(() => import(/* webpackChunkName: "Detail" */ '@/pages/detail/index'))
const Daily = lazy(() => import(/* webpackChunkName: "Detail" */ '@/pages/dailyReport/index'))
const Yearly = lazy(() => import(/* webpackChunkName: "Detail" */ '@/pages/yearlyReport/index'))

export interface RouteConfig {
  path: string
  component?: any
  exact?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/index',
    component: Index,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '/daily',
    component: Daily,
    exact: true
  },{
    path: '/yearly',
    component: Yearly,
    exact: true
  }
]
