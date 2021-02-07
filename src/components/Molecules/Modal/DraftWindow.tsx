import React, { FC } from 'react';
import { CheckIconGreen, MenuDownIcon, TrashIcon } from '../../../assets/images';
import { Draft } from '../../../services/models';
import { RoundedBtn } from '../../Atoms/Btn';

interface Props {
  drafts: Draft[];
  backButtonHandler: () => void;
  saveButtonHandler: () => void;
  deleteButtonHandler: (id: number) => void;
  draftToMyActivityButtonHandler: (draftText: string) => void;
}

export const DraftWindows: FC<Props> = ({
  drafts,
  backButtonHandler,
  saveButtonHandler,
  deleteButtonHandler,
  draftToMyActivityButtonHandler,
}) => {
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
    <>
      <div className="modal__header modal__header--side">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={backButtonHandler}>
          <img src={MenuDownIcon} alt="" />
          <p className="heading5">戻る</p>
        </div>
        <RoundedBtn isType="button" txt="保存" Func={saveButtonHandler} />
      </div>
      <div className="scrollContent">
        {drafts.map(draft => (
          <article className="saveText-item" key={draft.id}>
            <p className="saveText-item__time">
              <time dateTime={timeTextConversion(draft.createdAt).dateTime}>
                {timeTextConversion(draft.createdAt).timeText}
              </time>
            </p>
            <p className="saveText-item__txt">{draft.content}</p>
            <div className="saveText-item__wrap">
              {/* 削除ボタン */}
              <button
                type="button"
                onClick={() => {
                  deleteButtonHandler(draft.id);
                }}
                className="btn saveText-item__deleteBtn"
              >
                <img src={TrashIcon} alt="" />
              </button>
              <button
                type="button"
                onClick={() => {
                  draftToMyActivityButtonHandler(draft.content);

                  // TODO 削除をここに
                  // TODO ここどうするか相談
                }}
                className="btn saveText-item__useBtn"
              >
                <img src={CheckIconGreen} alt="" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};
