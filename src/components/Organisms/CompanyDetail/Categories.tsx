import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { About, Step, Entry, Interview } from './_Categories.List/index';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import axios from 'axios';

interface Props {
  thisPage: string;
  companyId: any;
  companyData: any;
  getCompanyData: any;
}

const Categories: React.FC<Props> = props => {
  let companyId = Number(props.companyId) - 1;

  const renderContents = () => {
    if (props.thisPage === 'about') {
      return (
        <About
          thisPage={props.thisPage}
          companyId={companyId}
          companyData={props.companyData}
          getCompanyData={props.getCompanyData}
        />
      );
    }
    if (props.thisPage === 'step') {
      return (
        <Step
          thisPage={props.thisPage}
          companyId={props.companyId}
          companyData={props.companyData}
        />
      );
    }
    if (props.thisPage === 'entry') {
      return (
        <Entry
          thisPage={props.thisPage}
          companyId={props.companyId}
          companyData={props.companyData}
        />
      );
    }
    if (props.thisPage === 'interview') {
      return (
        <Interview
          thisPage={props.thisPage}
          companyId={props.companyId}
          companyData={props.companyData}
        />
      );
    }
  };

  return (
    <motion.div
      className="companyContentsWindow"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransitionNormal}
    >
      <div className="companyContentsWindow__list">
        <ul>
          <li className={props.thisPage === 'about' ? 'current' : ''}>
            <Link to={`/company-detail/${props.companyId}/about`}>
              会社概要
            </Link>
          </li>
          <li className={props.thisPage === 'step' ? 'current' : ''}>
            <Link to={`/company-detail/${props.companyId}/step`}>
              選考ステップ
            </Link>
          </li>
          <li className={props.thisPage === 'entry' ? 'current' : ''}>
            <Link to={`/company-detail/${props.companyId}/entry`}>
              エントリーシート
            </Link>
          </li>
          <li className={props.thisPage === 'interview' ? 'current' : ''}>
            <Link to={`/company-detail/${props.companyId}/interview`}>
              面接情報
            </Link>
          </li>
        </ul>
      </div>
      {renderContents()}
    </motion.div>
  );
};

export default Categories;
