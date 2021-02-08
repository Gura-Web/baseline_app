import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import {
  GetMyActivityParams,
  myActivity,
} from '../actions/myActivity/myActivity';
import { MyPage } from '../components/Pages/MyPage';
import { MyActivityState } from '../reducers/myActivity';
import { User, userInit } from '../services/models';

interface StateProps {
  user: User;
  isLoading: boolean;
}

interface DispatchProps {
  getMyActivity: (params: GetMyActivityParams) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myActivity: MyActivityState;
}): StateProps => ({
  user: state.myActivity.user,
  isLoading: state.myActivity.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMyActivity: params => myActivity.getStart(params),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  getMyActivity,
  user = userInit,
  isLoading = false,
}) => {
  useEffect(() => {
    getMyActivity({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MyPage
      user={user}
      isLoading={isLoading}
      editButtonHandler={id => {
        console.log('編集が押された', id);
        // TODO 編集画面が出る処理
      }}
      deleteButtonHandler={id => {
        console.log('削除が押された', id);
        // TODO 消しますか？のモーダルが出る処理
      }}
    />
  );
};

export const MyActivityPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyActivityContainer);
