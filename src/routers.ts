import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./pages/Home'),
  },
  {
    path: '/pkg/:name',
    lazy: () => import('./pages/Preview'),
  },
  {
    path: '/pkg/:name/file/:filename/*',
    lazy: () => import('./pages/Preview'),
  },
  {
    path: '/pkg/:org/:name',
    lazy: () => import('./pages/Preview'),
  },
  {
    path: '/pkg/:org/:name/file/:filename/*',
    lazy: () => import('./pages/Preview'),
  },
];
