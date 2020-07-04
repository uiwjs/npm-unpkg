import React, { } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, matchPath, useLocation } from 'react-router-dom';
import dynamic from 'react-dynamic-loadable';
import { Routers } from '@uiw-admin/router-control';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState } from '../models';
import RenderChild from './RenderChild';

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
    LoadingComponent: () => <span>loading....</span>,
  });

const mapState = ({ global, loading }: RootState) => ({
  global: global,
  loading: loading.effects,
});

const mapDispatch = (dispatch: any) => ({});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps & {
  /**
   * 加载 models
   */
  loadModels?: (models: string[]) => Promise<any>[];
  loadingComponent?: JSX.Element;
  routes?: Routers[];
};


function BasicLayoutScreen(props = {} as Props) {
  const {routes, loadModels = () => []} = props;
  let location = useLocation();
  return (
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
  );
}

export default connect(mapState, mapDispatch)(BasicLayoutScreen);
