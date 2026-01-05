'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnnouncementModal.module.css';

interface AnnouncementModalProps {
  onClose?: () => void;
}

export default function AnnouncementModal({ onClose }: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if we've already shown it this session?
    // For now, let's show it every time as per "entering the page" instruction,
    // but maybe we can add a session storage check if it gets annoying.
    // The user said "From today freeze...", implying urgency. Let's show it.
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className={styles.icon}>🚫</div>
            <h2 className={styles.title}>重要公告 (Important)</h2>
            <p className={styles.content}>
              因为肯德基新品太难吃，拉完了，从今天起冻结肯德基半个月！！！
            </p>
            <button className={styles.button} onClick={handleClose}>
              拉完了！！！
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
