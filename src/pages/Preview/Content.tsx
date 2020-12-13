import React, { useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import Loader from '@uiw/react-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState, Dispatch } from '../../models';
import styles from './Content.module.less';

const mapState = ({ global, loading }: RootState) => ({
  loading: loading.effects.global.getFileContent,
  content: global.content,
  extname: global.extname,
});

const mapDispatch = (dispatch: any) => ({
  update: (dispatch as Dispatch).global.update,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps;

function DirectoryTrees(props = {} as Props) {
  const { extname } = props;
  const content = useMemo(() => {
    let ext = extname;
    switch (extname) {
      case 'ts': ext = 'typescript'; break;
      case 'map': ext = 'json'; break;
      case 'markdown': ext = 'md'; break;
      default: break;
    }
    if (extname === 'md') {
      return <MarkdownPreview style={{ padding: 25 }} source={props.content} />
    }
    if (extname) {
      return <MarkdownPreview className={styles.code} source={`\`\`\`${ext}\n${props.content}\n\`\`\``} />
    }
    return <pre style={{ padding: 25 }}>{props.content}</pre>;
  }, [extname, props.content]);
  return (
    <Fragment>
      {props.loading && (
        <Loader
          loading={props.loading}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 999,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.76)'
          }}
        />
      )}
      {content}
    </Fragment>
  );
}

export default connect(mapState, mapDispatch)(DirectoryTrees);