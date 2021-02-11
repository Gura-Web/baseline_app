import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { GearIcon } from '../../assets/images';
import { pageTransitionNormal } from '../../assets/script';
import { User } from '../../services/models';
import { UserData } from '../Molecules/Bar';
import ActivityDelete from '../Molecules/Modal/ActivityDelete';
import { MyActivityPost } from '../Organisms/Activity';
import { Modal } from '../Organisms/Modal/Modal2';

interface StateProps {
  isLoading: boolean;
  user: User;
  editButtonHandler: (id: number) => void;
  deleteButtonHandler: (id: number) => void;
}

export const MyPage: FC<StateProps> = ({
  user,
  isLoading = true,
  editButtonHandler,
  deleteButtonHandler,
}) => {
  // TODO 神関数
  // const test = user.companyInformation?.flatMap(({ myActivities }) =>
  //   myActivities === undefined ? [] : [...myActivities],
  // );
  //
  // const companyInformationList = user.companyInformation?.flatMap(({ myActivities }) =>
  //   myActivities === undefined ? [] : [...myActivities],
  // );

  const companyInformationList = user.companyInformation?.flatMap(data =>
    data.myActivities === undefined ? [] : data,
  );

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [acceptFunction, setAcceptFunction] = useState({
    func: () => {
      console.log('null');
    },
  });

  return (
    <>
      {!isLoading && (
        <motion.section
          className="app-main mypage single"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <h2 className="heading1">マイページ</h2>
          {/* 自分の情報 */}
          <UserData user={user} pageType="myPage" />
          <Link to="/01/account-setting" className="icon-txt icon-txt--normal">
            <img src={GearIcon} alt="" />
            アカウント設定へ
          </Link>
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
        </motion.section>
      )}
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
