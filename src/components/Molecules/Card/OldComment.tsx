import React, { useEffect, useState, useRef } from 'react';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import {
  ArrowIcon,
  PencilIcon,
  TrashIcon,
  rikuma,
} from '../../../assets/images/index';
import { motion } from 'framer-motion';
interface Props {
  name: string;
  year: string;
  txt: string;
  updateTime: string;
  isArrow: boolean;
  id?: number;
  type?: 'user' | 'mypage';
  clickFunc?: any;
  clickFunc2?: any;
  icon?: string;
}

const OldComment: React.FC<Props> = props => {
  const activityTxtEl = useRef<HTMLParagraphElement>(null);

  const setUrlText = (): void => {
    const reg = /((https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+))/;
    const txtEl: string = activityTxtEl.current!.innerText;
    const searchUrlTxt = txtEl.match(reg);
    if (searchUrlTxt) {
      activityTxtEl.current!.innerHTML = txtEl.replace(
        reg,
        `<a href="${searchUrlTxt![0]}">${searchUrlTxt![0]}</a>`,
      );
    }
  };

  const timeTextConversion = () => {
    const dateTime: string = String(props.updateTime).slice(0, 10);
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

  let [toggleMenu, setToggleMenu] = useState(false);
  const arrowClickHandler = (): void => {
    setToggleMenu(!toggleMenu);
  };

  const isArrowRender = () => {
    if (props.isArrow) {
      return (
        <div className={`activity-item__arrow`} onClick={arrowClickHandler}>
          <img src={ArrowIcon} alt="" />
        </div>
      );
    }
  };

  return (
    <motion.article
      className="activity-item"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransitionNormal}
    >
      <img className="userIcon" src={props.icon ? props.icon : rikuma} alt="" />
      <div className="activity-item__content">
        <div className="activity-item__head">
          <h1 className="activity-item__name">{props.name}</h1>
          <ul className="activity-item__list">
            <li>{props.year}年次</li>
            <li>&nbsp;|&nbsp;</li>
            <li>
              <time dateTime={timeTextConversion().dateTime}>
                {timeTextConversion().timeText}
              </time>
            </li>
          </ul>
          {isArrowRender()}
          {/* {props.type === "mypage" && isArrowRender()} */}
        </div>
        <p ref={activityTxtEl} className="activity-item__txt">
          {props.txt}
        </p>
      </div>
      {/* {props.type === "mypage" && ( */}
      <ul className={`activity-item-menu ${toggleMenu && 'view'}`}>
        <li
          className="activity-item-menu__item"
          onClick={() => props.clickFunc(props.id, true, props.txt)}
        >
          <img src={PencilIcon} alt="" />
          <span onClick={() => setToggleMenu(false)}>編集</span>
        </li>
        <li
          className="activity-item-menu__item cAttention"
          onClick={() => props.clickFunc2(props.id, true)}
        >
          <img src={TrashIcon} alt="" />
          <span onClick={() => setToggleMenu(false)}>削除</span>
        </li>
      </ul>
      {/* )} */}
    </motion.article>
  );
};

export default OldComment;
