import React from 'react';
import { connect } from 'react-redux';
import Menu from '@uiw/react-menu';
import Tag from '@uiw/react-tag';
import { NavLink } from 'react-router-dom';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState, Dispatch } from '../../models';
import { Files } from '../../models/global';

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
  const { pkgname } = props;
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
          <Menu.Item
            tagName={NavLink}
            title={`/pkg/${pkgname}/file${item.path}`}
            to={`/pkg/${pkgname}/file${item.path}`}
            key={idx}
            addonAfter={
              <Tag color="#e0e0e0" title={item.size || ''} style={{color: '#333', padding: '1px 3px' ,transform: 'scale(.8)'}} />
            }
            icon="file-text"
            text={item.path.replace(/^\//, '')}
          />
        );
      }
    });
    return menuItems;
  }
  return (
    <Menu theme="light" bordered={false}>
      {renderMenuItem(props.files)}
    </Menu>
  );
}

export default connect(mapState, mapDispatch)(DirectoryTrees);