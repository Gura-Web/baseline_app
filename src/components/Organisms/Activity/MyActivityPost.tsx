import dayjs from 'dayjs';
import React, { FC } from 'react';
import { CompanyInformation, User } from '../../../services/models';
import { Comment } from '../../Molecules/Card';

interface Props {
  author: User;
  companyInformation: CompanyInformation;
  editButtonHandler: (id: number) => void;
  deleteButtonHandler: (id: number) => void;
}

export const MyActivityPost: FC<Props> = ({
  author,
  companyInformation,
  editButtonHandler,
  deleteButtonHandler,
}) => {
  // もしMyActivityの1個目がなかったらスキップ
  if (!companyInformation.myActivities?.[0]) {
    return <></>;
  }

  const myActivity = companyInformation.myActivities[0];

  return (
    <>
      <Comment
        // 表示名
        author={author}
        // 投稿のid（編集に必要）
        postId={companyInformation.id}
        // 投稿年次
        postedYear={myActivity.postedYear}
        // 内容
        contents={myActivity.content}
        // 投稿日時
        updateTime={`${dayjs(companyInformation.createdAt).format(
          'YYYY.MM.DD',
        )}`}
        // 編集の矢印
        isArrow
        editButtonHandler={editButtonHandler}
        deleteButtonHandler={deleteButtonHandler}
      />
    </>
  );
};
