import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowIcon,
  PencilIcon,
  rikuma,
  TrashIcon,
} from '../../../assets/images/index';
import { pageTransitionNormal } from '../../../assets/script';
import { User } from '../../../services/models';
import { Modal } from '../../Organisms/Modal/Modal2';
import { OldActivityDelete } from '../Modal';
import ActivityDelete from '../Modal/ActivityDelete';

interface Props {
  // 表示名
  author: User;
  postedYear: number;
  contents: string;
  updateTime: string;
  isArrow: boolean;
  postId: number;
  editButtonHandler: (id: number) => void;
  deleteButtonHandler: (id: number) => void;
}

export const Comment: React.FC<Props> = ({
  author,
  isArrow = false,
  contents,
  updateTime,
  postedYear,
  postId,
  deleteButtonHandler,
  editButtonHandler,
}) => {
  const { firstName, lastName, iconImageUrl } = author;

  const activityTxtEl = useRef<HTMLParagraphElement>(null);

  const setUrlText = (): void => {
    const reg = /((https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+))/;
    const txtEl = activityTxtEl.current?.innerText;
    const searchUrlTxt = txtEl?.match(reg);
    if (searchUrlTxt && txtEl) {
      activityTxtEl.current!.innerHTML = txtEl.replace(
        reg,
        `<a href="${searchUrlTxt[0]}">${searchUrlTxt[0]}</a>`,
      );
    }
  };

  useEffect((): void => {
    setUrlText();
  }, []);

  const [toggleMenu, setToggleMenu] = useState(false);

  const arrowClickHandler = (): void => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <motion.article
      className="activity-item"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransitionNormal}
    >
      <img className="userIcon" src={iconImageUrl || rikuma} alt="" />
      <div className="activity-item__content">
        <div className="activity-item__head">
          {/* 名前部分 */}
          <h1 className="activity-item__name">
            {firstName} {lastName}
          </h1>
          <ul className="activity-item__list">
            <li>{postedYear}年次</li>
            <li>&nbsp;|&nbsp;</li>
            <li>
              <time dateTime={updateTime}>{updateTime}</time>
            </li>
          </ul>
          {isArrow && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div className="activity-item__arrow" onClick={arrowClickHandler}>
              <img src={ArrowIcon} alt="" />
            </div>
          )}
        </div>
        <p ref={activityTxtEl} className="activity-item__txt">
          {contents}
        </p>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <ul
        className={`activity-item-menu ${toggleMenu && 'view'}`}
        onClick={() => {
          if (toggleMenu) {
            setToggleMenu(false);
          }
        }}
      >
        {/* 編集ボタン */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className="activity-item-menu__item"
          onClick={() => {
            editButtonHandler(postId);
          }}
        >
          <img src={PencilIcon} alt="" />
          <span>編集</span>
        </li>
        {/* 削除ボタン */}
        {/* TODO 削除機能を追加する */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className="activity-item-menu__item cAttention"
          onClick={() => {
            deleteButtonHandler(postId);
          }}
        >
          <img src={TrashIcon} alt="" />
          <span>削除</span>
        </li>
      </ul>
    </motion.article>
  );
};
