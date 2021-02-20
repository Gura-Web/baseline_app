import React from 'react';
import { MailIcon } from '../../../assets/images/index';
import { ActionBtn } from '../../Atoms/Btn';
import { rikuma } from '../../../assets/images';
interface Props {
  userData: any;
  userId: any;
  isPage: 'mypage' | 'userpage';
}

const OldUserData: React.FC<Props> = props => {
  const renderGender = (num: number) => {
    const gender = ['男性', '女性', 'その他'];
    return gender[num];
  };

  return (
    <div className="userDetail-window">
      <div className="userDetail-window__container">
        <img
          src={
            props.userData.icon_image_url
              ? props.userData.icon_image_url
              : rikuma
          }
          alt=""
        />
        <div>
          <div className="userDetail-window__wrap">
            <p className="userDetail-window__name">
              {props.userData.first_name + ' ' + props.userData.first_name}
            </p>
            <p className="userDetail-window__id">
              @{props.userData.student_number}
            </p>
          </div>
          <ul className="userDetail-window__list">
            <li className="userDetail-window__year">
              {props.userData.year_of_graduation + '卒'}
            </li>
            <li className="userDetail-window__gender">
              &nbsp;|&nbsp;性別:{renderGender(props.userData.sex)}
              &nbsp;|&nbsp;
            </li>
            <li className="userDetail-window__job">
              {props.userData.desired_occupation.name}
            </li>
          </ul>
        </div>
      </div>
      <div className="userDetail-window__right-col">
        <a href={`mailto:${props.userData.email}`} className="btn btn--mail">
          <img src={MailIcon} alt="" />
        </a>
        {props.isPage == 'mypage' ? (
          <ActionBtn
            type="button"
            txt="プロフィールを編集"
            isPlus={false}
            linkUrl="profile-edit"
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default OldUserData;
