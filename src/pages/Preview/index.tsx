/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Divider from '@uiw/react-divider';
import Layout from '@uiw/react-layout';
import Button from '@uiw/react-button';
import Split from '@uiw/react-split';
import Modal from '@uiw/react-modal';
import { connect } from 'react-redux';
import { DefaultProps } from '@uiw-admin/router-control';
import DirectoryTrees from './DirectoryTrees';
import ContentView from './Content';
import Search from '@/components/Search';
import { Params } from '@/models/global';
import { RootState, Dispatch } from '@/models';
import styles from './index.module.less';

const { Header, Content } = Layout;

const mapState = ({ global, loading }: RootState) => ({
  loading: loading.effects.global.getDirectoryTrees,
  pkgname: global.pkgname,
  package: global.package,
  showSearch: global.showSearch,
});

const mapDispatch = (dispatch: any) => ({
  update: (dispatch as Dispatch).global.update,
  setPkgname: (dispatch as Dispatch).global.setPkgname,
  getDirectoryTrees: (dispatch as Dispatch).global.getDirectoryTrees,
  getFileContent: (dispatch as Dispatch).global.getFileContent,
  getPackageJSON: (dispatch as Dispatch).global.getPackageJSON,
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps;

function Preview(props = {} as Props) {
  const { pkgname, package: Info, showSearch, setPkgname, getDirectoryTrees, getFileContent, getPackageJSON } = props;

  const params = useParams<Params>();
  const urlPkgName = `${params.org ? `${params.org}/` : ''}${params.name}`;
  useEffect(() => {
    if (!pkgname || urlPkgName !== pkgname) {
      setPkgname(params);
      getDirectoryTrees();
      getPackageJSON();
    }
  }, [pkgname, urlPkgName, pkgname]);
  useEffect(() => {
    document.title = `${params.org ? `${params.org}/` : ''}${params.name} - NPM UNPKG`;
  }, [params.org, params.name]);
  useEffect(() => {
    getFileContent(params.filename);
  }, [params.filename]);
  const nameView = useMemo(() => (
    <Button size="small" type="link" onClick={() => props.update({ showSearch: true })} style={{ fontSize: 21 }}>
      {Info.name ? `${Info.name}@${Info.version}` : urlPkgName}
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
          onClosed={() => props.update({ showSearch: false })}
        >
          <Search {...props} />
        </Modal>
        {nameView}
        {Info.name && (
          <Fragment>
            <Divider type="vertical" />
            <a href={`https://www.npmjs.com/package/${Info.name}/v/${Info.version}`} target="__blank">npm</a>
            {Info.homepage && (
              <Fragment>
                <Divider type="vertical" />
                <a href={Info.homepage} target="__blank">homepage</a>
              </Fragment>
            )}
            {Info.repository && (
              <Fragment>
                <Divider type="vertical" />
                <a href={typeof Info.repository === 'string' ? Info.repository : (Info.repository.url || '')} target="__blank">repository</a>
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

export default connect(mapState, mapDispatch)(Preview);