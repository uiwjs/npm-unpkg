import { useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '@uiw/react-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeVideo from 'rehype-video';
import CodeMirror from '@uiw/react-codemirror';
import {  Extension } from '@codemirror/state';
import { StreamLanguage } from '@codemirror/language';
import { stylus } from '@codemirror/legacy-modes/mode/stylus';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { toml } from '@codemirror/legacy-modes/mode/toml';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { xml } from '@codemirror/lang-xml';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { usePath } from '../../hook/usePath';
import { RootState } from '../../models';
import styles from './Content.module.less';

const langs: Record<string, any> = {
  javascript,
  js: () => javascript(),
  mjs: () => javascript({ jsx: true }),
  cjs: () => javascript(),
  jsx: () => javascript({ jsx: true }),
  json,
  css,
  less: () => css(),
  styl: () => StreamLanguage.define(stylus),
  '.editorconfig': () => StreamLanguage.define(toml),
  xml,
  lock: () => StreamLanguage.define(yaml),
  yml: () => StreamLanguage.define(yaml),
  html,
  htm: () => html(),
  map: () => json(),
  typescript: () => javascript({ typescript: true }),
  ts: () => javascript({ typescript: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
};

export default function DirectoryTrees() {
  const { loading, content, extname } = useSelector(({ global, loading }: RootState) => ({
    loading: loading.effects.global.getFileContent,
    content: global.content,
    extname: global.extname,
    global,
  }));
  const path = usePath();
  const filePath = `https://unpkg.com/browse/${path.pkgName}/${path.filePath || ''}`;
  const contentView = useMemo(() => {
    // let ext = extname;
    // switch (extname) {
    //   case 'tsx':
    //     ext = 'typescript';
    //     break;
    //   case 'ts':
    //     ext = 'typescript';
    //     break;
    //   case 'map':
    //     ext = 'json';
    //     break;
    //   case 'markdown':
    //     ext = 'md';
    //     break;
    //   default:
    //     break;
    // }
    if (!content) return <Fragment />;
    if (extname && /(md|markdown)$/.test(extname)) {
      return (
        <Fragment>
          <div>
            <a className={styles.viewRaw} href={filePath} target="__blank">
              View Raw
            </a>
            <MarkdownPreview rehypePlugins={[rehypeVideo]} style={{ padding: 25 }} source={content || ''} />
          </div>
        </Fragment>
      );
    }
    if (extname || (extname && langs[extname])) {
      const extensions: Extension[] = [];
      if (langs[extname]) {
        extensions.push(langs[extname]());
      }
      return <CodeMirror extensions={[...extensions]} editable={false} height="100%" value={content} />;
    }
    return <pre style={{ padding: 25 }}>{content}</pre>;
  }, [extname, content, filePath]);

  return (
    <Fragment>
      <div style={{ position: 'absolute', zIndex: 9999, padding: 15 }}>
        <Loader loading={loading} className={styles.loader} tip="Loading" />
      </div>
      <Loader loading={loading} className={styles.loader}>
        {contentView}
      </Loader>
    </Fragment>
  );
}
