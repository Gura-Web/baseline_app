import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SelectPrimary } from "../../Atoms/Input";
import { InsertAddBtn } from "../../Atoms/Btn";
import { CompanyInfo } from "../../Molecules/Card/index";
import { motion } from "framer-motion";
import { EntrySheet } from "../../Organisms/Window";

const Entry: React.FC = (props) => {
  const pageTransition = {
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
    out: {
      x: 20,
      opacity: 0,
    },
  };
  const jobInterviewTypes = [
    "本選考",
    "サマーインターン",
    "ウィンターインターン",
    "スプリングインターン",
  ];
  const jobTypes = [
    "デザイナー",
    "エンジニア",
    "企画職",
    "イラストレーター",
    "その他",
  ];

  let [inputWindow, setInputWindow] = useState([{ id: 1 }]);
  let inputLength = inputWindow.length;

  const createInputWindow = () => {
    if (inputLength < 10) {
      setInputWindow([...inputWindow, { id: inputLength + 1 }]);
    }
  };

  return (
    <motion.main
      className="main company-info-edit"
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <div className="main__container">
        <Link to="/company-info" className="btn pageBack-link">
          <span className="heading4">情報一覧へ</span>
        </Link>
        <div id="type-entry" className="company-info-edit__container">
          <form className="company-info-edit__left-col">
            <article className="contentBox contentBox--big">
              <h1 className="heading4">概要</h1>
              <div className="label-input mb16">
                <p className="label-input__txt">
                  選考種類<span className="cAttention">*</span>
                </p>
                <SelectPrimary
                  name="selection_type"
                  options={jobInterviewTypes}
                  required={false}
                />
              </div>
              <div className="contentBox__flex">
                <div className="label-input">
                  <p className="label-input__txt">
                    応募職種<span className="cAttention">*</span>
                  </p>
                  <SelectPrimary
                    name="job"
                    options={jobTypes}
                    required={false}
                  />
                </div>
                {/* <div className="label-input">
                  <FreeWordInput
                    isRequired={true}
                    type="string"
                    ttl="その他"
                    placeholder="職種を入力"
                  />
                </div> */}
              </div>
            </article>

            {/* <InputWindowListEntry obj={inputWindow} /> */}
            {inputWindow.map((box) => {
              return <EntrySheet id={box.id} />;
            })}

            <InsertAddBtn txt="項目を追加" click={createInputWindow} />
          </form>
          <CompanyInfo />
        </div>
      </div>
    </motion.main>
  );
};

export default Entry;