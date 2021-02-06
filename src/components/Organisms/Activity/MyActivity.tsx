import React, { FC } from 'react';
import { Comment } from '../../Molecules/Card';
import { User, CompanyInformation } from '../../../services/models';
import { PencilIcon, TrashIcon } from '../../../assets/images';

interface Props {
  author: User;
  companyInformation: CompanyInformation;
}

export const MyActivity: FC<Props> = ({
  author,
  companyInformation: { myActivities },
}) => {
  // もしMyActivityの1個目がなかったらスキップ
  if (!myActivities?.[0]) {
    return <></>;
  }

  const myActivity = myActivities[0];

  return (
    <>
      <Comment
        author={author}
        postedYear={myActivity.postedYear}
        contents={myActivity.content}
        // TODO 直す
        updateTime="2020/01/01"
        menu={
          <>
            {/* 編集ボタン */}
            {/* TODO 編集機能を追加する */}
            <li
              className="activity-item-menu__item"
              // onClick={() => clickFunc(id, true, txt)}
            >
              <img src={PencilIcon} alt="" />
              <span>編集</span>
            </li>
            {/* 削除ボタン */}
            {/* TODO 削除機能を追加する */}
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
        isArrow
      />
    </>
  );
};
