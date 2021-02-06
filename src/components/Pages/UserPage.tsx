import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { OldUserData } from '../Molecules/Bar';
import { OldComment } from '../Molecules/Card';
import { Modal } from '../Organisms/Modal';
import { motion } from 'framer-motion';
import { pageTransitionNormal } from '../../assets/script/pageTransition';
import { getUserData } from '../../assets/script';
import axios from 'axios';
interface Props {
  match?: any;
}

const UserPage: React.FC<Props> = props => {
  const history = useHistory();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);

  const [activity, setActivity] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const userId = props.match.params.id;

  useEffect(() => {
    const url = './activity.json';
    axios.get(url).then(res => {
      const output = res.data;
      setActivity(output);
    });

    const url2 = './database/account.json';
    axios.get(url2).then(res => {
      const output = res.data;
      setAccount(output);
    });

    getUserData(userId).then((userData: any) => {
      setUserData(userData.data);
      console.log(userData.data);
      setLoading(true);
    });
  }, []);
  const renderActivities = () => {
    const activitiesArrray: any[] = [];
    if (userData.company_information) {
      userData.company_information.forEach((data: any) => {
        if (data.my_activities[0])
          activitiesArrray.push({
            id: data.id,
            activity: data.my_activities[0],
            updated_at: data.updated_at,
          });
      });
      return activitiesArrray.map((data: any) => (
        <OldComment
          id={data.id}
          name={userData.first_name + ' ' + userData.last_name}
          year={data.activity.posted_year}
          txt={data.activity.content}
          updateTime={data.updated_at}
          isArrow={false}
          type={'user'}
          icon={userData.icon_image_url}
        />
      ));
    }
  };

  const renderDOM = () => {
    return (
      <>
        <motion.section
          className={`app-main user-page single`}
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <button
            className="btn pageBack-link"
            onClick={() => history.goBack()}
          >
            <span className="heading4">戻る</span>
          </button>
          <h2 className="heading1">
            {/* {isUsrPage
            ? `${
                account
                  ? account[props.match.params.id - 1].last_name +
                    " " +
                    account[props.match.params.id - 1].first_name
                  : ""
              }さんのページ`
            : "マイページ"} */}
          </h2>

          <OldUserData
            isPage="userpage"
            userData={userData}
            userId={userData.id}
          />
          {/* <ActivityMeter /> */}
          {/* <div className="activity-list">
            {(() => {
              if (activity) {
                return activity.map((data: any) => (
                  <OldComment
                    name={data.name}
                    year={data.year}
                    txt={data.txt}
                    updateTime={data.updateTime}
                    isArrow={true}
                    type={"user"}
                    clickFunc={setShowModal}
                    clickFunc2={setShowModal2}
                  />
                ));
              }
            })()}
          </div> */}
          <div className="activity-list">{renderActivities()}</div>
        </motion.section>
        <Modal
          type="activity-edit"
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Modal
          type="activity-delete"
          showModal={showModal2}
          setShowModal={setShowModal2}
        />
      </>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default UserPage;
