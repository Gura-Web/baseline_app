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
        author={author}
        postId={companyInformation.id}
        postedYear={myActivity.postedYear}
        contents={myActivity.content}
        // TODO 直す
        updateTime={`${dayjs(companyInformation.createdAt).format(
          'YYYY.MM.DD',
        )}`}
        isArrow
        editButtonHandler={editButtonHandler}
        deleteButtonHandler={deleteButtonHandler}
      />
    </>
  );
};
