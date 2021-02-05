import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators, Dispatch } from 'redux';
import { User, userInit } from '../services/models';
import { MyActivityState } from '../reducers/myActivity';
import {
  GetMyActivityParams,
  myActivity,
} from '../actions/myActivity/myActivity';
import { MyPage } from '../components/Pages/MyPage';

interface StateProps {
  user: User;
}

interface DispatchProps {
  getMyActivity: (params: GetMyActivityParams) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myActivity: MyActivityState;
}): StateProps => ({
  user: state.myActivity.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMyActivity: params => myActivity.start(params),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  getMyActivity,
  user = userInit,
}) => {
  useEffect(() => {
    getMyActivity({ id: user.id });
  }, []);

  return <MyPage user={user} />;
};

export const MyActivityPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyActivityContainer);
