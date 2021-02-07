import React from 'react';
import { MailIcon, rikuma } from '../../../assets/images/index';

import { User } from '../../../services/models';
import { ActionBtn } from '../../Atoms/Btn';

interface Props {
  user: User;
  pageType?: 'myPage' | 'userPage';
}

const UserData: React.FC<Props> = ({ user, pageType = 'userPage' }) => {
  const renderGender = (num: number) => {
    const gender = ['男性', '女性', 'その他'];

    return gender[num];
  };

  return (
    <div className="userDetail-window">
      <div className="userDetail-window__container">
        {/* アイコンの表示 */}
        <img src={user.iconImageUrl ?? rikuma} alt="" />
        <div>
          <div className="userDetail-window__wrap">
            {/* 名前の表示 */}
            <p className="userDetail-window__name">
              {`${user.firstName} ${user.lastName}`}
            </p>

            {/* 学籍番号の表示 */}
            <p className="userDetail-window__id">@{user.studentNumber}</p>
          </div>
          <ul className="userDetail-window__list">
            {/* 何年卒かの表示 */}
            <li className="userDetail-window__year">
              {`${user.yearOfGraduation}卒`}
            </li>

            {/* 性別の表示 */}
            <li className="userDetail-window__gender">
              &nbsp;|&nbsp;性別:{renderGender(user.sex)}
              &nbsp;|&nbsp;
            </li>

            {/* 希望職種の表示 */}
            <li className="userDetail-window__job">
              {user.desiredOccupation?.name}
            </li>
          </ul>
        </div>
      </div>
      <div className="userDetail-window__right-col">
        <a href={`mailto:${user.email}`} className="btn btn--mail">
          <img src={MailIcon} alt="" />
        </a>

        {/* マイページならプロフィールを編集ボタンを表示 */}
        {pageType === 'myPage' && (
          <ActionBtn
            type="button"
            txt="プロフィールを編集"
            isPlus={false}
            linkUrl="profile-edit"
          />
        )}
      </div>
    </div>
  );
};

export default UserData;
