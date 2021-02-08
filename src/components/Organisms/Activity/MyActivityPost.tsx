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
  companyInformation: { myActivities },
  editButtonHandler,
  deleteButtonHandler,
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
        postId={myActivity.id}
        postedYear={myActivity.postedYear}
        contents={myActivity.content}
        // TODO 直す
        updateTime="2020/01/01"
        isArrow
        editButtonHandler={editButtonHandler}
        deleteButtonHandler={deleteButtonHandler}
      />
    </>
  );
};
