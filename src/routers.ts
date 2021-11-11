import React, { lazy } from 'react';

export type Routes = {
  path: string;
  exact?: boolean;
  component: React.ReactNode;
}[];


export const routes: Routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: "/pkg/:name",
    component: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:name/file/:filename/*",
    component: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:org/:name",
    component: lazy(() => import('./pages/Preview')),
  },
  {
    path: "/pkg/:org/:name/file/:filename/*",
    component: lazy(() => import('./pages/Preview')),
  },
];