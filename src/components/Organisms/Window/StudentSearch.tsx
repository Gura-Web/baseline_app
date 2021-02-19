import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Search } from '../../Atoms/TextInput';
import { CheckboxWithText } from '../../Molecules/Input';
import { SelectPrimary } from '../../Atoms/Input/index';
import {
  indexJob,
  indexYearGraduation,
  pageTransitionNormal,
} from '../../../assets/script/index';

interface Props {
  searchFunc: any;
  className?: string;
  setLoading: (bool: boolean) => void;
  loading: boolean;
}

const StudentSearch: React.FC<Props> = props => {
  const [jobs, setJobs] = useState<any>();
  const [yearGraduation, setYearGraduation] = useState<any>();
  useEffect(() => {
    let jobFlg = false;
    let yearGraduationFlg = false;

    indexJob().then((getData: any) => {
      setJobs(getData.data);
      console.log(getData.data);
      yearGraduationFlg = true;
      if (jobFlg && yearGraduationFlg) {
        props.setLoading(true);
      }
    });
    indexYearGraduation().then((getData: any) => {
      setYearGraduation(getData.data);
      jobFlg = true;
      if (jobFlg && yearGraduationFlg) {
        props.setLoading(true);
      }
    });
  }, []);

  const [jobNumbers, setJobNumbers] = useState<any>([]);

  let isShow = false;
  const showList = () => {
    const isListBtn = document.getElementById(
      'isShow-ListBtn',
    ) as HTMLButtonElement;
    if (!isShow) {
      const checkboxList = document.querySelector(
        '.checkbox-list__wrap',
      ) as HTMLElement;
      checkboxList.style.height = '100%';
      checkboxList.style.overflowY = 'visible';
      isListBtn.innerText = '閉じる';
      console.log(checkboxList);
    } else {
      const checkboxList = document.querySelector(
        '.checkbox-list__wrap',
      ) as HTMLElement;
      isListBtn.innerText = 'すべての項目を表示';
      checkboxList.style.height = '149px';
      checkboxList.style.overflowY = 'hidden';
    }
    isShow = !isShow;
  };

  const jobSearchHandler = (value: any, isChecked: boolean) => {
    // チェックボックスつけた
    if (isChecked) {
      setJobNumbers([...jobNumbers, value]);
      const jobArray = [...jobNumbers, value];
      console.log(jobArray);
      props.searchFunc({
        desired_occupations_id: jobArray,
      });
    } else {
      // チェックボックス外した
      const idx = jobNumbers.indexOf(value);
      if (idx >= 0) {
        jobNumbers.splice(idx, 1);
        console.log(jobNumbers);
        props.searchFunc({
          desired_occupations_id: jobNumbers,
        });
      }
    }
  };

  const [seachGraduationYear, setSeachGraduationYear] = useState<any>();

  const seachGraduationYearHandler = (value: any) => {
    setSeachGraduationYear(value);
    props.searchFunc({
      year_of_graduation: Number(value),
    });
  };

  const renderJobList = () => {
    if (jobs) {
      return jobs.map((data: any) => {
        return (
          <CheckboxWithText
            id={data.id}
            keyName={`${data.id}`}
            className="checkbox-item"
            type={'checkbox'}
            txt={data.name}
            category={'jobs'}
            checkboxFunc={jobSearchHandler}
          />
        );
      });
    }
  };
  renderJobList();

  const renderDOM = () => {
    return (
      <motion.section
        className="app-main searchCompany"
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransitionNormal}
      >
        <div className={`sideSearchBar ${props.className}`}>
          <div className="search-item">
            <p className="search-item__name">ユーザー名で検索</p>
            <Search
              width={'200px'}
              isIcon={true}
              placeholder={'検索ワードを入力'}
              searchFunc={props.searchFunc}
              types={'student_name'}
            />
          </div>

          <div className="search-item">
            <p className="search-item__name">卒業年</p>
            <SelectPrimary
              name="graduation_year"
              options={yearGraduation}
              selectFunc={seachGraduationYearHandler}
              required={false}
            />
          </div>

          <div className="search-item">
            <p className="search-item__name">希望職種</p>
            <div className="checkbox-list">
              <div className="checkbox-list__wrap">{renderJobList()}</div>
              <button className="btn" id="isShow-ListBtn" onClick={showList}>
                すべての項目を表示
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    );
  };

  console.log('どれ', props.loading);

  return <>{props.loading && renderDOM()}</>;
};

export default StudentSearch;
