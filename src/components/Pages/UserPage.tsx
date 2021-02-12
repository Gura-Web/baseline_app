import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from '../../services/models';
import { UserData } from '../Molecules/Bar';
import ActivityDelete from '../Molecules/Modal/ActivityDelete';
import { MyActivityPost } from '../Organisms/Activity';
import { Modal } from '../Organisms/Modal/Modal2';
import { pageTransitionNormal } from '../../assets/script';

interface Props {
  isLoading: boolean;
  user: User;
  editButtonHandler: (id: number) => void;
  deleteButtonHandler: (id: number) => void;
}

const UserPage: FC<Props> = ({
  isLoading,
  user,
  editButtonHandler,
  deleteButtonHandler,
}) => {
  const companyInformationList = user.companyInformation?.flatMap(data =>
    data.myActivities === undefined ? [] : data,
  );

  const history = useHistory();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [acceptFunction, setAcceptFunction] = useState<{ func: () => void }>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    func: () => {},
  });

  return (
    <>
      <motion.section
        className="app-main mypage single"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="btn pageBack-link" onClick={() => history.goBack()}>
          <span className="heading4">戻る</span>
        </button>
        {/* 自分の情報 */}
        {/* ユーザーが存在しないとき表示しない */}
        {!isLoading && (
          <>
            <UserData user={user} pageType="userPage" />
            <div className="activity-list">
              {/* 記事のリスト */}
              {companyInformationList &&
                companyInformationList.map(myActivity => (
                  <MyActivityPost
                    author={user}
                    companyInformation={myActivity}
                    key={myActivity.id}
                    editButtonHandler={editButtonHandler}
                    deleteButtonHandler={id => {
                      setIsDeleteModal(true);
                      setAcceptFunction({
                        func: () => {
                          deleteButtonHandler(id);
                          setIsDeleteModal(false);
                        },
                      });
                    }}
                  />
                ))}
            </div>
          </>
        )}
      </motion.section>
      <Modal visible={isDeleteModal}>
        <ActivityDelete
          title="この活動履歴を削除しますか？"
          text="削除したデータは元に戻せません。"
          cancelHandler={() => {
            setIsDeleteModal(false);
          }}
          acceptHandler={acceptFunction.func}
        />
      </Modal>
    </>
  );
};

export default UserPage;
