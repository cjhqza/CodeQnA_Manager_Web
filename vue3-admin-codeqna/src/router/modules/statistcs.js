const Layout = () => import('@/layout/index.vue')

const statsKnowledge = () => import('@/views/statistcs/statsKnowledge.vue')

export default [
  {
    path: '/statistcs',
    component: Layout,
    name: 'statistcs',
    meta: {
      title: '活跃统计',
    },
    icon: 'DataAnalysis',
    children: [
      {
        path: '/statsKnowledge',
        name: 'statsKnowledge',
        component: statsKnowledge,
        meta: {
          title: '知识统计',
        },
      },
    ],
  },
]
