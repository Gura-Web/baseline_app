import React, { FC } from 'react';
import { CommentWindow2 } from '../../Molecules/Modal/CommentWindow2';
import { User } from '../../../services/models';

interface Props {
  user: User;
  isLoading: boolean;
}

export const Modal: FC<Props> = ({ user, isLoading }) => {
  // type="regist"
  return (
    <CommentWindow2
      title="アクティビティを投稿"
      registerButtonHandle={test => {
        console.log('登録');
        console.log(test);
      }}
      user={user}
      isLoading={isLoading}
    />
  );
};
