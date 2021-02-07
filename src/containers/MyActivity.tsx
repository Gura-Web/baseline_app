import { AnimatePresence } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { draft } from '../actions/draft/draft';
import { myActivity } from '../actions/myActivity/myActivity';
import { PrimaryBtn } from '../components/Atoms/Btn';
import { CommentWindow2 } from '../components/Molecules/Modal/CommentWindow2';
import { Modal } from '../components/Organisms/Modal/Modal2';
import { DraftState } from '../reducers/draft';
import { MyActivityState } from '../reducers/myActivity';
import { MyProfileState } from '../reducers/myProfile';
import { Draft, User } from '../services/models';

interface StateProps {
  user: User;
  isOpen: boolean;
  drafts: Draft[];
}

interface DispatchProps {
  openMyActivityWindow: () => void;
  closeMyActivityWindow: () => void;
  getDraft: () => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myProfile: MyProfileState;
  myActivity: MyActivityState;
  draft: DraftState;
}): StateProps => ({
  user: state.myProfile.user,
  isOpen: state.myActivity.visible,
  drafts: state.draft.drafts,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      openMyActivityWindow: () => myActivity.open(),
      closeMyActivityWindow: () => myActivity.close(),
      getDraft: () => draft.start(),
    },
    dispatch,
  );

const MyActivityContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeMyActivityWindow,
  isOpen,
  getDraft,
  drafts,
}) => {
  useEffect(() => {
    getDraft();
  }, [getDraft]);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Modal visible={isOpen} backgroundClickHandler={closeMyActivityWindow}>
          <CommentWindow2
            title="アクティビティを投稿"
            isLoading={false}
            user={user}
            // TODO 登録の動作
            registerButtonHandle={test => {
              console.log('登録');
              console.log(test);
            }}
            // TODO 直す
            closeButtonHandle={closeMyActivityWindow}
            drafts={drafts}
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

export const MyActivityPostWindow = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyActivityContainer),
);
