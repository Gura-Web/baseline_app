import React from 'react';
import { Link } from 'react-router-dom';
import { AccountDefaultIcon, rikuma } from '../../../assets/images/index';

interface Props {
  isSmall: boolean;
  textLengthCheckFunc: any;
  id: number;
  name?: string;
  content?: string;
  updated_at?: string;
  icon?: string;
}
const Activity: React.FC<Props> = props => {
  const timeTextConversion = () => {
    const dateTime: string = String(props.updated_at).slice(0, 10);
    const timeText: string = dateTime.replace(/-/g, '.');
    const texts: {
      dateTime: string;
      timeText: string;
    } = {
      dateTime,
      timeText,
    };
    return texts;
  };

  const viewTime = () => {
    if (!props.isSmall) {
      return (
        <>
          <div className="activity-card__wrap">
            <p className="activity-card__name">{props.name}</p>
            <p className="activity-card__time">
              <time dateTime={timeTextConversion().dateTime}>
                {timeTextConversion().timeText}
              </time>
            </p>
          </div>
          <p className="activity-card__txt">
            {props.textLengthCheckFunc(props.content && props.content, 60)}
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="activity-card__name">{props.name}</p>
          <p className="activity-card__txt mb8">
            {props.textLengthCheckFunc(props.content && props.content, 60)}
          </p>
          <p className="activity-card__time">
            <time dateTime={timeTextConversion().dateTime}>
              {timeTextConversion().timeText}
            </time>
          </p>
        </>
      );
    }
  };

  let activityName = props.isSmall ? 'normal' : 'small';
  console.log(props.icon);
  return (
    <article className={'activity-card ' + activityName}>
      <Link to={`/user/${String(props.id)}`}>
        <img className="activity-card__img" src={props.icon ?? rikuma} alt="" />
        {viewTime()}
      </Link>
    </article>
  );
};

export default Activity;
