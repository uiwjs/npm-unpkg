import Search from '../../components/Search';
import styles from './index.module.less';

export default function Home() {
  return (
    <div className={styles.content}>
      <h1>npm unpkg</h1>
      <Search />
    </div>
  );
}
