import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { myActivity } from '../actions/myActivity/myActivity';
import { CommentWindow2 } from '../components/Molecules/Modal/CommentWindow2';
import { User } from '../services/models';
import { MyProfileState } from '../reducers/myProfile';
import { MyActivityState } from '../reducers/myActivity';
import { PrimaryBtn } from '../components/Atoms/Btn';

interface StateProps {
  user: User;
  isOpen: boolean;
}

interface DispatchProps {
  openMyActivityWindow: () => void;
  closeMyActivityWindow: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myProfile: MyProfileState;
  myActivity: MyActivityState;
}): StateProps => ({
  user: state.myProfile.user,
  isOpen: state.myActivity.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      openMyActivityWindow: () => myActivity.open(),
      closeMyActivityWindow: () => myActivity.close(),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeMyActivityWindow,
  isOpen,
}) => {
  console.log(isOpen);

  if (!isOpen) return <></>;

  return (
    <CommentWindow2
      title="アクティビティを投稿"
      isLoading={false}
      user={user}
      // TODO 登録の動作
      registerButtonHandle={test => {
        console.log('登録');
        console.log(test);
      }}
      closeButtonHandle={closeMyActivityWindow}
    />
  );
};

const OpenMyActivityButtonContainer: FC<EnhancedMyProfileProps> = ({
  openMyActivityWindow,
}) => {
  return (
    <PrimaryBtn type="button" txt="活動を追加" Func={openMyActivityWindow} />
  );
};

export const OpenPostMyActivityButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenMyActivityButtonContainer);

export const MyActivityPostWindow = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyActivityContainer),
);