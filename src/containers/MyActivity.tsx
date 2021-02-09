import { AnimatePresence } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { myActivity } from '../actions/myActivity/myActivity';
import { PrimaryBtn } from '../components/Atoms/Btn';
import { Modal } from '../components/Organisms/Modal/Modal2';
import { MyActivityState } from '../reducers/myActivity';
import { MyProfileState } from '../reducers/myProfile';
import { CompanyInformation, User } from '../services/models';
import { CommendWindowWithDraft } from './Draft';

interface StateProps {
  user: User;
  isOpen: boolean;
  companyInformation?: CompanyInformation;
}

interface DispatchProps {
  openMyActivityWindow: () => void;
  closeMyActivityWindow: () => void;
  openMyActivityEditWindow: () => void;
  closeMyActivityEditWindow: () => void;
  postMyActivity: (content: string) => void;
  editMyActivity: (content: string, id: number) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (state: {
  myProfile: MyProfileState;
  myActivity: MyActivityState;
}): StateProps => ({
  user: state.myProfile.user,
  isOpen: state.myActivity.visible,
  companyInformation: state.myActivity.companyInformation,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      openMyActivityWindow: () => myActivity.postWindowOpen(),
      closeMyActivityWindow: () => myActivity.postWindowClose(),
      openMyActivityEditWindow: () => myActivity.editWindowOpen(),
      closeMyActivityEditWindow: () => myActivity.editWindowClose(),
      postMyActivity: content => myActivity.postStart({ content }),
      editMyActivity: (content, id) => myActivity.editStart({ content, id }),
    },
    dispatch,
  );

const MyActivityPostContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeMyActivityEditWindow,
  isOpen,
  postMyActivity,
}) => {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Modal
          visible={isOpen}
          backgroundClickHandler={closeMyActivityEditWindow}
        >
          <CommendWindowWithDraft
            title="アクティビティを投稿"
            user={user}
            closeButtonHandler={closeMyActivityEditWindow}
            // 登録ボタン
            registerButtonHandle={contents => {
              postMyActivity(contents);
            }}
          />
        </Modal>
      </AnimatePresence>
    </>
  );
};

const MyActivityEditContainer: FC<EnhancedMyProfileProps> = ({
  user,
  closeMyActivityEditWindow,
  isOpen,
  editMyActivity,
  companyInformation,
}) => {
  if (!companyInformation || !companyInformation.myActivities?.[0]) {
    return <></>;
  }

  const { content } = companyInformation.myActivities[0];

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Modal
          visible={isOpen}
          backgroundClickHandler={closeMyActivityEditWindow}
        >
          <CommendWindowWithDraft
            title="アクティビティを編集"
            initialContent={content}
            user={user}
            closeButtonHandler={closeMyActivityEditWindow}
            // 編集ボタン
            registerButtonHandle={contents => {
              editMyActivity(contents, companyInformation.id);
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

export const MyActivityEditWindow = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyActivityEditContainer);
