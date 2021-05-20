import React, { useMemo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '@uiw/react-loader';
import rehypeRewrite, { RehypeRewriteHandle } from 'rehype-rewrite';
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
    if (!content) return <Fragment />
    if (extname === 'md') {
      return <MarkdownPreview style={{ padding: 25 }} source={content || ''} />
    }
    if (extname === 'json') {
      const npmPkgName: string[] = []
      try {
        const pkg = JSON.parse(content || '{}')
        if (pkg.name && pkg.version) {
          if (pkg.devDependencies && Object.keys(pkg.devDependencies).length > 0) {
            Object.keys(pkg.devDependencies).forEach(key => npmPkgName.push(key))
          }
          if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
            Object.keys(pkg.dependencies).forEach(key => npmPkgName.push(key))
          }
        }
      } catch (error) { }
      return (
        <MarkdownPreview
          rehypePlugins={[[rehypeRewrite, ((node, index, parent) => {
            if (
              node.type as any === 'text'
              && /"([\s\S]*?)(\s.+)?"/.test(node.value as string)
              && npmPkgName.includes((node.value as string).replace(/"/g, ''))
            ) {
              parent.children = [{
                type: 'element' as any,
                tagName: 'span',
                properties: {},
                children: [
                  {
                    type: 'element' as any,
                    tagName: 'a',
                    properties: {
                      href: `#/pkg/${(node.value as string).replace(/"/g, '')}`,
                      style: {
                        color: '#0080ff',
                        'text-decoration': 'underline'
                      }
                    },
                    children: [
                      {type: 'text', value: node.value}
                    ]
                  }
                ]
              }]
            }
          }) as RehypeRewriteHandle]]}
          className={styles.code} source={`\`\`\`${ext}\n${content}\n\`\`\``}
        />
      )
    }
    if (extname) {
      return <MarkdownPreview className={styles.code} source={`\`\`\`${ext}\n${content}\n\`\`\``} />
    }
    return <pre style={{ padding: 25 }}>{content}</pre>;
  }, [extname, content]);
  return (
    <Fragment>
      <Loader loading={loading} className={styles.loader}>
        {contentView}
      </Loader>
    </Fragment>
  );
}

// export default connect(mapState, mapDispatch)(DirectoryTrees);