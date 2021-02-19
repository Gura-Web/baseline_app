import React from 'react';
import { toue } from '../../../assets/images';

interface Props {
  companyData: any;
}

const CompanyExcerpt: React.FC<Props> = props => {
  const checkTextLength = (MAX_LENGTH: number, el: any) => {
    if (el.length > MAX_LENGTH) {
      return el.substr(0, MAX_LENGTH) + '...';
    }
    return el;
  };

  if (!props.companyData) {
    return <></>;
  }

  // console.log(props.companyData);

  return (
    <article className="companyExcerpt-card">
      <img src={props.companyData?.logo_image_url ?? toue} alt="" />
      <div className="companyExcerpt-card__wrap">
        <h1 className="heading5">{props.companyData.company_name}</h1>
        <p className="companyExcerpt-card__link">
          <a href={props.companyData.company_url}>
            {checkTextLength(30, props.companyData.company_url)}
          </a>
        </p>
      </div>
    </article>
  );
};

export default CompanyExcerpt;
