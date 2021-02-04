import React, { FC } from 'react';
import { CommentWindow2 } from '../../Molecules/Modal/CommentWindow2';

export const Modal: FC = () => {
  // type="regist"
  return (
    <CommentWindow2
      title="アクティビティを投稿"
      registerButtonHandle={() => {}}
    ></CommentWindow2>
  );
};
