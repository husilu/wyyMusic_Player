
export default [{
  path: '/',
  component: () => import('@/components/home/main.vue'),
  redirect: '/discover',
  children: [
    {
      path: '/discover',
      component: () => import('@/components/discover-page/main.vue'),
      meta: { title: 'discover-page-index' },
      name: 'discover-page-index',
      redirect: '/discover/index',
      children: [
        {
          path: '/discover/index',
          component: () => import('@/components/discover-page/discover/discover.vue'),
          meta: { title: 'discover-index' },
          name: 'discover-index'
        },
        {
          path: '/discover/search',
          component: () => import('@/components/discover-page/search/main.vue'),
          meta: { title: 'search' },
          name: 'search'
        },
        {
          path: '/discover/searchList',
          component: () => import('@/components/discover-page/search/searchlist.vue'),
          meta: { title: 'search-list' },
          name: 'search-list'
        }
      ]
    }
  ]
}];
// export default dashboard;
