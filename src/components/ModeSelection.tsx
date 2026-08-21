'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Utensils, Coffee, ShoppingBag, CupSoda, PencilLine } from 'lucide-react';
import styles from './ModeSelection.module.css';

interface ModeSelectionProps {
  onSelectMode: (mode: 'canteen' | 'fast-food' | 'ordering' | 'beverage' | 'manual') => void;
  onBack: () => void;
}

export default function ModeSelection({ onSelectMode, onBack }: ModeSelectionProps) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.container}>
      <motion.button
        type="button"
        className={styles.companyBack}
        onClick={onBack}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        <ArrowLeft size={18} aria-hidden="true" />
        切换公司
      </motion.button>

      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        今天吃什么？
      </motion.h1>
      
      <div className={styles.grid}>
        <motion.div 
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          onClick={() => onSelectMode('canteen')}
          whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Utensils size={48} className={styles.icon} />
          <h2>食堂模式</h2>
          <p>Canteen</p>
        </motion.div>

        <motion.div 
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          onClick={() => onSelectMode('fast-food')}
          whileHover={{ scale: 1.05, borderColor: 'var(--secondary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <Coffee size={48} className={styles.icon} />
          <h2>快餐模式</h2>
          <p>Fast Food</p>
        </motion.div>

        <motion.div 
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          onClick={() => onSelectMode('ordering')}
          whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag size={48} className={styles.icon} />
          <h2>点餐模式</h2>
          <p>Ordering</p>
        </motion.div>

        <motion.div 
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          onClick={() => onSelectMode('beverage')}
          whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <CupSoda size={48} className={styles.icon} />
          <h2>饮料模式</h2>
          <p>Beverage</p>
        </motion.div>

        <motion.div 
          className={styles.card}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          onClick={() => onSelectMode('manual')}
          whileHover={{ scale: 1.05, borderColor: '#14b8a6' }}
          whileTap={{ scale: 0.95 }}
        >
          <PencilLine size={48} className={styles.icon} style={{ color: '#14b8a6' }} />
          <h2 style={{ color: '#14b8a6' }}>手动模式</h2>
          <p>Manual</p>
        </motion.div>
      </div>
    </div>
  );
}
