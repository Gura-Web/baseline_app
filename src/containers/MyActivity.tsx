import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { FC } from 'react';
import { myActivity } from '../actions/myActivity/myActivity';
import { CommentWindow2 } from '../components/Molecules/Modal/CommentWindow2';
import { User } from '../services/models';
import { MyProfileState } from '../reducers/myProfile';
import { modal } from '../actions/modal/modal';
import { withRouter } from 'react-router-dom';

interface StateProps {
  user: User;
}

interface DispatchProps {
  openMyActivityWindow: () => void;
  closeModal: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: { myProfile: MyProfileState }): StateProps => ({
  user: state.myProfile.user,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      openMyActivityWindow: () => myActivity.open(),
      closeModal: () => modal.close(),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeModal,
}) => {
  // useEffect(() => {}, []);

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
      closeButtonHandle={closeModal}
    />
  );
};

export const MyActivityWindow = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyActivityContainer),
);
