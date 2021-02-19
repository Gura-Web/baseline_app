import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AboutBar } from '../../Organisms/CompanyDetail';
import { detailCompany, indexJob } from '../../../assets/script';
import { rikuma } from '../../../assets/images/index';
import { UserList } from '../../../components/Organisms/Window';

interface Props {
  thisPage: string;
  match?: any;
}

const InsertUsers: React.FC<Props> = props => {
  const companyId = props.match.params.companyId;
  const [companyData, setCompanyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [jobs, setJobs] = useState<any>();
  const history = useHistory();
  useEffect(() => {
    indexJob().then((getData: any) => {
      setJobs(getData.data);
    });

    detailCompany(companyId).then((getData: any) => {
      if (getData.data) {
        setCompanyData(getData.data);
        setLoading(true);
        console.log(getData.data);
      }
    });
  }, []);
  let pageTtl: string;
  if (props.thisPage === 'insert-users') {
    pageTtl = '情報提供に協力した方';
  } else if (props.thisPage === 'company-users') {
    pageTtl = 'この会社に就職した方';
  }
  let beforeId: number;
  const renderDOM = () => {
    return (
      <>
        <button className="btn pageBack-link" onClick={() => history.goBack()}>
          <span className="heading4">戻る</span>
        </button>
        <section className="app-main insert-users company-detail">
          <div className="left-col">
            <AboutBar
              companyData={companyData}
              thisPage="insertUsers"
              companyId={'1'}
              hasActionBtn={true}
            />

            <section className="companyDetail-contents userCard">
              <h2 className="heading4 withAccent">{pageTtl}</h2>
              <div className="userCard-list">
                {companyData.company_information.map((data: any) => {
                  if (beforeId == data.user.id) {
                  } else {
                    beforeId = data.user.id;
                    return (
                      <article className="user-card">
                        <Link to={`/user/${data.user.id}`}>
                          <img
                            src={
                              data.user.icon_image_path
                                ? data.user.icon_image_path
                                : rikuma
                            }
                            alt=""
                          />
                          <div className="user-card__wrapper">
                            <h1 className="user-card__name">
                              {data.user.first_name + ' ' + data.user.last_name}
                            </h1>
                            <div className="user-card__wrap">
                              <p>
                                {data.user.year_of_graduation}卒 |&nbsp;
                                <span>
                                  {jobs![data.user.desired_occupations] &&
                                    jobs![data.user.desired_occupations].name}
                                  希望
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  }
                })}
              </div>
            </section>
          </div>

          {/* <div className="right-col">
            {props.thisPage === "insert-users" && (
              <UserList thisPage="insert-users" />
            )}
            {props.thisPage === "company-users" && (
              <UserList thisPage="company-users" />
            )}
          </div> */}
        </section>
      </>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default InsertUsers;
