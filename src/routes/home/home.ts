
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
    },
    {
      path: '/gdsquare',
      name: 'gdsquare',
      component: () => import('@/components/gedanguangchang/main.vue')
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: () => import('@/components/song-list/main.vue')
    },
    {
      path: '/wd',
      name: 'wd',
      component: () => import('@/components/wd/main.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('@/components/comment/main.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/components/account/main.vue')
    },
    {
      path: '/zjdetail',
      name: 'zjdetail',
      component: () => import('@/components/discover-page/xdxg/zjdetail.vue')
    }
  ]
}];
// export default dashboard;
