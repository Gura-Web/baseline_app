import { bindActionCreators, Dispatch } from 'redux';
import React, { FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { User } from '../services/models';
import { MyProfileState } from '../reducers/myProfile';
import { getMyProfile } from '../actions/baseline';
import Test from '../components/Organisms/Header/Test';
import { Modal } from '../components/Organisms/Modal/Modal2';
import { CommentWindow2 } from '../components/Molecules/Modal/CommentWindow2';

interface StateProps {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

interface DispatchProps {
  getMyProfileStart: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: { myProfile: MyProfileState }): StateProps => ({
  user: state.myProfile.user,
  isLoading: state.myProfile.isLoading,
  isError: state.myProfile.isError,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getMyProfileStart: () => getMyProfile.start(),
    },
    dispatch,
  );

const MyProfileContainer: FC<EnhancedMyProfileProps> = ({
  user,
  isLoading,
  getMyProfileStart,
  isError,
}) => {
  useEffect(() => {
    getMyProfileStart();
  }, []);

  return <Test user={user} isLoading={isLoading} isError={isError} />;
};

// TODO 仮置き
const Modal2Container: FC<EnhancedMyProfileProps> = ({
  user,
  getMyProfileStart,
  isLoading,
}) => {
  useEffect(() => {
    getMyProfileStart();
  }, []);

  return (
    <Modal visible={true}>
      <CommentWindow2
        title="アクティビティを投稿"
        registerButtonHandle={test => {
          console.log('登録');
          console.log(test);
        }}
        user={user}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export const Modal2ContainerWithRouter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal2Container);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyProfileContainer),
);
