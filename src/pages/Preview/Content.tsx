import React from 'react';
import { connect } from 'react-redux';
import Loader from '@uiw/react-loader';
import { DefaultProps } from '@uiw-admin/router-control';
import { RootState, Dispatch } from '../../models';

const mapState = ({ global, loading }: RootState) => ({
  loading: loading.effects.global.getFileContent,
  content: global.content,
});

const mapDispatch = (dispatch: any) => ({
  update: (dispatch as Dispatch).global.update,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
type Props = connectedProps & DefaultProps;

function DirectoryTrees(props = {} as Props) {
  return (
    <Loader loading={props.loading} style={{ width: '100%'}}>
      <div>{props.content}</div>
    </Loader>
  );
}

export default connect(mapState, mapDispatch)(DirectoryTrees);