import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toue } from '../../../assets/images';
import { Company } from '../../../services/models';

interface Props {
  company: Company;
}

const CompanyCard: React.FC<Props> = ({ company }) => {
  const checkTextLength = () => {
    const MAX_LENGTH = 30;
    if (company.businessDescription.length > MAX_LENGTH) {
      return company.businessDescription.substr(0, MAX_LENGTH) + '...';
    }
    return company.businessDescription;
  };

  const checkPrefLength = () => {
    const { prefectures } = company;

    if (!prefectures) return '';

    const prefArray: any = [];
    prefectures.forEach(value => {
      prefArray.push(value.name);
    });
    let output = String(prefArray).replace(/,/g, ' ');
    const MAX_LENGTH = 4;
    if (prefectures.length > MAX_LENGTH) {
      const output = prefectures.slice(0, MAX_LENGTH);
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
    const dateTime: string = String(company.createdAt).slice(0, 10);
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
    // <article className={`company-card ${props.class}`}>
    <article className={`company-card`}>
      <Link to={`/company-detail/${company.id}/about`}>
        <figure className="company-card__img">
          <img src={company.logoImageUrl ?? toue} alt="" />
        </figure>
        <h3 className="company-card__name">{company.companyName}</h3>
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
