import React, {useState, Fragment} from 'react';
import Input from '@uiw/react-input';
import Button from '@uiw/react-button';
import { useDispatch } from 'react-redux';
import { DefaultProps } from '@uiw-admin/router-control';
import { Dispatch } from '../models';
import { Link }from 'react-router-dom';
import styles from './Search.module.less';

export default function Search(props = {} as DefaultProps) {
  const dispatch = useDispatch<Dispatch>();
  const [value, setValue] = useState<string>();
  const [links] = useState<{to: string, label: string}[]>([
    {
      to: '/pkg/uiw',
      label: 'uiw'
    },
    {
      to: '/pkg/vue',
      label: 'vue'
    },
    {
      to: '/pkg/react',
      label: 'react'
    },
    {
      to: '/pkg/react@17',
      label: 'react@17'
    },
    {
      to: '/pkg/react@17.0.1',
      label: 'react@17.0.1'
    },
  ]);
  return (
    <Fragment>
      <Input
        className={styles.input}
        size="large"
        preIcon="search"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        addonAfter={
          <Button onClick={() => {
            if (value) {
              dispatch.global.update({ showSearch: false });
              props.history.push(`/pkg/${value}`);
            }
          }} icon="arrow-right" size="small" basic type="light" />
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
                e.persist();
                e.preventDefault();
                dispatch.global.update({ showSearch: false });
                props.history.push(item.to);
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </Fragment>
  );
}

// const searchView = connect(mapState, mapDispatch)(Search);
// type SearchView = typeof Search;
// export default searchView as SearchView;