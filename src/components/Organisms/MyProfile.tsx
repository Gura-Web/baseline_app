import { User } from '../../services/models';
import React, { FC, useRef, useState } from 'react';
import { MyAvatar } from '../Molecules/Info';
import { useHistory } from 'react-router-dom';

interface StateProps {
  user: User;
  isLoading: boolean;
  isError: boolean;
}

export const MyProfile: FC<StateProps> = ({ user, isLoading, isError }) => {
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
      <div ref={myAvatarMenu} className={`myAvatar-menu ${viewMenu && 'view'}`}>
        <div>
          <ul className="myAvatar__wrap">
            {/* TODO ログアウト機能 */}
            <li className="myAvatar-menu__item cAttention">ログアウト</li>
          </ul>
        </div>
      </div>
    </>
  );
};
