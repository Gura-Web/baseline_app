import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  visible: boolean;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const Modal: FC<Props> = ({ children, visible }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <motion.div
          className="modal-background"
          // onClick={() => props.setShowModal(false)}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
