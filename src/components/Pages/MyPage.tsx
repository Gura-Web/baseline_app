import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { pageTransitionNormal } from '../../assets/script';
import { UserData } from '../Molecules/Bar';
import { MyActivity, User } from '../../services/models';
import { GearIcon, PencilIcon, TrashIcon } from '../../assets/images';
import { Comment } from '../Molecules/Card';

interface StateProps {
  user: User;
}

export const MyPage: FC<StateProps> = ({ user }) => {
  // TODO 神関数
  // const test = user.companyInformation?.flatMap(({ myActivities }) =>
  //   myActivities === undefined ? [] : [...myActivities],
  // );

  const myActivityList = user.companyInformation?.flatMap(({ myActivities }) =>
    myActivities === undefined ? [] : [...myActivities],
  );

  return (
    <>
      <motion.section
        className="app-main mypage single"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <h2 className="heading1">マイページ</h2>
        <UserData user={user} />
        <Link to="/01/account-setting" className="icon-txt icon-txt--normal">
          <img src={GearIcon} alt="" />
          アカウント設定へ
        </Link>
        <div className="activity-list">
          {/* TODO 記事のリスト */}
          {myActivityList &&
            myActivityList.map(myActivity => (
              <Comment
                author={user}
                contents={'aaaa http://localhost:8080'}
                updateTime={'2020/01/01'}
                isArrow={true}
                menu={
                  <>
                    <li
                      className="activity-item-menu__item"
                      // onClick={() => clickFunc(id, true, txt)}
                    >
                      <img src={PencilIcon} alt="" />
                      <span>編集</span>
                    </li>
                    {/* 削除ボタン */}
                    <li
                      className="activity-item-menu__item cAttention"
                      onClick={() => {
                        console.log('aaa');
                      }}
                    >
                      <img src={TrashIcon} alt="" />
                      <span>削除</span>
                    </li>
                  </>
                }
                postedYear={'4'}
              />
            ))}
        </div>
      </motion.section>
    </>
  );
};
