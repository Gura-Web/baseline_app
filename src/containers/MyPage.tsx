import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import {
  DeleteMyActivityParams,
  GetMyActivityParams,
  myActivity,
  ShowMyActivityParams,
} from '../actions/myActivity/myActivity';
import { reload, SetReloadParams } from '../actions/reload/reload';
import { MyPage } from '../components/Pages/MyPage';
import { MyActivityState } from '../reducers/myActivity';
import { User, userInit } from '../services/models';

interface StateProps {
  user: User;
  isLoading: boolean;
}

interface DispatchProps {
  getMyActivity: (params: GetMyActivityParams) => void;
  showMyActivity: (params: ShowMyActivityParams) => void;
  setReload: (reloadFunctions: SetReloadParams) => void;
  reloadMyActivity: (params: GetMyActivityParams) => void;
  deleteMyActivity: (params: DeleteMyActivityParams) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myActivity: MyActivityState;
}): StateProps => ({
  user: state.myActivity.user,
  isLoading: state.myActivity.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getMyActivity: params => myActivity.getStart(params),
      showMyActivity: params => myActivity.showStart(params),
      reloadMyActivity: params => myActivity.reload(params),
      setReload: params => reload.setReload(params),
      deleteMyActivity: params => myActivity.deleteStart(params),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  getMyActivity,
  showMyActivity,
  user = userInit,
  isLoading = false,
  setReload,
  reloadMyActivity,
  deleteMyActivity,
}) => {
  useEffect(() => {
    getMyActivity({});
    setReload({
      reloadHandlers: [
        () => {
          reloadMyActivity({});
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyPage
      user={user}
      isLoading={isLoading}
      editButtonHandler={id => {
        console.log('編集が押された', id);
        // TODO 編集画面が出る処理
        showMyActivity({ id });
      }}
      deleteButtonHandler={id => {
        console.log('削除が押された', id);
        // TODO 消しますか？のモーダルが出る処理
        deleteMyActivity({ id });
      }}
    />
  );
};

export const MyActivityPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyActivityContainer);
