import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: lazy(() => import('./pages/Home')),
  },
  {
    path: "/pkg/:name",
    element: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:name/file/:filename/*",
    element: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:org/:name",
    element: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:org/:name/file/:filename/*",
    element: lazy(() => import('./pages/Preview')),
  },
];
