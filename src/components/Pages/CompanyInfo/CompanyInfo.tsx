import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AboutBar } from '../../Organisms/CompanyDetail';
import { PostStudent } from '../../Molecules/Card';
import { Primary } from '../../Atoms/TextInput/index';
import { CheckboxWithText } from '../../Molecules/Input';
import { ActionBtn, RoundedBtn } from '../../Atoms/Btn';
import { Modal } from '../../Organisms/Modal';
import { motion } from 'framer-motion';
import { pageTransitionNormal } from '../../../assets/script/pageTransition';
import { rikuma } from '../../../assets/images';
import {
  detailCompany,
  companyDetailUser,
  getMyData,
  employmentstatusEdit,
  showEmploymentStatus,
} from '../../../assets/script';
interface Props {
  myData: any;
  match?: any;
}

const CompanyInfo: React.FC<Props> = props => {
  const history = useHistory();
  const companyId = Number(props.match.params.id);
  const [companyData, setCompanyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [myData, setMyData] = useState<any>();
  const [myCompanyInfo, setMyCompanyInfo] = useState([]);
  const [occupationalCategoryId, setOccupationalCategoryId] = useState();
  const [isOfferd, setIsOfferd] = useState<boolean>(false);

  useEffect(() => {
    console.log(companyId);
    showEmploymentStatus(companyId).then((getData: any) => {
      if (getData) {
        if (getData.data.decision_offer) {
          setIsOfferd(true);
        }
      }
    });
    detailCompany(companyId).then((getData: any) => {
      if (getData.data) {
        setCompanyData({
          ...getData.data,
        });
      }
    });
    getMyData()
      .then((mydata: any) => {
        if (mydata.data) {
          setMyData({
            profile: {
              id: mydata.data.id,
              first_name: mydata.data.first_name,
              last_name: mydata.data.last_name,
              student_number: mydata.data.student_number,
              year_of_graduation: mydata.data.year_of_graduation,
              icon_image_path: mydata.data.icon_image_path,
              sex: mydata.data.sex,
              email: mydata.data.email,
              desired_occupations: mydata.data.desired_occupations,
            },
          });
          console.log(mydata.data);
          return mydata.data;
        }
      })
      .then(userData => {
        companyDetailUser(companyId, userData.id).then((getData: any) => {
          console.log(getData.data);
          setOccupationalCategoryId(getData.data.user.desired_occupations);
          const myCompanyData = getData.data.user.company_information.filter(
            (item: any) => {
              return item.company_id == companyId;
            },
          );
          setMyCompanyInfo(myCompanyData);
          setLoading(true);
        });
      });
  }, []);

  const graduationYearConversion = (txt: string) => {
    const text = txt;
    return text.substr(2, 2);
  };

  const onEmploymentsEdit = (content: any) => {
    console.log(occupationalCategoryId);
    const decisionOffer = document.querySelector(
      'input[name="decision_offer"]',
    )! as HTMLInputElement;

    let decisionOfferNum = 0;
    if (decisionOffer.checked) decisionOfferNum = 1;
    const sendObj = {
      company_id: companyData.id,
      decision_offer: decisionOfferNum,
      occupational_category_id: Number(occupationalCategoryId),
    };
    console.log(sendObj);
    employmentstatusEdit(sendObj).then(boolean => {
      history.push(`/company-detail/${companyData.id}/about`);
    });
  };

  const isType = (item: any) => {
    if (item.interviews.length != 0) {
      return 'interview';
    } else if (item.selections.length != 0) {
      return 'step';
    } else {
      return 'entry';
    }
  };
  const renderDOM = () => {
    return (
      <>
        <motion.section
          className="app-main company-info single"
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransitionNormal}
        >
          <button
            className="btn pageBack-link"
            onClick={() => history.goBack()}
          >
            <span className="heading4">企業詳細へ</span>
          </button>
          <AboutBar
            companyData={companyData}
            thisPage="info"
            companyId={companyId}
            hasActionBtn={false}
          />
          <div className="contentBox2">
            <h2 className="heading4">共通情報</h2>
            <div className="company-info__form">
              <form action="">
                <Primary
                  name="graduation_year"
                  type="number"
                  ttl="卒業年次"
                  placeholder={''}
                  defaultValue={myData.profile.year_of_graduation}
                  unit="卒"
                  isRequired={false}
                  maxLength={3}
                  disabled={true}
                />
                <div>
                  <CheckboxWithText
                    type="checkbox"
                    keyName="decision_offer"
                    txt="あなたはこの企業に入社予定ですか？"
                    isChecked={isOfferd}
                  />
                  <RoundedBtn
                    Func={onEmploymentsEdit}
                    txt="保存"
                    isType="button"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="contentBox2 added-info">
            <div>
              <h2 className="heading4">あなたが記入した情報</h2>
              <ActionBtn
                type="button"
                txt="情報を追加する"
                isPlus={false}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
            <ul className="company-info__added">
              {myCompanyInfo.map((item: any) => {
                if (item.company_comments.length === 0) {
                  return (
                    <li>
                      <PostStudent
                        type={isType(item)}
                        category_id={1}
                        company_id={companyId}
                        student_id={myData.profile.id}
                        ttl={item.internship ? item.internship.name : '未入力'}
                        isPass={false}
                        job={myData.profile.desired_occupations}
                        icon={
                          myData.profile.icon_image_url
                            ? myData.profile.icon_image_url
                            : rikuma
                        }
                        userName={
                          myData.profile.first_name +
                          ' ' +
                          myData.profile.last_name
                        }
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </motion.section>
        <Modal
          type="select-post-category"
          showModal={showModal}
          setShowModal={setShowModal}
          companyId={companyId}
        />
      </>
    );
  };
  return <>{loading && renderDOM()}</>;
};

export default CompanyInfo;
