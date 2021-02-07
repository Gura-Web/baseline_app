import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RoundedBtn } from '../../Atoms/Btn';
import { Avatar, rikuma } from '../../../assets/images/index';
import { mypage } from '../../../assets/script/';
import axios from 'axios';
import { Draft, User } from '../../../services/models';
import { DraftWindows } from './DraftWindow';

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
  registerDraftButtonHandle: (currentContent: string) => void;
  drafts: Draft[];
}

export const CommentWindow2: React.FC<Props> = ({
  title,
  content,
  user,
  isLoading,
  registerButtonHandle,
  closeButtonHandle,
  registerDraftButtonHandle,
  drafts,
}) => {
  // コンテンツのテキストを管理するローカルステート
  const [inputText, setInputText] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleTextChange = (textValue: string) => {
    setInputText(textValue);
  };

  // 登録ボタンの高階関数
  const register = () => {
    registerButtonHandle(inputText);
  };

  return (
    <>
      <motion.form
        action="#"
        method="POST"
        className={`modal modal--normal ${isEditMode && 'scroll'}`}
        variants={modal}
        onClick={event => event.stopPropagation()}
      >
        {isEditMode ? (
          <DraftWindows
            drafts={drafts}
            backButtonHandler={() => {
              setIsEditMode(false);
            }}
            saveButtonHandler={() => {
              // TODO 下描きセーブボタンのハンドラ
              console.log(inputText);
              registerDraftButtonHandle(inputText);
            }}
            draftToMyActivityButtonHandler={(draftText: string) => {
              setInputText(draftText);
            }}
          />
        ) : (
          <>
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
                defaultValue={content ?? inputText ?? ''}
                onChange={e => handleTextChange(e.target.value)}
              />
            </div>
            <div className="modal__bottom">
              <p className="text-count">
                <span
                  className={`text-count__current-num ${inputText.length >
                    200 && 'cAttention'}`}
                >
                  {inputText.length}
                </span>
                &nbsp;/ 200
              </p>
              <div>
                {/* 下描きボタン */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <p
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                >
                  下書き
                </p>

                {/* 投稿ボタン */}
                <RoundedBtn
                  txt="投稿"
                  className={
                    inputText.length > 200 || inputText.length <= 0
                      ? 'invalid'
                      : ''
                  }
                  isType="button"
                  Func={register}
                />
              </div>
            </div>
          </>
        )}
      </motion.form>
      );
    </>
  );
};
