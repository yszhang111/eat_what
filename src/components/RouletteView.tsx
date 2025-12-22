'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import Dice from './Dice';
import styles from './RouletteView.module.css';

interface RouletteViewProps {
  options: string[];
  title: string;
  onBack: () => void;
}

export default function RouletteView({ options, title, onBack }: RouletteViewProps) {
  const [isSpinning, setIsSpinning] = useState(true);
  const [displayOption, setDisplayOption] = useState<string>('Ready?');
  const [finalResult, setFinalResult] = useState<string | null>(null);

  useEffect(() => {
    spin();
  }, []);

  const spin = () => {
    setIsSpinning(true);
    setFinalResult(null);
    
    let duration = 2500; 
    let intervalTime = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      const random = options[Math.floor(Math.random() * options.length)];
      setDisplayOption(random);
      elapsed += intervalTime;
      
      if (elapsed > 1500) intervalTime += 30;
      if (elapsed > 2000) intervalTime += 60;

      if (elapsed >= duration) {
        clearInterval(interval);
        const final = options[Math.floor(Math.random() * options.length)];
        setDisplayOption(final);
        setFinalResult(final);
        setIsSpinning(false);
      }
    }, intervalTime);
  };

  return (
    <div className={styles.container}>
      <button onClick={onBack} className={styles.backButton}>
        <ArrowLeft size={24} /> Back
      </button>

      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      <div className={styles.content}>
        <div className={styles.diceWrapper}>
           <Dice isRolling={isSpinning} />
        </div>

        {isSpinning && (
           <div className={styles.rollingText}>
             <span className={styles.cyclingOption}>{displayOption}</span>
           </div>
        )}

        {!isSpinning && finalResult && (
          <motion.div 
            className={styles.resultCard}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
          >
             <h3>去这里吃:</h3>
             <div className={styles.resultText}>{finalResult}</div>
             <button onClick={spin} className={styles.spinButton}>
               <Sparkles size={20} /> 再来一次
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
