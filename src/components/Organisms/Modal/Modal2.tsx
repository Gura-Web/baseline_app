import React, { FC } from 'react';
import { CommentWindow2 } from '../../Molecules/Modal/CommentWindow2';
import { User } from '../../../services/models';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  user: User;
  isLoading: boolean;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const Modal: FC<Props> = ({ user, isLoading }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="modal-background"
        // onClick={() => props.setShowModal(false)}
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <CommentWindow2
          title="アクティビティを投稿"
          registerButtonHandle={test => {
            console.log('登録');
            console.log(test);
          }}
          user={user}
          isLoading={isLoading}
        />
      </motion.div>
    </AnimatePresence>
  );
};
