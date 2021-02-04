import React from 'react';
import { rikuma, ArrowIcon } from '../../../assets/images/index';
interface Props {
  name: string;
  student_number: string;
  ml: string;
  isArrow: boolean;
  iconPath: string | null;
  clickFunc?: any;
}
const MyAvatar: React.FC<Props> = props => {
  const isArrowRender = () => {
    if (props.isArrow) {
      return <img src={ArrowIcon} alt="" />;
    }
  };
  return (
    <div className="myAvatar" onClick={props.clickFunc}>
      <img className="myAvatar__icon" src={props.iconPath ?? rikuma} alt="" />
      <div className="myAvatar__wrap" style={{ marginLeft: props.ml }}>
        <p className="myAvatar__name">{props.name}</p>
        <p className="myAvatar__id">@{props.student_number}</p>
      </div>
      <div className="myAvatar__arrow">{isArrowRender()}</div>
    </div>
  );
};

export default MyAvatar;
