import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { SelectPrimary } from '../../Atoms/Input';
import { InsertAddBtn } from '../../Atoms/Btn';
import { CompanyInfo } from '../../Molecules/Card';
import { StepSheet } from '../../Organisms/Window';
import {
  indexJob,
  detailCompany,
  indexInternship,
} from '../../../assets/script';
interface Props {
  match?: any;
}

const Step: React.FC<Props> = props => {
  const companyId = props.match.params.id;
  let [inputWindow, setInputWindow] = useState([{ id: 1 }]);
  let inputLength = inputWindow.length;
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  let [jobs, setJobs] = useState();
  let [company, setCompany] = useState<any>();
  let [internship, setInternship] = useState();
  useEffect(() => {
    indexJob().then((getData: any) => {
      setJobs(getData.data);
    });
    indexInternship().then((getData: any) => {
      setInternship(getData.data);
    });
    detailCompany(companyId).then((getData: any) => {
      setCompany(getData.data);
      setLoading(true);
    });
  }, []);

  const createInputWindow = () => {
    if (inputLength < 10) {
      setInputWindow([...inputWindow, { id: inputLength + 1 }]);
    }
  };
  const renderDOM = () => {
    return (
      <main className="main company-info-edit">
        <div className="main__container">
          <button
            className="btn pageBack-link"
            onClick={() => history.goBack()}
          >
            <span className="heading4">情報一覧へ</span>
          </button>
          <div id="type-step" className="company-info-edit__container">
            <form className="company-info-edit__left-col">
              <article className="contentBox contentBox--big">
                <h1 className="heading4">概要</h1>
                <div className="label-input mb16">
                  <p className="label-input__txt">
                    選考種類<span className="cAttention">*</span>
                  </p>
                  <SelectPrimary
                    name="selection_type"
                    options={internship}
                    required={true}
                  />
                </div>
                <div className="contentBox__flex">
                  <div className="label-input">
                    <p className="label-input__txt">
                      応募職種<span className="cAttention">*</span>
                    </p>
                    <SelectPrimary name="job" options={jobs} required={true} />
                  </div>
                  {/* <div className="label-input">
                    <FreeWordInput isRequired={true} type="string" ttl="その他" placeholder="職種を入力" />
                </div> */}
                </div>
              </article>

              {/* <InputWindowListStep obj={inputWindow} /> */}
              {inputWindow.map(box => {
                return <StepSheet id={box.id} />;
              })}

              <InsertAddBtn txt="項目を追加" click={createInputWindow} />
            </form>
            <CompanyInfo data={company} />
          </div>
        </div>
      </main>
    );
  };

  return <>{loading && renderDOM()}</>;
};

export default Step;
