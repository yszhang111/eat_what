'use client';

import React from 'react';
import styles from './Dice.module.css';
import { clsx } from 'clsx';

interface DiceProps {
  isRolling: boolean;
}

export default function Dice({ isRolling }: DiceProps) {
  return (
    <div className={styles.scene}>
      <div className={clsx(styles.cube, isRolling && styles.rolling)}>
        <div className={clsx(styles.face, styles.front)}>?</div>
        <div className={clsx(styles.face, styles.back)}>Eat</div>
        <div className={clsx(styles.face, styles.right)}>What</div>
        <div className={clsx(styles.face, styles.left)}>Food</div>
        <div className={clsx(styles.face, styles.top)}>Good</div>
        <div className={clsx(styles.face, styles.bottom)}>Yum</div>
      </div>
    </div>
  );
}
