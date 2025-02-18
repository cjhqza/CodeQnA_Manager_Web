// 导入组件
const Layout = () => import('@/layout/index.vue')
const aprvKnowledge = () => import('@/views/approval/aprvKnowledge.vue')
const aprvReport = () => import('@/views/approval/aprvReport.vue')

// 导出该组件
export default [
  {
    path: '/approval',
    component: Layout,
    name: 'approval',
    meta: {
      title: '审批管理',
    },
    icon: 'EditPen',
    children: [
      {
        path: '/aprvKnowledge',
        component: aprvKnowledge,
        name: 'aprvKnowledge',
        meta: {
          title: '知识审批',
        },
      },
      {
        path: '/aprvReport',
        component: aprvReport,
        name: 'aprvReport',
        meta: {
          title: '举报审批',
        },
      },
    ],
  },
]
