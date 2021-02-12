import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';

import { bindActionCreators, Dispatch } from 'redux';
import {
  DeleteMyActivityParams,
  GetMyActivityParams,
  myActivity,
  ShowMyActivityParams,
} from '../actions/myActivity/myActivity';
import { reload, SetReloadParams } from '../actions/reload/reload';
import { MyPage } from '../components/Pages/MyPage';
import UserPage from '../components/Pages/UserPage';
import { MyActivityState } from '../reducers/myActivity';
import { User, userInit } from '../services/models';

interface StateProps {
  user: User;
  isLoading: boolean;
  userId: string;
}

interface MatchParams {
  id: string;
}

type OwnProps = RouteComponentProps<MatchParams>;

interface DispatchProps {
  getMyActivity: (params: GetMyActivityParams) => void;
  showMyActivity: (params: ShowMyActivityParams) => void;
  setReload: (reloadFunctions: SetReloadParams) => void;
  reloadMyActivity: (params: GetMyActivityParams) => void;
  deleteMyActivity: (params: DeleteMyActivityParams) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (
  state: {
    myActivity: MyActivityState;
  },
  ownProps: OwnProps,
): StateProps => ({
  user: state.myActivity.user,
  isLoading: state.myActivity.isLoading,
  userId: ownProps.match.params.id,
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

const UserPageContainer: FC<EnhancedMyProfileProps> = ({
  getMyActivity,
  showMyActivity,
  user = userInit,
  isLoading = false,
  setReload,
  reloadMyActivity,
  deleteMyActivity,
  userId,
}) => {
  useEffect(() => {
    // useridの処理
    if (parseInt(userId, 10)) {
      const nUserId: number = parseInt(userId, 10);

      getMyActivity({ userId: nUserId });
      setReload({
        reloadHandlers: [
          () => {
            reloadMyActivity({ userId: nUserId });
          },
        ],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserPage
      user={user}
      isLoading={isLoading}
      editButtonHandler={id => {
        // 編集画面が出る処理
        showMyActivity({ id });
      }}
      deleteButtonHandler={id => {
        // 消しますか？のモーダルが出る処理
        deleteMyActivity({ id });
      }}
    />
  );
};

export const UserPagePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPageContainer);
