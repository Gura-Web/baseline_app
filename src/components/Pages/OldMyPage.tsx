import React, { useState, useEffect } from 'react';
import { GearIcon } from '../../assets/images/index';
import { Link, useLocation } from 'react-router-dom';
import { OldUserData } from '../Molecules/Bar';
import { ActivityMeter } from '../Organisms/Activity';
import { OldComment } from '../Molecules/Card';
import { Modal } from '../Organisms/Modal';
import { motion } from 'framer-motion';
import { mypage } from '../../assets/script';
import { pageTransitionNormal } from '../../assets/script/pageTransition';
interface Props {
  getMyData: any;
  myData: any;
  loading: boolean;
  setMyData: any;
  match?: any;
}

const OldMyPage: React.FC<Props> = props => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<any>();
  const [editId, setEditId] = useState<number>();
  const [deleteId, setDeleteId] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    mypage().then((getData: any) => {
      if (getData) {
        props.setMyData({
          ...props.myData,
          data: getData.data,
          company_information: getData.data.company_information,
        });
      }
      console.log(getData.data);
      setLoading(true);
    });
  }, []);

  const commentEdit = (id: number, isOpen: boolean, content: string) => {
    setShowModal(isOpen);
    setEditContent(content);
    setEditId(id);
  };

  const commentDelete = (id: number, isOpen: boolean) => {
    setShowModal2(isOpen);
    setDeleteId(id);
  };

  const renderMyActivities = () => {
    const activitiesArrray: any[] = [];
    if (props.myData.company_information) {
      props.myData.company_information.forEach((data: any) => {
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
          name={
            props.myData.data.first_name + ' ' + props.myData.data.last_name
          }
          year={data.activity.posted_year}
          txt={data.activity.content}
          updateTime={data.updated_at}
          isArrow={true}
          type={'mypage'}
          clickFunc={commentEdit}
          clickFunc2={commentDelete}
          icon={props.myData.data.icon_image_url}
        />
      ));
    }
  };

  const renderDOM = () => {
    return (
      <>
        <motion.section
          className={`app-main mypage single`}
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <h2 className="heading1">マイページ</h2>

          <OldUserData
            isPage="mypage"
            userData={props.myData.data}
            userId={props.myData.data.id}
          />

          <Link to="/01/account-setting" className="icon-txt icon-txt--normal">
            <img src={GearIcon} alt="" />
            アカウント設定へ
          </Link>
          {/* <ActivityMeter /> */}
          <div className="activity-list">{renderMyActivities()}</div>
        </motion.section>
        <Modal
          type="activity-edit"
          showModal={showModal}
          setShowModal={setShowModal}
          content={editContent}
          editId={editId}
          getMyData={props.getMyData}
        />
        <Modal
          type="activity-delete"
          showModal={showModal2}
          setShowModal={setShowModal2}
          deleteId={deleteId}
          getMyData={props.getMyData}
        />
      </>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default OldMyPage;
