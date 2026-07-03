import { memo } from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -8, filter: 'blur(3px)' },
};

const PageTransition = memo(function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
});

export default PageTransition;
