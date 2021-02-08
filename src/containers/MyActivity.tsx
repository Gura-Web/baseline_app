import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { myActivity } from '../actions/myActivity/myActivity';
import { PrimaryBtn } from '../components/Atoms/Btn';
import { Modal } from '../components/Organisms/Modal/Modal2';
import { MyActivityState } from '../reducers/myActivity';
import { MyProfileState } from '../reducers/myProfile';
import { User } from '../services/models';
import { CommendWindowWithDraft } from './Draft';

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

const MyActivityPostContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeMyActivityWindow,
  isOpen,
}) => {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Modal visible={isOpen} backgroundClickHandler={closeMyActivityWindow}>
          <CommendWindowWithDraft
            title="アクティビティを投稿"
            user={user}
            closeButtonHandler={closeMyActivityWindow}
            registerButtonHandle={draftContents => {
              console.log('登録');
              console.log(draftContents);
            }}
          />
        </Modal>
      </AnimatePresence>
    </>
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

export const MyActivityPostWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyActivityPostContainer);
