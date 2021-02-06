import React, { useState, useEffect, useReducer } from 'react';
import { motion } from 'framer-motion';
import { RoundedBtn } from '../../Atoms/Btn';
import {
  TrashIcon,
  CheckIconGreen,
  MenuDownIcon,
} from '../../../assets/images/index';
import { indexDraft, registDraft, deleteDraft } from '../../../assets/script';

interface Props {
  setSaveTextModal: any;
  useDraft: any;
  currentText?: string;
}

const SaveText: React.FC<Props> = props => {
  const [draft, setDraft] = useState<any>();
  const [postedById, setPostedById] = useState<number>();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    getDraft();
    // console.log(props.currentText);
  }, []);

  const getDraft = () => {
    indexDraft().then((getData: any) => {
      setDraft(getData.data);
      if (getData.data[0]) setPostedById(getData.data[0].posted_by);
      // console.log(getData.data);
    });
  };

  const useDraftHandler = (data: any) => {
    props.setSaveTextModal(false);
    props.useDraft(data);
  };

  const registDraftHandler = () => {
    registDraft({
      content: props.currentText,
      posted_by: postedById,
    });
    getDraft();
  };

  const deleteDraftHandler = (id: number) => {
    deleteDraft(id);
    getDraft();
  };

  const renderDraftlist = () => {
    return draft.map((data: any) => (
      <article className="saveText-item">
        <p className="saveText-item__time">
          <time dateTime={timeTextConversion(data.created_at).dateTime}>
            {timeTextConversion(data.created_at).timeText}
          </time>
        </p>
        <p className="saveText-item__txt">{data.content}</p>
        <div className="saveText-item__wrap">
          <button
            onClick={deleteDraftHandler.bind(null, data.id)}
            className="btn saveText-item__deleteBtn"
          >
            <img src={TrashIcon} alt="" />
          </button>
          <button
            onClick={useDraftHandler.bind(null, data)}
            className="btn saveText-item__useBtn"
          >
            <img src={CheckIconGreen} alt="" />
          </button>
        </div>
      </article>
    ));
  };

  const timeTextConversion = (txt: string) => {
    const dateTime: string = String(txt).slice(0, 10);
    const timeText: string = dateTime.replace(/-/g, '.');
    const texts: {
      dateTime: string;
      timeText: string;
    } = {
      dateTime,
      timeText,
    };
    return texts;
  };

  return (
    <motion.div
      className="modal modal--normal scroll"
      onClick={event => event.stopPropagation()}
    >
      <div className="modal__header modal__header--side">
        <div onClick={() => props.setSaveTextModal(false)}>
          <img src={MenuDownIcon} alt="" />
          <p className="heading5">戻る</p>
        </div>
        <RoundedBtn txt="保存" Func={registDraftHandler} />
      </div>
      <div className="scrollContent">
        {(() => {
          if (draft) {
            return renderDraftlist();
          }
        })()}
      </div>
    </motion.div>
  );
};

export default SaveText;
