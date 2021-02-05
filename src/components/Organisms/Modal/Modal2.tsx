import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  visible: boolean;
  backgroundClickHandler?: () => void;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const Modal: FC<Props> = ({
  children,
  backgroundClickHandler,
  visible,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <motion.div
          className="modal-background"
          // TODO 外側が押されたときの処理
          onClick={backgroundClickHandler}
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
