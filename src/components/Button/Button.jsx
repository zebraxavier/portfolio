import { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Button component — glass variants with motion.
 * variant: 'primary' | 'accent' | 'ghost'
 * size:    'sm' | 'md' | 'lg'
 */
const Button = memo(
  forwardRef(function Button(
    { children, variant = 'primary', size = 'md', className = '', disabled, onClick, type = 'button', ...rest },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        type={type}
        className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
        whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        data-cursor-hover
        {...rest}
      >
        {children}
      </motion.button>
    );
  })
);

export default Button;
