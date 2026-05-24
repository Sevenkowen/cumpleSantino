const routes = [
  {
    path: '/qr-pantalla',
    name: 'qr-pantalla',
    component: () => import('pages/QRScanPage.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'qr',
        name: 'qr',
        component: () => import('pages/QRPage.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
