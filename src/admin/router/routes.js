export default [
  {
    path: '/',
    component: () => import('../pages/authorization'),
    meta: {
      public: true
    }
  },
  {
    path: '/about',
    component: () => import('../pages/about'),
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: '/projects',
    component: () => import('../pages/projects'),
    meta: {
      title: "Блок «Работы»"
    }
  },
  {
    path: '/reviews',
    component: () => import('../pages/reviews'),
    meta: {
      title: "Блок «Отзывы»"
    }
  }
];