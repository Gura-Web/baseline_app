import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CameraIcon, rikuma } from '../../assets/images/index';
import { editProfile, indexJob, indexYearGraduation, mypage } from '../../assets/script';
import { pageTransitionNormal } from '../../assets/script/pageTransition';
import { User } from '../../services/models';
import { RoundedBtn } from '../Atoms/Btn';
import { SelectSecondary } from '../Atoms/Input/index';
import { Secondary } from '../Atoms/TextInput';

interface Props {
  user: User;
}

const ProfileEdit: React.FC<Props> = ({ user }) => {
  const [myData, setMyData] = useState<any>();
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [yearGraduation, setYearGraduation] = useState<any>();
  useEffect(() => {
    mypage().then((getData: any) => {
      setMyData(getData.data);
      console.log(getData.data);
    });

    indexJob().then((getData: any) => {
      setJobs(getData.data);
    });
    indexYearGraduation().then((getData: any) => {
      setYearGraduation(getData.data);

      setLoading(true);
    });
  }, []);
  const history = useHistory();
  const handleLink = (path: string) => history.push(path);
  const isError = [
    { isEmpty1: false },
    { isEmpty2: false },
    { isEmpty3: false },
  ];
  const gender = [
    { id: 0, name: '男性' },
    { id: 1, name: '女性' },
    { id: 2, name: 'その他' },
  ];

  const selectBtnChanges = () => {
    const selectBtns = document.querySelectorAll('.select-btn');

    selectBtns.forEach((btn: any) => {
      btn.addEventListener('click', () => {
        selectBtns.forEach(item => {
          item.classList.remove('current');
        });
        btn.classList.add('current');
        btn.querySelector('input').checked = true;
      });
    });
  };

  interface sendObj {
    student_number: string;
    annual: number | null;
    first_name: string;
    last_name: string;
    sex: any;
    desired_occupations: number | null;
    year_of_graduation: string;
    icon?: string | undefined | ArrayBuffer | null;
  }

  let sendObj: sendObj = {
    student_number: '',
    annual: null,
    first_name: '',
    last_name: '',
    sex: null,
    desired_occupations: null,
    year_of_graduation: '',
  };

  const changeBtnClickHandler = () => {
    const firstname = (document.querySelector(
      'input[name="first_name"]',
    ) as HTMLInputElement).value;
    const lastname = (document.querySelector(
      'input[name="last_name"]',
    ) as HTMLInputElement).value;
    const gender = document.querySelectorAll(
      'input[name="gender"]',
    ) as NodeListOf<HTMLInputElement>;
    const job = (document.querySelector(
      'select[name="job"]',
    ) as HTMLSelectElement).value;
    const graduationYear = (document.querySelector(
      'select[name="graduation_year"]',
    ) as HTMLSelectElement).value;

    let genderValue;
    gender.forEach(item => {
      if (item.checked) {
        genderValue = item.value;
      }
    });

    sendObj = {
      ...sendObj,
      student_number: myData.student_number,
      annual: myData.annual,
      first_name: firstname,
      last_name: lastname,
      sex: genderValue,
      desired_occupations: Number(job),
      year_of_graduation: String(graduationYear),
    };
    console.log(sendObj);
    editProfile(myData.id, sendObj);
    handleLink('/mypage');
  };

  const handleImage = (event: any) => {
    const image = event.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    const avatarArea = document.querySelector(
      '.select-image__avatar',
    )! as HTMLImageElement;
    avatarArea.src = imageUrl;

    const file = image;
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function() {
        sendObj.icon = reader.result;
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const renderDOM = () => {
    return (
      <motion.section
        className="app-main profile-edit single"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <button className="btn pageBack-link" onClick={() => history.goBack()}>
          <span className="heading4">マイページへ</span>
        </button>
        <div>
          <div className="contentBox contentBox--big">
            <h2 className="heading4">プロフィール編集</h2>

            <div className="userEdit-header">
              <div className="userEdit-header__left-col">
                <label className="select-image">
                  <div className="select-image__wrap">
                    <img
                      className="select-image__avatar"
                      src={user.iconImageUrl ?? rikuma}
                      alt=""
                    />
                    <div className="select-image__overlay">
                      <img
                        className="select-image__icon"
                        src={CameraIcon}
                        alt=""
                      />
                      <span className="select-image__txt">画像を選択</span>
                    </div>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImage} />
                </label>
              </div>

              <div className="userEdit-header__right-col">
                <Secondary
                  name="first_name"
                  type="text"
                  labelTxt="苗字"
                  isRequired={false}
                  isRequiredTxt={false}
                  defaultValue={user.firstName}
                  placeholderTxt="山本 仁"
                  isError={isError}
                  isIcon={false}
                />
                <Secondary
                  name="last_name"
                  type="text"
                  labelTxt="名前"
                  isRequired={false}
                  isRequiredTxt={false}
                  defaultValue={user.lastName}
                  placeholderTxt="山本 仁"
                  isError={isError}
                  isIcon={false}
                />
                <div className="gender-select">
                  <p className="gender-select__heading">性別</p>
                  <ul className="gender-select-list">
                    {gender.map(data => {
                      return (
                        <li>
                          <label
                            onClick={() => selectBtnChanges()}
                            className={`btn select-btn ${
                              data.id === user.sex ? 'current' : ''
                            }`}
                          >
                            <span>{data.name}</span>
                            <input
                              onClick={event => event.stopPropagation()}
                              type="radio"
                              name="gender"
                              value={data.id}
                              checked={data.id === user.sex && true}
                            />
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="contentBox contentBox--big">
            <SelectSecondary
              ttl="希望職種"
              name="job"
              selectObj={jobs}
              // TODO 直す user.desiredOccupation?.id
              defaultValue={1}
            />
            <SelectSecondary
              ttl="卒業年次"
              name="graduation_year"
              selectObj={yearGraduation}
              defaultValue={user.yearOfGraduation}
            />
            <div className="contentBox__wrap">
              <p className="contentBox__cansel btn">
                <Link to="/mypage">キャンセル</Link>
              </p>
              <div>
                <RoundedBtn txt="変更する" Func={changeBtnClickHandler} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default ProfileEdit;
