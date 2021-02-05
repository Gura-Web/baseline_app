import React from 'react';
import { MailIcon, rikuma } from '../../../assets/images/index';
import { ActionBtn } from '../../Atoms/Btn';

import { User } from '../../../services/models';

interface Props {
  user: User;
  // userId: any;
  // isPage: 'mypage' | 'userpage';
}

const UserData: React.FC<Props> = ({ user }) => {
  const renderGender = (num: number) => {
    const gender = ['男性', '女性', 'その他'];

    return gender[num];
  };

  return (
    <div className="userDetail-window">
      <div className="userDetail-window__container">
        <img src={user.iconImageUrl ?? rikuma} alt="" />
        <div>
          <div className="userDetail-window__wrap">
            <p className="userDetail-window__name">
              {`${user.firstName} ${user.lastName}`}
            </p>
            <p className="userDetail-window__id">@{user.studentNumber}</p>
          </div>
          <ul className="userDetail-window__list">
            <li className="userDetail-window__year">
              {`${user.yearOfGraduation}卒`}
            </li>
            <li className="userDetail-window__gender">
              &nbsp;|&nbsp;性別:{renderGender(user.sex)}
              &nbsp;|&nbsp;
            </li>
            <li className="userDetail-window__job">
              {/* TODO 直す*/}
              {/* {props.userData.desired_occupation.name}*/}
            </li>
          </ul>
        </div>
      </div>
      <div className="userDetail-window__right-col">
        <a href={`mailto:${user.email}`} className="btn btn--mail">
          <img src={MailIcon} alt="" />
        </a>
        {/* {props.isPage == 'mypage' ? (*/}
        {/*  <ActionBtn*/}
        {/*    type="button"*/}
        {/*    txt="プロフィールを編集"*/}
        {/*    isPlus={false}*/}
        {/*    linkUrl="profile-edit"*/}
        {/*  />*/}
        {/* ) : (*/}
        {/*  ''*/}
        {/* )}*/}
      </div>
    </div>
  );
};

export default UserData;
