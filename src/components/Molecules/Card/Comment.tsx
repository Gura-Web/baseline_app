import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageTransitionNormal } from '../../../assets/script';
import { ArrowIcon, rikuma } from '../../../assets/images/index';
import { User } from '../../../services/models';

interface Props {
  // 表示名
  author: User;
  postedYear: string;
  contents: string;
  updateTime: string;
  isArrow: boolean;
  menu: JSX.Element;
}

export const Comment: React.FC<Props> = ({
  author,
  isArrow = false,
  contents,
  updateTime,
  postedYear,
  menu,
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

  const timeTextConversion = () => {
    const dateTime: string = String(updateTime).slice(0, 10);
    const timeText: string = dateTime.replace(/-/g, '.');
    const texts: {
      dateTime: string;
      timeText: string;
    } = {
      dateTime,
      timeText,
    };

    return texts;
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
              <time dateTime={timeTextConversion().dateTime}>
                {timeTextConversion().timeText}
              </time>
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
      {/* TODO 改修 */}

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <ul
        className={`activity-item-menu ${toggleMenu && 'view'}`}
        onClick={() => {
          if (toggleMenu) {
            setToggleMenu(false);
          }
        }}
      >
        {menu}
        {/* 編集ボタン */}
      </ul>
      {/* TODO 改修 */}
      {/* )} */}
    </motion.article>
  );
};
