import React, { FC } from 'react';
import { OpenModalButton } from '../../../containers/Modal';
import { MyProfile } from '../../../containers/MyProfile';

// export interface StateProps {
// }

export const SideMenu: FC = () => {
  return (
    <>
      <header className="header">
        <div className="header__wrap">
          {/* 活動を追加ボタン */}
          <OpenModalButton />
        </div>
        <MyProfile />
      </header>
    </>
  );
};
