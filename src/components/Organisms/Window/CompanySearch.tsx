import React, { useState } from 'react';
import PrefecturesData from '../../../assets/data/prefectures';
import { Search } from '../../Atoms/TextInput';
import { CheckboxWithText } from '../../Molecules/Input';

interface Props {
  searchFunc: any;
  homeFreeWord: string;
  className?: string;
}

const CompanySearch: React.FC<Props> = props => {
  let isShow = false;

  const [prefNumbers, setPrefNumbers] = useState<any>([]);

  const prefSearchHandler = (value: any, isChecked: boolean) => {
    // チェックボックスつけた
    console.log('動かない');
    if (isChecked) {
      setPrefNumbers([...prefNumbers, value]);
      const prefArray = [...prefNumbers, value];
      console.log(prefArray);
      props.searchFunc({
        prefecture_id: prefArray,
      });
    } else {
      // チェックボックス外した
      const idx = prefNumbers.indexOf(value);
      if (idx >= 0) {
        prefNumbers.splice(idx, 1);
        console.log(prefNumbers);
        props.searchFunc({
          prefecture_id: prefNumbers,
        });
      }
    }
  };
  const graduateStudentHandler = (checked: any) => {
    props.searchFunc({
      enrollment_of_graduates: checked,
    });
  };

  const renderPrefecturesList = (isAllShow: boolean) => {
    return Object.entries(PrefecturesData['prefectures']).map(
      ([key, value]) => {
        return (
          <>
            <p className="checkbox-list__heading">{key}</p>
            {value.map(data => {
              return (
                <CheckboxWithText
                  id={String(data.code)}
                  keyName={data.code.toString()}
                  category={'prefectures'}
                  className={'checkbox-item'}
                  type={'checkbox'}
                  txt={data.name}
                  checkboxFunc={prefSearchHandler}
                />
              );
            })}
          </>
        );
      },
    );
  };

  const showList = () => {
    const isListBtn = document.getElementById(
      'isShow-ListBtn,
    ) as HTMLButtonElement;
    if (!isShow) {
      const prefecturesList = document.querySelector(
        '.prefectures-list__wrap'
      ) as HTMLElement;
      prefecturesList.style.height = '100%';
      prefecturesList.style.overflowY = 'visible';
      isListBtn.innerText = '閉じる';
    } else {
      const prefecturesList = document.querySelector(
        '.prefectures-list__wrap'
      ) as HTMLElement;
      isListBtn.innerText = 'すべての項目を表示';
      prefecturesList.style.height = '149px';
      prefecturesList.style.overflowY = 'hidden';
    }
    isShow = !isShow;
  };

  return (
    <div className={`sideSearchBar ${props.className}`}>
      <div className="search-item">
        <p className="search-item__name">フリーワード</p>
        <Search
          width={'200px'}
          isIcon={true}
          defaultValue={props.homeFreeWord}
          placeholder={'企業名で検索'}
          searchFunc={props.searchFunc}
          types={'company_name'}
        />
      </div>

      <div className="search-item ">
        <p className="search-item__name">地域で検索</p>
        <div className="checkbox-list prefectures-list">
          <div className="checkbox-list__wrap prefectures-list__wrap">
            {renderPrefecturesList(false)}
          </div>
          <button className="btn" id="isShow-ListBtn" onClick={showList}>
            すべての項目を表示
          </button>
        </div>
      </div>

      <div className="search-item">
        <p className="search-item__name">事業内容</p>
        <Search
          width={'200px'}
          isIcon={false}
          placeholder={'事業内容で検索'}
          searchFunc={props.searchFunc}
          types={'business'}
        />
      </div>

      <div className="search-item">
        <CheckboxWithText
          className={'search-item__checkbox'}
          type={'checkbox'}
          category={'enrollment_of_graduates'}
          txt={'卒業生の在籍'}
          keyName={'alumni'}
          checkboxFunc={graduateStudentHandler}
        />
      </div>
    </div>
  );
};

export default CompanySearch;
