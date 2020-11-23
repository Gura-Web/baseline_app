import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { AboutBar } from "../../Organisms/CompanyDetail";
import { detailCompany } from ".././../../assets/script/";
import { Avatar } from "../../../assets/images/index";
interface Props {
  thisPage: string;
  match?: any;
}

const InsertUsers: React.FC<Props> = (props) => {
  const companyId = props.match.params.companyId;
  const [companyData, setCompanyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    detailCompany(companyId).then((getData: any) => {
      if (getData.data) {
        setCompanyData(getData.data);
        setLoading(true);
        console.log(getData.data);
      }
    });
  }, []);
  let pageTtl: string;
  if (props.thisPage === "insert-users") {
    pageTtl = "情報提供に協力した方";
  } else if (props.thisPage === "company-users") {
    pageTtl = "この会社に就職した方";
  }
  const renderDOM = () => {
    return (
      <>
        <button className="btn pageBack-link" onClick={() => history.goBack()}>
          <span className="heading4">戻る</span>
        </button>
        <section className="app-main company-detail">
          <div className="left-col">
            <AboutBar
              companyData={companyData}
              thisPage="insertUsers"
              companyId={"1"}
              hasActionBtn={true}
            />

            <section className="companyDetail-contents userCard">
              <h2 className="heading4 withAccent">{pageTtl}</h2>
              <div className="userCard-list">
                {companyData.company_information.map((data: any) => {
                  return (
                    <article className="user-card">
                      <Link to={`/user/${data.user.id}`}>
                        <img src={data.user.icon_image_path} alt="" />
                        <div className="user-card__wrapper">
                          <h1 className="user-card__name">
                            {data.user.first_name + " " + data.user.last_name}
                          </h1>
                          <div className="user-card__wrap">
                            <p>{data.user.year_of_graduation}卒</p>
                            <p>{data.user.desired_occupations}希望</p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="right-col">
            {/* {props.thisPage === "insert-users" && (
            <UserList thisPage="insert-users" />
          )}
          {props.thisPage === "company-users" && (
            <UserList thisPage="company-users" />
          )} */}
          </div>
        </section>
      </>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default InsertUsers;