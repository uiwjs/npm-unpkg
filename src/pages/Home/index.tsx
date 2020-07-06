import React from 'react';
import { connect } from 'react-redux';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState, Dispatch } from '@/models';
import Search from '@/components/Search';
import styles from './index.module.less';

const mapState = ({ global, loading }: RootState) => ({
  loading: loading.effects.global,
  pkgname: global.pkgname,
});

const mapDispatch = (dispatch: any) => ({
  update: (dispatch as Dispatch).global.update,
  setPkgname: (dispatch as Dispatch).global.setPkgname,
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps;

function Home(props = {} as Props) {
  return (
    <div className={styles.content}>
      <h1>npm unpkg</h1>
      <Search {...props}/>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Home);