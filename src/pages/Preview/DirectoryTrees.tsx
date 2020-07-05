import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import Menu from '@uiw/react-menu';
import Tag from '@uiw/react-tag';
import Loader from '@uiw/react-loader';
import { NavLink } from 'react-router-dom';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState, Dispatch } from '../../models';
import { Files } from '../../models/global';
import styles from './DirectoryTrees.module.less';

const prettyBytes = (num: number, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

function MeunItemView(props: { path?: string, filepath?: string; size?: number } = {}) {
  return useMemo(() => (
    <Menu.Item
      tagName={NavLink}
      title={props.filepath}
      to={`/pkg/${props.path}`}
      addonAfter={
        <Tag color="#e0e0e0" title={(props.size && prettyBytes(props.size)) || ''} className={styles.tags} />
      }
      icon="file-text"
      text={props.filepath!.replace(/^\//, '')}
    />
  ), [props.path, props.size, props.filepath]);
}

const mapState = ({ global, loading }: RootState) => ({
  loading: loading.effects.global.getDirectoryTrees,
  files: global.files,
  pkgname: global.pkgname,
});

const mapDispatch = (dispatch: any) => ({
  update: (dispatch as Dispatch).global.update,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps;

function DirectoryTrees(props = {} as Props) {
  const { pkgname, loading } = props;

  function renderMenuItem(data: Files[] = [], menuItems: any = []) {
    data.forEach((item, idx) => {
      if (item.type === 'directory') {
        menuItems.push(
          <Menu.SubMenu key={idx} icon="folder" text={item.path.replace(/^\//, '')} >
            {renderMenuItem(item.files)}
          </Menu.SubMenu>
        );
      } else if (item.type === 'file') {
        menuItems.push(
          <MeunItemView key={idx} path={`${pkgname}/file${item.path}`} filepath={item.path} />
        );
      }
    });
    return menuItems;
  }
  return (
    <Loader loading={loading} style={{ width: '100%'}}>
      <Menu theme="light" bordered={false}>
        {renderMenuItem(props.files)}
      </Menu>
    </Loader>
  );
}

export default connect(mapState, mapDispatch)(DirectoryTrees);