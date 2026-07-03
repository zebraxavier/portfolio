import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RiCheckLine, RiErrorWarningLine, RiCloseLine } from 'react-icons/ri';
import styles from './Toast.module.css';

const Toast = memo(function Toast({ toast, onDismiss }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="alert"
          aria-live="polite"
          className={`${styles.toast} ${styles[toast.type]}`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className={styles.icon} aria-hidden="true">
            {toast.type === 'success'
              ? <RiCheckLine size={15} />
              : <RiErrorWarningLine size={15} />}
          </span>
          <p className={styles.msg}>{toast.message}</p>
          {onDismiss && (
            <button className={styles.close} onClick={onDismiss} aria-label="Dismiss notification">
              <RiCloseLine size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Toast;
