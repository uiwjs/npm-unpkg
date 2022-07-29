import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: lazy(() => import('./pages/Home')) as unknown as React.ReactNode,
  },
  {
    path: '/pkg/:name',
    element: lazy(() => import('./pages/Preview')) as unknown as React.ReactNode,
  },
  {
    path: '/pkg/:name/file/:filename/*',
    element: lazy(() => import('./pages/Preview')) as unknown as React.ReactNode,
  },
  {
    path: '/pkg/:org/:name',
    element: lazy(() => import('./pages/Preview')) as unknown as React.ReactNode,
  },
  {
    path: '/pkg/:org/:name/file/:filename/*',
    element: lazy(() => import('./pages/Preview')) as unknown as React.ReactNode,
  },
];
