import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toue } from '../../../assets/images';
interface Props {
  companyId: number;
  class: string;
  name: string;
  business: string;
  pref: [];
  registerTime: number;
  img: string;
}

const CompanyCard: React.FC<Props> = props => {
  const checkTextLength = () => {
    const MAX_LENGTH = 30;
    if (props.business.length > MAX_LENGTH) {
      return props.business.substr(0, MAX_LENGTH) + '...';
    }
    return props.business;
  };

  const checkPrefLength = () => {
    const prefArray: any = [];
    props.pref.forEach((value: any) => {
      prefArray.push(value.name);
    });
    let output = String(prefArray).replace(/,/g, ' ');
    const MAX_LENGTH = 4;
    if (props.pref.length > MAX_LENGTH) {
      const output = props.pref.slice(0, MAX_LENGTH);
      const array: any = [];
      output.forEach((item: any) => {
        array.push(String(item.name));
      });

      // output = array.slice(0, MAX_LENGTH)
      return String(array).replace(/,/g, ' ') + '...';
    }
    return output;
  };

  const timeTextConversion = () => {
    const dateTime: string = String(props.registerTime).slice(0, 10);
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

  return (
    <article className={`company-card ${props.class}`}>
      <Link to={`/company-detail/${props.companyId}/about`}>
        <figure className="company-card__img">
          <img src={props.img ? props.img : toue} alt="" />
        </figure>
        <h3 className="company-card__name">{props.name}</h3>
        <p className="company-card__desc">{checkTextLength()}</p>
        {checkPrefLength() ? (
          <p className="company-card__address">{checkPrefLength()}</p>
        ) : null}
        {/* <p className="company-card__address">{checkPrefLength()}</p> */}
        <p className="company-card__time">
          <time dateTime={timeTextConversion().dateTime}>
            {timeTextConversion().timeText}
          </time>
        </p>
      </Link>
    </article>
  );
};

export default CompanyCard;
