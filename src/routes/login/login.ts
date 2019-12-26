
export default [{
  path: '/login',
  name: 'login',
  component: () => import('@/components/login/main.vue')
}, {
  path: '/mobile-login',
  name: 'mobile-login',
  component: () => import('@/components/login/mobile-login.vue')
},
{
  path: '/password',
  name: 'password',
  component: () => import('@/components/login/password.vue')
},
{
  path: '/yzm',
  name: 'yzm',
  component: () => import('@/components/login/yzm.vue')
}];
