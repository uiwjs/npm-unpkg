import React, {useState} from 'react';
import Input from '@uiw/react-input';
import Button from '@uiw/react-button';
import { connect } from 'react-redux';
import { DefaultProps } from '@uiw-admin/router-control';
import { Link }from 'react-router-dom';
import { RootState, Dispatch } from '../../models';
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
  const [value, setValue] = useState<string>();
  return (
    <div className={styles.content}>
      <h1>npm unpkg</h1>
      <Input
        className={styles.input}
        size="large"
        preIcon="search"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        addonAfter={
          <Button onClick={() => {
            props.setPkgname(value);
            props.history.push(`/pkg/${value}`);
          }} icon="arrow-right" size="small" basic type="light" />
        }
        placeholder="package or package@version"
      />
      <div className={styles.egLink}>
        <span>E.g.</span>
        <Link to="/pkg/react">react</Link>
        <Link to="/pkg/react@16">react@16</Link>
        <Link to="/pkg/react@16.8.0">react@16.8.0</Link>
      </div>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Home);