import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { pageTransitionNormal } from '../../assets/script';
import { UserData } from '../Molecules/Bar';
import { User } from '../../services/models';
import { GearIcon } from '../../assets/images';
import { Link } from 'react-router-dom';

interface StateProps {
  user: User;
}

export const MyPage: FC<StateProps> = ({ user }) => {
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
      </motion.section>
    </>
  );
};
