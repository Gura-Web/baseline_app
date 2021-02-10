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
  setShowModal: any;
  deleteId: number;
  btnClickFunc: any;
  text: string;
  ttl: string;
}

const OldActivityDelete: React.FC<Props> = props => {
  const btnClickHandler = () => {
    props.btnClickFunc(props.deleteId);
    props.setShowModal(false);
  };

  return (
    <motion.div
      className="modal modal--normal activity-delete"
      variants={modal}
      onClick={event => event.stopPropagation()}
    >
      <p className="heading4">{props.ttl}</p>
      <p className="txt">{props.text}</p>
      <div className="flex">
        <p className="cansel" onClick={() => props.setShowModal(false)}>
          キャンセル
        </p>
        <RoundedBtn txt="削除する" isDelete={'true'} Func={btnClickHandler} />
      </div>
    </motion.div>
  );
};

export default OldActivityDelete;
