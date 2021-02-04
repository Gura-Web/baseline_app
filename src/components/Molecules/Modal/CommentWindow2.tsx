import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RoundedBtn } from '../../Atoms/Btn';
import { Avatar } from '../../../assets/images/index';
import { mypage } from '../../../assets/script/';
import axios from 'axios';

const modal = {
  hidden: {
    left: '50vw',
    top: '80vh',
    opacity: 0,
  },
  visible: {
    top: '45vh',
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

interface Props {
  title: string;
  // showModal: any;
  // setShowModal: any;
  // setSaveTextModal: any;
  content?: string;
  // setCurrentText?: any;
  // btnClickFunc?: any;
  // editId?: number;
  // type?: string;
  registerButtonHandle: () => void;
}

export const CommentWindow2: React.FC<Props> = ({ title, content }) => {
  const [inputText, setInputText] = useState({
    count: 0,
    textValue: 'initial value',
  });
  // const [draft, setDraft] = useState<any>();
  // const [myData, setMyData] = useState<any>();
  // const [loading, setLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   const url = './draft.json';
  //   axios.get(url).then(res => {
  //     const output = res.data;
  //     setDraft(output);
  //   });
  //   if (props.content) {
  //     setInputText({
  //       count: props.content.length,
  //       textValue: props.content,
  //     });
  //   }
  //   mypage().then((getData: any) => {
  //     setMyData(getData.data);
  //     setLoading(true);
  //   });
  // }, []);
  // // console.log(myData);
  //
  const handleTextChange = (textValue: string) => {
    setInputText({
      count: inputText.count,
      textValue,
    });
  };
  const handleCountChange = (textLength: number) => {
    setInputText({
      count: textLength,
      textValue: inputText.textValue,
    });
  };
  //
  // const draftClickHandler = () => {
  //   props.setSaveTextModal(true);
  //   const currentText = document.querySelector(
  //     '.modal__textarea',
  //   )! as HTMLTextAreaElement;
  //   props.setCurrentText(currentText.value);
  // };
  //
  // const onClickHandler = () => {
  //   const currentText = document.querySelector(
  //     '.modal__textarea',
  //   )! as HTMLTextAreaElement;
  //   props.setCurrentText(currentText.value);
  //   if (props.type === 'regist') {
  //     props.btnClickFunc(currentText.value);
  //   }
  //   if (props.type === 'edit') {
  //     props.btnClickFunc(props.editId, currentText.value);
  //   }
  //   if (props.type === 'company-comment') {
  //     props.btnClickFunc(currentText.value);
  //   }
  //   if (props.type === 'company-comment-edit') {
  //     props.btnClickFunc(currentText.value);
  //   }
  //
  //   props.setShowModal(false);
  // };
  //
  // const renderDOM = () => {
  //   return (
  //     <img
  //       src={myData.icon_image_url ? myData.icon_image_url : Avatar}
  //       alt=""
  //     />
  //   );
  // };

  return (
    <>
      <motion.form
        action="#"
        method="POST"
        className="modal modal--normal"
        variants={modal}
        onClick={event => event.stopPropagation()}
      >
        <div className="modal__header modal__header--normal">
          <p className="heading4">{title}</p>
        </div>
        <div
          className="btn closeIcon-btn"
          // ×ボタン
          onClick={() => {
            // props.setShowModal(false)
          }}
        />
        {/* コンテンツのテキストエリア */}
        <div className="modal__input-area">
          {/*{loading && renderDOM()}*/}
          <textarea
            name="content"
            className="modal__textarea"
            required
            defaultValue={content ?? ''}
            onChange={e => handleTextChange(e.target.value)}
            onKeyUp={e => handleCountChange(e.currentTarget.value.length)}
          />
        </div>
        <div className="modal__bottom">
          <p className="text-count">
            <span
              className={`text-count__current-num ${inputText.count > 200 &&
                'cAttention'}`}
            >
              {inputText.count}
            </span>
            &nbsp;/ 200
          </p>
          <div>
            {/*下描きボタン*/}
            <p onClick={() => {}}>下書き</p>
            <RoundedBtn
              txt="投稿"
              className={inputText.count > 200 ? 'invalid' : ''}
              isType="button"
              // Func={onClickHandler}
            />
          </div>
        </div>
      </motion.form>
    </>
  );
};
