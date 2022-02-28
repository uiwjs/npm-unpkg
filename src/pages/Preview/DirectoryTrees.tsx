import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Menu, { MenuItemProps } from '@uiw/react-menu';
import Tag from '@uiw/react-tag';
import Loader from '@uiw/react-loader';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../models';
import { Files } from '../../models/global';
import styles from './DirectoryTrees.module.less';
import { ReactComponent as Markdown } from './icons/markdown.svg';
import { ReactComponent as TypeScript } from './icons/typescript.svg';
import { ReactComponent as CSS } from './icons/css3.svg';
import { ReactComponent as JavaScript } from './icons/javascript.svg';
import { ReactComponent as Json } from './icons/json.svg';
import { ReactComponent as JavaScriptMap } from './icons/javascript.map.svg';
import { ReactComponent as ReactSVG } from './icons/react.svg';
import { ReactComponent as License } from './icons/license.svg';

const prettyBytes = (num: number, precision = 3, addSpace = true) => {
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
  const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
  const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
  return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
};

function MeunItemView(props: { path?: string; filepath?: string; size?: number } = {}) {
  const menuProps: MenuItemProps<any> = {};
  const iconName = (props.filepath || '').toLocaleLowerCase();
  if (/.md$/.test(iconName)) {
    menuProps.icon = <Markdown />;
  } else if (/.(ts|tsx)$/.test(iconName)) {
    menuProps.icon = <TypeScript />;
  } else if (/license$/.test(iconName)) {
    menuProps.icon = <License />;
  } else if (/.(css|styl|less)$/.test(iconName)) {
    menuProps.icon = <CSS />;
  } else if (/.(json)$/.test(iconName)) {
    menuProps.icon = <Json />;
  } else if (/.(js\.map)$/.test(iconName)) {
    menuProps.icon = <JavaScriptMap />;
  } else if (/.(js|mjs)$/.test(iconName)) {
    menuProps.icon = <JavaScript />;
  } else if (/.(jsx)$/.test(iconName)) {
    menuProps.icon = <ReactSVG />;
  } else {
    menuProps.icon = 'file-text';
  }

  return useMemo(
    () => (
      <Menu.Item
        tagName={NavLink}
        title={props.filepath}
        // @ts-ignore
        to={`/pkg/${props.path}`}
        addonAfter={
          <Tag color="#e0e0e0" title={(props.size && prettyBytes(props.size)) || ''} className={styles.tags} />
        }
        {...menuProps}
        text={props.filepath!.replace(/^\//, '')}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.path, props.size, props.filepath],
  );
}

export default function DirectoryTrees() {
  const location = useLocation();
  const { loading, files, pkgname } = useSelector(({ global, loading }: RootState) => ({
    loading: loading.effects.global.getDirectoryTrees,
    files: global.files,
    pkgname: global.pkgname,
  }));

  const pathname = location.pathname.replace(new RegExp(`/pkg/${pkgname}/file`), '');

  function renderMenuItem(data: Files[] = [], menuItems: any = []) {
    data.forEach((item, idx) => {
      if (item.type === 'directory') {
        const collapse = new RegExp(`^${item.path}`).test(pathname);
        menuItems.push(
          <Menu.SubMenu
            key={idx}
            icon="folder"
            overlayProps={{
              isOpen: collapse,
            }}
            style={{ color: '#1d64ce' }}
            text={item.path.replace(/^\//, '').replace(/(.+?).\//g, '')}
          >
            {renderMenuItem(item.files)}
          </Menu.SubMenu>,
        );
      } else if (item.type === 'file') {
        const filename = item.path.replace(/(.+?)\//g, '');
        menuItems.push(
          <MeunItemView key={idx} path={`${pkgname}/file${item.path}`} filepath={filename} size={item.size} />,
        );
      }
    });
    return menuItems;
  }
  return (
    <Loader loading={loading} style={{ width: '100%' }}>
      <Menu theme="light" bordered={false}>
        {renderMenuItem(files)}
      </Menu>
    </Loader>
  );
}
