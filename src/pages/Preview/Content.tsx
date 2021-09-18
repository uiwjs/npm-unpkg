import { useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Loader from '@uiw/react-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { xml } from '@codemirror/lang-xml';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { RootState } from '../../models';
import styles from './Content.module.less';

const langs: Record<string, any> = {
  javascript,
  js: () => javascript(),
  jsm: () => javascript(),
  jsx: () => javascript({ jsx: true }),
  json,
  css,
  xml,
  html,
  htm: () => html(),
  map: () => json(),
  typescript: () => javascript({ typescript: true }),
  ts: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
}

export default function DirectoryTrees() {
  const { loading, content, extname } = useSelector(({ global, loading }: RootState) => ({
    loading: loading.effects.global.getFileContent,
    content: global.content,
    extname: global.extname,
    global,
  }));
  const { name, filename } = useParams<{ name: string; filename: string; }>();
  const filePath = `https://unpkg.com/browse/${name}/${filename || ''}`;
  const contentView = useMemo(() => {
    let ext = extname;
    switch (extname) {
      case 'tsx': ext = 'typescript'; break;
      case 'ts': ext = 'typescript'; break;
      case 'map': ext = 'json'; break;
      case 'markdown': ext = 'md'; break;
      default: break;
    }
    if (!content) return <Fragment />
    if (extname && (/(md|markdown)$/.test(extname))) {
      return (
        <Fragment>
          <div>
            <a className={styles.viewRaw} href={filePath} target="__blank">View Raw</a>
            <MarkdownPreview style={{ padding: 25 }} source={content || ''} />
          </div>
        </Fragment>
      );
    }
    if (extname && /(js|jsx|ts|css|tsx|json|map|html|htm)$/.test(extname)) {
      const extensions: Extension[] = [];
      if (langs[extname]) {
        extensions.push(langs[extname]());
      }
      return (
        <CodeMirror
          extensions={[...extensions]}
          editable={false}
          height="100%"
          value={content}
        />
      );
    }
    if (extname) {
      return <MarkdownPreview className={styles.code} source={`\`\`\`${ext}\n${content}\n\`\`\``} />;
    }
    return <pre style={{ padding: 25 }}>{content}</pre>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extname, content]);
  return (
    <Fragment>
      <Loader loading={loading} className={styles.loader}>
        {contentView}
      </Loader>
    </Fragment>
  );
}
