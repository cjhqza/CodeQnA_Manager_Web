// 导入组件
const Layout = () => import('@/layout/index.vue')
const dtUser = () => import('@/views/data/dtUser.vue')
const dtTag = () => import('@/views/data/dtTag.vue')
const dtKnowledge = () => import('@/views/data/dtKnowledge.vue')
const dtComment = () => import('@/views/data/dtComment.vue')
const dtChat = () => import('@/views/data/dtChat.vue')

// 导出该组件
export default [
  {
    path: '/data',
    component: Layout,
    name: 'data',
    meta: {
      title: '数据管理',
    },
    icon: 'Histogram',
    children: [
      {
        path: '/dtUser',
        component: dtUser,
        name: 'dtUser',
        meta: {
          title: '用户管理',
        },
      },
      {
        path: '/dtTag',
        component: dtTag,
        name: 'dtTag',
        meta: {
          title: '标签管理',
        },
      },
      {
        path: '/dtKnowledge',
        component: dtKnowledge,
        name: 'dtKnowledge',
        meta: {
          title: '知识管理',
        },
      },
      {
        path: '/dtComment',
        component: dtComment,
        name: 'dtComment',
        meta: {
          title: '评论管理',
        },
      },
      {
        path: '/dtChat',
        component: dtChat,
        name: 'dtChat',
        meta: {
          title: '聊天管理',
        },
      },
    ],
  },
]
