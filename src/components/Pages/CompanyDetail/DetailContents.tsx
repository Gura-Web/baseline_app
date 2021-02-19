import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Contents } from '../../Organisms/CompanyDetail';
import { UnofficialOffer } from '../../Molecules/Bar';
import { motion } from 'framer-motion';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import { getUserData } from '../../../assets/script';
import axios from 'axios';

interface Props {
  match?: any;
}

const DetailContents: React.FC<Props> = props => {
  const thisPage = props.match.params.category;
  const params = props.match.params;
  const history = useHistory();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // indexEntry(1).then((getData) => {
    //   console.log(getData);
    // });
    getUserData(params.student_id).then((getData: any) => {
      console.log(getData.data);
      setUserData(getData.data);
      setLoading(true);
    });
  }, []);

  return (
    <motion.section
      className="app-main companyDetail-contents signle"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransitionNormal}
    >
      <button
        className="btn pageBack-link"
        onClick={() =>
          history.push(`/company-detail/${params.company_id}/about`)
        }
      >
        <span className="heading4">企業情報へ</span>
      </button>
      <UnofficialOffer
        student_id={params.student_id}
        company_id={params.company_id}
        isLoading={loading}
        userData={userData}
      />

      <Contents
        params={params}
        thisPage={thisPage}
        userData={userData}
        isLoading={loading}
      />
    </motion.section>
  );
};

export default DetailContents;
