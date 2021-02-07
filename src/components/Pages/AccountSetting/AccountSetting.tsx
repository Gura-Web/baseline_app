import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowIcon, TrashIcon } from '../../../assets/images';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import { User } from '../../../services/models';
import { Modal } from '../../Organisms/Modal';

interface Props {
  user: User;
  isLoading: boolean;
}

const AccountSetting: React.FC<Props> = ({
  isLoading,
  user: { studentNumber },
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState<boolean>(false);
  const renderDOM = () => {
    return (
      <>
        <motion.section
          className="app-main account-setting"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <button
            type="button"
            className="btn pageBack-link"
            onClick={history.goBack}
          >
            <span className="heading4">マイページへ</span>
          </button>
          <h2 className="heading1">設定</h2>
          <section className="contentBox contentBox--big step">
            <h3 className="heading4">アカウント設定</h3>
            <ul className="setting-list">
              <li className="setting-item">
                <Link to="/01/account-setting/student-number">
                  <p className="setting-item__label">学籍番号</p>
                  <p className="setting-item__value">{studentNumber}</p>
                  <p className="setting-item__arrow">
                    <img src={ArrowIcon} alt="" />
                  </p>
                </Link>
              </li>
              <li className="setting-item">
                <Link to="/01/account-setting/password">
                  <p className="setting-item__label">パスワード</p>
                  <p className="setting-item__value">●●●●●●●●●</p>
                  <p className="setting-item__arrow">
                    <img src={ArrowIcon} alt="" />
                  </p>
                </Link>
              </li>
              {/* <li className="setting-item">
                <Link to="/01/account-setting/mail">
                  <p className="setting-item__label">メールアドレス</p>
                  <p className="setting-item__value">
                    {props.myData.data.email}
                  </p>
                  <p className="setting-item__arrow">
                    <img src={ArrowIcon} alt="" />
                  </p>
                </Link>
              </li> */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
              <li
                className="setting-item delete"
                onClick={() => setShowModal(true)}
              >
                <p className="icon-txt icon-txt--attention">
                  <img src={TrashIcon} alt="" />
                  アカウントを削除する
                </p>
                <p className="setting-item__arrow">
                  <img src={ArrowIcon} alt="" />
                </p>
              </li>
            </ul>
          </section>
          <Modal
            type="account-delete"
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </motion.section>
      </>
    );
  };

  return <>{!isLoading && renderDOM()}</>;
};

export default AccountSetting;
