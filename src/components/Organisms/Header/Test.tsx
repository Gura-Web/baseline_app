import React, { FC } from 'react';
import { OpenModalButton } from '../../../containers/Modal';
import { MyProfile } from '../../../containers/MyProfile';
import { OpenPostMyActivityButton } from '../../../containers/MyActivity';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/images';

// export interface StateProps {
// }

export const SideMenu: FC = () => {
  return (
    <>
      <header className="header">
        <div className="header__wrap">
          <h1 className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </h1>

          {/* 活動を追加ボタン */}
          <OpenPostMyActivityButton />
        </div>
        <MyProfile />
      </header>
    </>
  );
};
