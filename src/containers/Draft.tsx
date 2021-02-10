import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  draft,
  RegistDraftParams,
  DeleteDraftParams,
} from '../actions/draft/draft';
import { CommentWindow2 } from '../components/Molecules/Modal/CommentWindow2';
import { DraftState } from '../reducers/draft';
import { Draft, User } from '../services/models';

interface StateProps {
  drafts: Draft[];
  title: string;
  user: User;
  closeButtonHandler: () => void;
  registerButtonHandle: (content: string) => void;
}

interface OwnProps {
  title: string;
  user: User;
  closeButtonHandler: () => void;
  registerButtonHandle: (content: string) => void;
}

interface DispatchProps {
  getDraft: () => void;
  registerDraft: (params: RegistDraftParams) => void;
  deleteDraft: (params: DeleteDraftParams) => void;
}

type EnhancedMyProfileProps = StateProps & DispatchProps;

const mapStateToProps = (
  state: {
    draft: DraftState;
  },
  ownProps: OwnProps,
): StateProps => ({
  drafts: state.draft.drafts,
  title: ownProps.title,
  user: ownProps.user,
  closeButtonHandler: ownProps.closeButtonHandler,
  registerButtonHandle: ownProps.registerButtonHandle,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getDraft: () => draft.getStart(),
      registerDraft: params => draft.registStart(params),
      deleteDraft: params => draft.deleteStart(params),
    },
    dispatch,
  );

const CommendWindowWithDraftContainer: FC<EnhancedMyProfileProps> = ({
  getDraft,
  registerDraft,
  drafts,
  user,
  title,
  closeButtonHandler,
  registerButtonHandle,
  deleteDraft,
}) => {
  useEffect(() => {
    getDraft();
  }, [getDraft]);

  return (
    <>
      <CommentWindow2
        title={title}
        isLoading={false}
        user={user}
        // 閉じるボタンの処理
        closeButtonHandle={closeButtonHandler}
        // 登録ボタンの処理
        registerButtonHandle={registerButtonHandle}
        // 下描き登録ボタンの処理
        registerDraftButtonHandle={draftContents => {
          registerDraft({ contents: draftContents });
        }}
        // TODO 下描き削除ボタンの処理
        draftDeleteButtonHandle={id => {
          console.log(id);

          // TODO 下描きの削除処理
          deleteDraft({ id });
        }}
        // 下描き削除機能の処理
        drafts={drafts}
      />
    </>
  );
};

export const CommendWindowWithDraft = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommendWindowWithDraftContainer);
