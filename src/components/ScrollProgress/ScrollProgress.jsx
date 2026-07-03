import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX, transformOrigin: '0% 50%' }}
      aria-hidden="true"
    />
  );
});

export default ScrollProgress;
