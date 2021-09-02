/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Divider from '@uiw/react-divider';
import Layout from '@uiw/react-layout';
import Button from '@uiw/react-button';
import Split from '@uiw/react-split';
import Modal from '@uiw/react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { DefaultProps } from '@uiw-admin/router-control';
import DirectoryTrees from './DirectoryTrees';
import ContentView from './Content';
import Search from '../../components/Search';
import { Params } from '../../models/global';
import { RootState, Dispatch } from '../../models';
import { PackageJSON } from '../../models/global';
import { ReactComponent as NPM } from './npm.svg';
import { ReactComponent as Github } from './github.svg';
import styles from './index.module.less';

const { Header, Content } = Layout;

export default function Preview(props = {} as DefaultProps) {
  const { showSearch, notFindPkg, package: Info, pkgname } = useSelector(({ global, loading }: RootState) => ({
    loading: loading.effects.global.getDirectoryTrees,
    pkgname: global.pkgname,
    notFindPkg: global.notFindPkg,
    package: (global.package || {}) as PackageJSON,
    showSearch: global.showSearch,
  }));

  const dispatch = useDispatch<Dispatch>();
  const params = useParams<Params>();
  const urlPkgName = `${params.org ? `${params.org}/` : ''}${params.name}`;
  useEffect(() => {
    if (!pkgname || urlPkgName !== pkgname) {
      dispatch.global.setPkgname(params);
      dispatch.global.getDirectoryTrees();
      dispatch.global.getPackageJSON();
    }
  }, [pkgname, urlPkgName, pkgname]);
  useEffect(() => {
    document.title = `${params.org ? `${params.org}/` : ''}${params.name} - NPM UNPKG`;
  }, [params.org, params.name]);
  useEffect(() => {
    dispatch.global.getFileContent(params.filename);
  }, [params.filename]);
  const nameView = useMemo(() => (
    <Button size="small" type="link" onClick={() => dispatch.global.update({ showSearch: true })} style={{ fontSize: 21 }}>
      {Info && Info.name ? `${Info.name}@${Info.version}` : urlPkgName}
    </Button>
  ), [Info.name, Info.version, params.org]);
  return (
    <Layout>
      <Header className={styles.header}>
        <Modal
          title="Select package"
          isOpen={showSearch}
          icon="information"
          type="primary"
          useButton={false}
          onConfirm={() => console.log('您点击了确定按钮！')}
          onCancel={() => console.log('您点击了取消按钮！')}
          onClosed={() => dispatch.global.update({ showSearch: false })}
        >
          <Search {...props} />
        </Modal>
        {nameView}
        {Info.name && (
          <Fragment>
            <Divider type="vertical" />
            <a href={`https://www.npmjs.com/package/${Info.name}/v/${Info.version}`} target="__blank">
              <NPM />
            </a>
            {Info.repository && (
              <Fragment>
                <Divider type="vertical" />
                <a
                  href={(typeof Info.repository === 'string' ? Info.repository : (Info.repository.url || '')).replace(/^git\+?/, '')}
                  className={styles.github}
                  target="__blank"
                >
                  <Github xlinkTitle="repository" />
                </a>
              </Fragment>
            )}
            {Info.homepage && (
              <Fragment>
                <Divider type="vertical" />
                <a href={Info.homepage} target="__blank">homepage</a>
              </Fragment>
            )}
            {Info.license && (
              <Fragment>
                <Divider type="vertical" />
                <span>{Info.license}</span>
              </Fragment>
            )}
            {Info.description && (
              <Fragment>
                <Divider type="vertical" />
                <span title={Info.description}>{Info.description}</span>
              </Fragment>
            )}
          </Fragment>
        )}
        {notFindPkg && (
          <Fragment>
            <Divider type="vertical" />
            <span>Cannot find package {urlPkgName}.</span>
          </Fragment>
        )}
      </Header>
      <Layout className={styles.warpper}>
        <Split className={styles.warpper} style={{ height: 100 }}>
          <div style={{ minWidth: 210, width: 210, overflow: 'auto', backgroundColor: '#fff' }}>
            <DirectoryTrees />
          </div>
          <Content style={{ minWidth: 100, flex: 1, overflow: 'auto', position: 'relative' }}>
            <ContentView />
          </Content>
        </Split>
      </Layout>
    </Layout>
  );
}
