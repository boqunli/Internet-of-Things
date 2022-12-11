import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '主页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sleep',
    component: Layout,
    redirect: '/sleep/day',
    name: '睡眠管理',
    meta: { title: '睡眠管理', icon: 'el-icon-date', roles: ['admin', 'user'] },
    children: [
      // supplier
      {
        path: 'day',
        name: '每日睡眠',
        component: () => import('@/views/sleep/daySleep'),
        meta: { title: '每日睡眠', icon: 'table', roles: ['admin', 'user'] }
      },
      {
        path: 'statistic',
        name: '统计分析',
        component: () => import('@/views/sleep/statistic'),
        meta: { title: '统计分析', icon: 'table', roles: ['admin', 'user'] }
      },
    ]
  },
  {
    path: '/devices',
    component: Layout,
    redirect: '/devices/list',
    name: '设备管理',
    meta: { title: '设备管理', icon: 'el-icon-s-help', roles: ['admin', 'user'] },
    children: [
      // supplier
      {
        path: 'new',
        name: '新建设备',
        component: () => import('@/views/device/newDevice'),
        meta: { title: '新建设备', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'list',
        name: '设备列表',
        component: () => import('@/views/device/deviceList'),
        meta: { title: '设备列表', icon: 'table', roles: ['admin', 'user'] }
      },
      {
        path: 'data',
        name: '设备数据',
        component: () => import('@/views/device/deviceData'),
        meta: { title: '设备数据', icon: 'table', roles: ['admin', 'user'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    redirect: '/user/manage',
    meta: { title: '用户管理', icon: 'el-icon-s-help', roles: ['admin'] },
    children: [
      {
        path: 'manage',
        name: '设备数据',
        component: () => import('@/views/user/userManage'),
        meta: { title: '用户管理', icon: 'table', roles: ['admin'] }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
