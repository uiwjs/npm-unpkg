import React, { useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '@uiw/react-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { RootState } from '../../models';
import styles from './Content.module.less';

export default function DirectoryTrees() {
  const { loading, content, extname } = useSelector(({ global, loading }: RootState) => ({
    loading: loading.effects.global.getFileContent,
    content: global.content,
    extname: global.extname,
    global,
  }));
  const contentView = useMemo(() => {
    let ext = extname;
    switch (extname) {
      case 'tsx': ext = 'typescript'; break;
      case 'ts': ext = 'typescript'; break;
      case 'map': ext = 'json'; break;
      case 'markdown': ext = 'md'; break;
      default: break;
    }
    if (extname === 'md') {
      return <MarkdownPreview style={{ padding: 25 }} source={content || ''} />
    }
    if (extname) {
      return <MarkdownPreview className={styles.code} source={`\`\`\`${ext}\n${content}\n\`\`\``} />
    }
    return <pre style={{ padding: 25 }}>{content}</pre>;
  }, [extname, content]);
  return (
    <Fragment>
      {loading && (
        <Loader
          loading={loading}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 999,
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.76)'
          }}
        />
      )}
      {contentView}
    </Fragment>
  );
}

// export default connect(mapState, mapDispatch)(DirectoryTrees);