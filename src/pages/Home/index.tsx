import Search from '../../components/Search';
import styles from './index.module.less';

export function Component() {
  return (
    <div className={styles.content}>
      <h1>NPM UNPKG</h1>
      <Search />
    </div>
  );
}

Component.displayName = 'HomePage';
