import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserList } from '../../Organisms/Window';
import { Categories, AboutBar } from '../../Organisms/CompanyDetail';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import { showCompany, detailCompany } from '../../../assets/script';
import { motion } from 'framer-motion';

interface Props {
  match?: any;
}

const CompanyDetail: React.FC<Props> = props => {
  const companyId = props.match.params.id;
  const thisPage = props.match.params.category;
  const [companyData, setCompanyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    showCompany(1).then(getData => {
      console.log(getData);
    });
    getCompanyData();
  }, []);
  const getCompanyData = () => {
    return detailCompany(companyId).then((getData: any) => {
      if (getData.data) {
        setCompanyData({
          ...getData.data,
        });
        setLoading(true);

        return getData.data;
      }
    });
  };
  const renderDOM = () => {
    return (
      <motion.section
        className="app-main"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <button
          className="btn pageBack-link"
          onClick={() => history.push(`/search-company`)}
        >
          <span className="heading4">戻る</span>
        </button>
        <div className="company-detail">
          <div className="left-col">
            <AboutBar
              companyId={companyId}
              hasActionBtn={true}
              thisPage="detail"
              companyData={companyData}
            />
            <Categories
              companyId={companyId}
              thisPage={thisPage}
              companyData={companyData}
              getCompanyData={getCompanyData}
            />
          </div>
          <div className="right-col">
            <UserList thisPage="insert-users" companyData={companyData} />
            <UserList thisPage="company-users" companyData={companyData} />
          </div>
        </div>
      </motion.section>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default CompanyDetail;
