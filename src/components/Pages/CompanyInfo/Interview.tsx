import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { InterviewPage } from '../../Organisms/Window';
import { CompanyInfo } from '../../Molecules/Card';
import { motion } from 'framer-motion';
import {
  indexJob,
  indexInternship,
  detailCompany,
  showCompany,
} from '../../../assets/script';

interface Props {
  match?: any;
}
const Interview: React.FC<Props> = props => {
  let [loading, setLoading] = useState<boolean>(false);
  const companyId = props.match.params.id;
  const history = useHistory();
  const pageTransition = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
    out: {
      y: -20,
      opacity: 0,
    },
  };

  let [inputWindow, setInputWindow] = useState([{ id: 1 }]);
  let [inputPages, setInputPages] = useState([
    {
      id: 1,
      page: <></>,
    },
  ]);
  let pagesLength = inputPages.length;
  let windowLength = inputWindow.length;
  function createInputWindow() {
    if (windowLength < 10) {
      setInputWindow([...inputWindow, { id: windowLength + 1 }]);
    }
  }

  const addTabBtn = useRef<HTMLButtonElement>(null);
  const insertTab = useRef<HTMLOListElement>(null);

  let isFirstClick: boolean;
  let [jobs, setJobs] = useState();
  let [internship, setInternship] = useState();
  let [company, setCompany] = useState<any>();
  useEffect(() => {
    isFirstClick = true;
    indexJob().then((getData: any) => {
      setJobs(getData.data);
    });
    indexInternship().then((getData: any) => {
      setInternship(getData.data);
      console.log(getData.data);
    });

    detailCompany(companyId).then((getData: any) => {
      console.log(getData.data);
      setCompany(getData.data);
      setLoading(true);
    });
  }, []);

  const createTabMenu = () => {
    if (pagesLength < 6) {
      const nowCurrentEl = document.querySelector('.insert-tab__item.current')!;
      nowCurrentEl.classList.remove('current');

      // タブを増やす処理
      const li = document.createElement('li');
      const span = document.createElement('span');
      li.classList.add('insert-tab__item');
      li.id = `insertTab-${pagesLength}`;
      li.dataset.id = pagesLength.toString();
      li.classList.add('current');
      li.appendChild(span);
      span.textContent = `${pagesLength + 1}次面接`;
      insertTab.current?.append(li);

      // ⭐️ページ切り替えのスタイルをつける
      const AllInputWindow = document.querySelectorAll(
        '.company-info-edit__left-col',
      );
      AllInputWindow.forEach(el => {
        el.classList.add('none');
      });

      // 新しいページを作成
      setInputPages([
        ...inputPages,
        {
          id: pagesLength + 1,
          page: (
            <InterviewPage
              window={inputWindow}
              func={createInputWindow}
              pages={inputPages}
              jobs={jobs}
              internship={internship}
            />
          ),
        },
      ]);

      // タブをクリックでスタイルを変えるイベントを設定
      const tabsEl = document.querySelectorAll('.insert-tab__item')!;

      tabsEl.forEach((tab: any) => {
        tab.addEventListener('click', () => {
          tabsEl.forEach((el: any) => {
            el.classList.remove('current');
          });
          // やること
          // ① 一旦作成したinterview-数字　の要素を全てnoneにする
          // ② そのあとクリックしたタブに適するinterview-数字を表示する

          // ⭐️作ったばかりのタブ要素にもページ切り替えのスタイルをつける
          const AllInputWindow = document.querySelectorAll(
            '.company-info-edit__left-col',
          );
          AllInputWindow.forEach(el => {
            el.classList.add('none');
          });

          tab.classList.add('current');
          document
            .getElementById(`interview-${tab.dataset.id}`)
            ?.classList.remove('none');
        });
      });

      if (isFirstClick) {
        document.getElementById('interview-0')!.classList.add('none');
        isFirstClick = false;
      } else {
        const interviewEl = document.getElementById(
          `interview-${pagesLength - 1}`,
        );
        interviewEl!.classList.add('none');
      }
    }
  };

  const renderDOM = () => {
    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
      >
        <div className="insert-tab">
          <ol ref={insertTab} className="insert-tab__wrap">
            <li
              data-id="0"
              id="insertTab-0"
              className="insert-tab__item current"
            >
              <span>1次面接</span>
            </li>
            {/* <li className="insert-tab__item">二次面接</li> */}
          </ol>
          <button
            ref={addTabBtn}
            onClick={createTabMenu}
            className="btn btn--plus"
          ></button>
        </div>
        <main className="main company-info-edit">
          <div className="main__container">
            <button
              className="btn pageBack-link"
              onClick={() => history.goBack()}
            >
              <span className="heading4">情報一覧へ</span>
            </button>
            <div id="type-interview" className="company-info-edit__container">
              <InterviewPage
                window={inputWindow}
                func={createInputWindow}
                pages={0}
                jobs={jobs}
                internship={internship}
              />
              {inputPages.map(data => {
                return data.page;
              })}
              <CompanyInfo data={company} />
            </div>
          </div>
        </main>
      </motion.div>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default Interview;
