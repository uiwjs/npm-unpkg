import { Routers } from '@uiw-admin/router-control';

export const routers: Routers[] = [
  {
    path: '/',
    component: () => import('../layouts/BasicLayout'),
    routes: [
      {
        path: '/',
        component: () => import('../pages/Home'),
      },
      {
        path: "/pkg/:name",
        component: () => import('../pages/Preview'),
      },
      {
        path: "/pkg/:name/file/:filename(.*)",
        component: () => import('../pages/Preview'),
      },
      {
        path: "/pkg/:org/:name",
        component: () => import('../pages/Preview'),
      },
      {
        path: "/pkg/:org/:name/file/:filename(.*)",
        component: () => import('../pages/Preview'),
      },
    ],
  },
];
