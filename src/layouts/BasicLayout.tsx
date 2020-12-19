/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route, Redirect, matchPath, useLocation } from 'react-router-dom';
import dynamic from 'react-dynamic-loadable';
import { Routers } from '@uiw-admin/router-control';
import { DefaultProps } from '@uiw-admin/router-control';
import GitHubCorners from '@uiw/react-github-corners';
import RenderChild from './RenderChild';
import Loading from '../components/Loading';

export interface RoutersProps {
  path: string;
  key?: string;
  redirect?: string;
  name?: string;
  icon?: string;
  component?: () => Promise<React.ReactNode>;
  models?: string[];
  routes?: RoutersProps[];
}

// wrapper of dynamic
const dynamicWrapper = (component: () => Promise<any>, modelFun: Promise<any>[]) =>
  dynamic({
    models: (modelFun || null) as any,
    component,
    LoadingComponent: () => <Loading />,
  });

type Props = DefaultProps & {
  /**
   * 加载 models
   */
  loadModels?: (models: string[]) => Promise<any>[];
  loadingComponent?: JSX.Element;
  routes?: Routers[];
};

export default function BasicLayoutScreen(props = {} as Props) {
  const {routes, loadModels = () => []} = props;
  let location = useLocation();
  return (
    <div>
      <GitHubCorners
        target="__blank"
        bgColor="#202225"
        size={54}
        href="https://github.com/uiwjs/npm-unpkg"
      />
      <Switch >
        {routes.map((item, index) => {
          if (!item.path) {
            return null;
          }
          if (props.location.pathname === item.path && item.redirect) {
            return (
              <Redirect to={item.redirect} key={index}/>
            );
          }
          if (!item.component) {
            return null;
          }
          const modelFun = loadModels(item.models || []);
          const Com = dynamicWrapper(item.component, modelFun) as any;
          const match = matchPath(location.pathname, {
            path: item.path,
          });
          return (
            <Route
              exact
              strict
              key={index}
              path={item.path}
              render={(childProps) => (
                <RenderChild
                  {...props}
                  {...childProps}
                  routes={item.routes || []}
                  match={match}
                  child={Com}
                />
              )}
            />
          );
        })}
      </Switch>
    </div>
  );
}
