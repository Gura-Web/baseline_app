import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  registMyActivity,
  editMyActivity,
  deleteMyActivity,
  insertComment,
  editComment,
} from '../../../assets/script';
import {
  CommentWindow,
  LevelDesc,
  SelectCategory,
  AccountDelete,
  OldActivityDelete,
  SaveText,
} from '../../Molecules/Modal';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface Props {
  showModal: any;
  setShowModal: any;
  type: string;
  companyId?: any;
  content?: string;
  editId?: number;
  deleteId?: number;
  getMyData?: any;
  getCompanyData?: any;
  getComment?: any;
}

const Modal: React.FC<Props> = props => {
  const [saveTextModal, setSaveTextModal] = useState<boolean>(false);

  const [currentText, setCurrentText] = useState<string>();
  const [useDraftText, setUseDraftText] = useState<string>();

  const registerActivity = (text: string) => {
    registMyActivity({ content: text });
    props.getMyData();
  };
  const editActivity = (id: number, text: string) => {
    editMyActivity(id, text);
    props.getMyData();
  };
  const deleteActivity = (id: number) => {
    deleteMyActivity(id);
    props.getMyData();
  };
  const registComment = (text: string) => {
    insertComment(Number(props.companyId) + 1, text);
    props.getCompanyData().then((getData: any) => {
      props.getComment(getData);
    });
  };
  const onEditComment = (id: number, text: string) => {
    console.log(id);
    editComment(id, text);
    props.getCompanyData();

    props.getCompanyData().then((getData: any) => {
      props.getComment(getData);
    });
  };
  const onDeleteComment = (id: number) => {
    deleteMyActivity(id);
    props.getCompanyData().then((getData: any) => {
      props.getComment(getData);
    });
  };

  const rootingModalRender = () => {
    if (props.type === 'activity-post') {
      return (
        <CommentWindow
          ttl="アクティビティを投稿"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          content={useDraftText}
          setCurrentText={setCurrentText}
          btnClickFunc={registerActivity}
          type="regist"
        />
      );
    } else if (props.type === 'select-post-category') {
      return (
        <SelectCategory
          setShowModal={props.setShowModal}
          companyId={props.companyId}
        />
      );
    } else if (props.type === 'company-comment') {
      return (
        <CommentWindow
          ttl="会社に対するコメントを書く"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          setCurrentText={setCurrentText}
          btnClickFunc={registComment}
          content={useDraftText}
          type="company-comment"
        />
      );
    } else if (props.type === 'company-comment-edit') {
      return (
        <CommentWindow
          ttl="会社に対するコメントを書く"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          setCurrentText={setCurrentText}
          btnClickFunc={onEditComment}
          content={props.content}
          editId={props.editId}
          type="edit"
        />
      );
    } else if (props.type === 'company-comment-delete') {
      return (
        <OldActivityDelete
          ttl="このコメントを削除しますか？"
          text="削除したデータは元に戻せません。"
          setShowModal={props.setShowModal}
          deleteId={Number(props.deleteId)}
          btnClickFunc={onDeleteComment}
        />
      );
    } else if (props.type === 'activity-edit') {
      return (
        <CommentWindow
          ttl="アクティビティを編集"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setSaveTextModal={setSaveTextModal}
          setCurrentText={setCurrentText}
          btnClickFunc={editActivity}
          content={props.content}
          editId={props.editId}
          type="edit"
        />
      );
    } else if (props.type === 'activity-delete') {
      return (
        <OldActivityDelete
          ttl="この活動履歴を削除しますか？"
          text="削除したデータは元に戻せません。"
          setShowModal={props.setShowModal}
          deleteId={Number(props.deleteId)}
          btnClickFunc={deleteActivity}
        />
      );
    } else if (props.type === 'company-level') {
      return <LevelDesc setShowModal={props.setShowModal} />;
    } else if ('account-delete') {
      return <AccountDelete setShowModal={props.setShowModal} />;
    }
  };

  const useDraft = (draftData: any) => {
    console.log(draftData);
    setUseDraftText(draftData.content);
  };

  const saveTextModalRender = () => {
    return (
      <SaveText
        setSaveTextModal={setSaveTextModal}
        useDraft={useDraft}
        currentText={currentText}
      />
    );
  };

  const renderModal = () => {
    if (saveTextModal) {
      return saveTextModalRender();
    } else {
      return rootingModalRender();
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {props.showModal && (
        <motion.div
          className="modal-background"
          onClick={() => props.setShowModal(false)}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {renderModal()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
