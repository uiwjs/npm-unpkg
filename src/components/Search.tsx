import { useState, Fragment } from 'react';
import Input from '@uiw/react-input';
import Button from '@uiw/react-button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../models';
import styles from './Search.module.less';

export default function Search() {
  const { package: pkg, pkgname } = useSelector(({ global }: RootState) => ({
    package: global.package,
    pkgname: global.pkgname,
  }));
  const dispatch = useDispatch<Dispatch>();
  const [value, setValue] = useState<string>();
  const navigate = useNavigate();
  const [links] = useState<{ to: string; label: string }[]>([
    {
      to: '/pkg/uiw',
      label: 'uiw',
    },
    {
      to: '/pkg/vue',
      label: 'vue',
    },
    {
      to: '/pkg/react',
      label: 'react',
    },
    {
      to: '/pkg/react@17',
      label: 'react@17',
    },
    {
      to: '/pkg/react@17.0.1',
      label: 'react@17.0.1',
    },
  ]);
  const name = pkg && pkg.name ? `${pkg.name}@${pkg.version}` : pkgname;
  return (
    <Fragment>
      <Input
        className={styles.input}
        size="large"
        defaultValue={name}
        preIcon="search"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        addonAfter={
          <Button
            onClick={() => {
              if (value) {
                dispatch.global.update({ showSearch: false });
                navigate(`/pkg/${value}`);
              }
            }}
            icon="arrow-right"
            size="small"
            basic
            type="light"
          />
        }
        placeholder="package or package@version"
      />
      <div className={styles.egLink}>
        <span>E.g.</span>
        {links.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.to}
              onClick={(e) => {
                dispatch.global.update({ showSearch: false });
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
}
