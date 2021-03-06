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
    icon: 'svg-name'             the icon show in the sidebar
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
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'dashboard' }
    }]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice',
    meta: { title: '通知管理', icon: 'modify' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/notice/publish/index'),
        meta: { title: '通知发布', icon: 'publish' }
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/notice/modify/index'),
        meta: { title: '通知修改', icon: 'modify1' }
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/createexam',
    name: 'exam',
    meta: {
      title: '考试管理',
      icon: 'examRecord'
    },
    children: [
      {
        path: 'createexam',
        component: () => import('@/views/exam/ExamDetail'),
        name: 'CreateExam',
        meta: { title: '创建试卷', icon: 'exam' }
      },
      {
        path: 'modexam',
        component: () => import('@/views/exam/ModExamDetail'),
        name: 'ModExam',
        meta: { title: '新建试题', icon: 'exam1' }
      },
      {
        path: 'queryExamScore',
        component: () => import('@/views/exam/exam-score'),
        name: 'queryExamScore',
        meta: {
          title: '考试成绩',
          icon: 'chengji-'
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/dingding',
    name: 'Example',
    meta: {
      title: '钉钉通知',
      icon: 'example'
    },
    children: [
      {
        path: 'dingding',
        component: () => import('@/views/dingding/dingding'),
        name: 'dingding',
        meta: {
          title: '发送钉钉通知',
          icon: 'dingding'
        }
      }]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/createSurvey',
    name: 'test',
    meta: {
      title: '调查问卷',
      icon: 'bianji2'
    },
    children: [
      {
        path: 'createSurvey',
        component: () => import('@/views/survey/create-survey'),
        name: 'createSurvey',
        meta: {
          title: '新建调查问卷',
          icon: 'icon-test'
        }
      },
      {
        path: 'createSurveyItem',
        component: () => import('@/views/survey/create-survey-item'),
        name: 'createSurveyItem',
        meta: {
          title: '调查问卷明细',
          icon: 'bianji2'
        }
      },
      {
        path: 'createSurveyResult',
        component: () => import('@/views/survey/create-survey-result'),
        name: 'createSurveyResult',
        meta: {
          title: '问卷结果汇总',
          icon: 'huizong'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
