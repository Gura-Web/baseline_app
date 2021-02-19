import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { indexJob } from '../../../assets/script';
import { rikuma } from '../../../assets/images/index';

interface Props {
  thisPage: string;
  companyData: any;
}

const UserList: React.FC<Props> = props => {
  const [userList, setUserList] = useState<any>();
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    if (props.thisPage === 'insert-users') {
      const userArray: object[] = [];
      let beforeId: number;
      props.companyData.company_information.forEach((data: any) => {
        if (beforeId == data.user.id) {
        } else {
          const user = {
            id: data.user.id,
            name: data.user.first_name + ' ' + data.user.last_name,
            desiredOccupations: data.user.desired_occupations,
            graduationYear: data.user.year_of_graduation,
            icon: data.user.icon_image_url,
          };
          userArray.push(user);
        }
        beforeId = data.user.id;
      });
      setUserList(userArray);
      ``;
    }
    indexJob().then((getData: any) => {
      setJobs(getData.data);
      setLoading(true);
    });
  }, []);

  let pageTtl: string, linkTo: string;
  if (props.thisPage === 'insert-users') {
    pageTtl = '情報提供に協力した方';
    linkTo = 'insert-users';
  } else if (props.thisPage === 'company-users') {
    pageTtl = 'この会社に就職した方';
    linkTo = 'company-users';
  }

  const renderUserList = () => {
    let count = 0;
    if (props.thisPage === 'insert-users') {
      if (userList) {
        return userList.map((data: any) => {
          if (count < 5) {
            count++;
            return (
              <li className="user-excerpt">
                <Link to={`/user/${data.id}`}>
                  <img src={data.icon ? data.icon : rikuma} alt="" />
                  <div className="user-excerpt__wrap">
                    <p className="user-excerpt__name">{data.name}</p>
                    <div>
                      <p className="user-excerpt__year">
                        {data.graduationYear}卒 |&nbsp;
                        <span>
                          {jobs[data.desiredOccupations] &&
                            jobs[data.desiredOccupations].name}
                          希望
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          }
        });
      }
    }
  };

  const renderDOM = () => {
    return (
      <article className="contentBox userListWindow">
        <h1 className="heading5">{pageTtl}</h1>
        <ul className="userListWindow__list">{renderUserList()}</ul>
        <Link
          className="userListWindow__link"
          to={`/${linkTo}/${props.companyData.id}`}
        >
          さらに表示する
        </Link>
      </article>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default UserList;
