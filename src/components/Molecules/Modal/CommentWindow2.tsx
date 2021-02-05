import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RoundedBtn } from '../../Atoms/Btn';
import { Avatar, rikuma } from '../../../assets/images/index';
import { mypage } from '../../../assets/script/';
import axios from 'axios';
import { User } from '../../../services/models';

const modal = {
  hidden: {
    left: '50vw',
    top: '80vh',
    opacity: 0,
  },
  visible: {
    top: '45vh',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

interface Props {
  isLoading: boolean;
  user: User;
  title: string;
  // showModal: any;
  // setShowModal: any;
  // setSaveTextModal: any;
  content?: string;
  // setCurrentText?: any;
  // btnClickFunc?: any;
  // editId?: number;
  // type?: string;
  registerButtonHandle: (currentContent: string) => void;
  closeButtonHandle: () => void;
}

export const CommentWindow2: React.FC<Props> = ({
  title,
  content,
  user,
  isLoading,
  registerButtonHandle,
  closeButtonHandle,
}) => {
  // コンテンツのテキストを管理するローカルステート
  const [inputText, setInputText] = useState({
    count: 0,
    textValue: '',
  });
  const handleTextChange = (textValue: string) => {
    setInputText({
      count: inputText.count,
      textValue,
    });
  };
  const handleCountChange = (textLength: number) => {
    setInputText({
      count: textLength,
      textValue: inputText.textValue,
    });
  };

  // 登録ボタンの高階関数
  const register = () => {
    registerButtonHandle(inputText.textValue);
  };

  return (
    <>
      <motion.form
        action="#"
        method="POST"
        className="modal modal--normal"
        variants={modal}
        onClick={event => event.stopPropagation()}
      >
        <div className="modal__header modal__header--normal">
          <p className="heading4">{title}</p>
        </div>
        {/* ×ボタン */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="btn closeIcon-btn" onClick={closeButtonHandle} />
        <div className="modal__input-area">
          {/* アイコン */}
          {!isLoading && (
            <img src={user.iconImageUrl ?? rikuma} alt="user_icon" />
          )}

          {/* コンテンツのテキストエリア */}
          <textarea
            name="content"
            className="modal__textarea"
            required
            defaultValue={content ?? ''}
            onChange={e => handleTextChange(e.target.value)}
            onKeyUp={e => handleCountChange(e.currentTarget.value.length)}
          />
        </div>
        <div className="modal__bottom">
          <p className="text-count">
            <span
              className={`text-count__current-num ${inputText.count > 200 &&
                'cAttention'}`}
            >
              {inputText.count}
            </span>
            &nbsp;/ 200
          </p>
          <div>
            {/* 下描きボタン */}
            {/* TODO 下描きの処理 */}
            <p onClick={() => {}}>下書き</p>

            {/* 投稿ボタン */}
            <RoundedBtn
              txt="投稿"
              className={
                inputText.count > 200 || inputText.count <= 0 ? 'invalid' : ''
              }
              isType="button"
              Func={register}
            />
          </div>
        </div>
      </motion.form>
    </>
  );
};
