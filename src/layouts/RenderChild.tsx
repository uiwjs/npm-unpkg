/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {RoutersProps} from './BasicLayout';
interface Props {
  routes?: RoutersProps[];
  child?: any;
  match?: any;
}

const RenderChild = (props: Props = {}) => {
  const { match, child: Child } = props;
  let history = useHistory();
  let location = useLocation();
  // console.log('history:', history.location.key)
  // console.log('pathname:', history.location.pathname)
  return useMemo(() => {
    return (
      <Child match={match} history={history} location={location} />
    );
  }, [history.location.key]);
};

export default RenderChild 
