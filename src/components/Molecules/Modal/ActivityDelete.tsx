import React from 'react';
import { motion } from 'framer-motion';
import { RoundedBtn } from '../../Atoms/Btn';

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
  cancelHandler: () => void;
  acceptHandler: () => void;
  text: string;
  title: string;
}

const ActivityDelete: React.FC<Props> = ({
  acceptHandler,
  cancelHandler,
  text,
  title,
}) => {
  return (
    <motion.div
      className="modal modal--normal activity-delete"
      variants={modal}
      onClick={event => event.stopPropagation()}
    >
      <p className="heading4">{title}</p>
      <p className="txt">{text}</p>
      <div className="flex">
        <p className="cansel" onClick={cancelHandler}>
          キャンセル
        </p>
        <RoundedBtn txt="削除する" isDelete="true" Func={acceptHandler} />
      </div>
    </motion.div>
  );
};

export default ActivityDelete;
