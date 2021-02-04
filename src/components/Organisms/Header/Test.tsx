import React, { FC, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../../services/models';
import { MyAvatar } from '../../Molecules/Info';
import { PrimaryBtn } from '../../Atoms/Btn';
import { ShowMyActivityButton } from '../../../containers/MyActivity';

export interface SideMenuProps {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

const SideMenu: FC<SideMenuProps> = ({ user, isLoading, isError }) => {
  const [viewMenu, setViewMenu] = useState(false);

  const history = useHistory();
  const myAvatarMenu = useRef(null);

  const toggleUserMenu = () => {
    setViewMenu(!viewMenu);
  };

  // エラーが発生したとき
  if (isError) {
    // ログインに戻る処理
    history.push('/login');
  }

  // ロード中の時
  if (isLoading) {
    return null;
  }

  return (
    <>
      <header className="header">
        <div className="header__wrap">
          {/* 活動を追加ボタン */}
          <ShowMyActivityButton />
        </div>
        <MyAvatar
          iconPath={user.iconImageUrl}
          // 10文字まで表示
          // eslint-disable-next-line no-irregular-whitespace
          name={`${user.firstName}　${user.lastName}`}
          student_number={`${user.studentNumber}`}
          ml=""
          isArrow
          clickFunc={toggleUserMenu}
        />

        <div
          ref={myAvatarMenu}
          className={`myAvatar-menu ${viewMenu && 'view'}`}
        >
          <div>
            <ul className="myAvatar__wrap">
              <li className="myAvatar-menu__item cAttention">ログアウト</li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default SideMenu;
