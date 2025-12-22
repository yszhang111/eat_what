'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, Building2 } from 'lucide-react';
import { CANTEEN_DATA, CanteenArea } from '@/data/options';
import Dice from './Dice';
import styles from './CanteenView.module.css';

interface CanteenViewProps {
  onBack: () => void;
}

type SubMode = 'none' | 'area-only' | 'area-floor';

export default function CanteenView({ onBack }: CanteenViewProps) {
  const [subMode, setSubMode] = useState<SubMode>('none');
  const [result, setResult] = useState<{ area: string; floor?: string } | null>(null);
  const [isRolling, setIsRolling] = useState(false);



  const handleSubModeSelect = (mode: SubMode) => {
    setSubMode(mode);
    startRolling(mode);
  };

  const startRolling = (mode: SubMode = subMode) => {
    setIsRolling(true);
    setResult(null);

    // Roll for 2.5 seconds then show result
    setTimeout(() => {
      const areas = Object.keys(CANTEEN_DATA) as CanteenArea[];
      const randomArea = areas[Math.floor(Math.random() * areas.length)];
      
      if (mode === 'area-floor') {
        const floors = CANTEEN_DATA[randomArea];
        const randomFloor = floors[Math.floor(Math.random() * floors.length)];
        setResult({ area: randomArea, floor: randomFloor });
      } else {
        setResult({ area: randomArea });
      }
      
      setIsRolling(false);
    }, 2500);
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
        食堂模式 (Canteen)
      </motion.h2>

      <div className={styles.content}>
        {subMode === 'none' ? (
          <div className={styles.selectionGrid}>
            <motion.div 
              className={styles.selectionCard}
              onClick={() => handleSubModeSelect('area-only')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <MapPin size={48} className="text-blue-400" />
              <h3>选食堂</h3>
              <p>Select Canteen Only</p>
            </motion.div>

            <motion.div 
              className={styles.selectionCard}
              onClick={() => handleSubModeSelect('area-floor')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Building2 size={48} className="text-purple-400" />
              <h3>选食堂+楼层</h3>
              <p>Canteen + Floor</p>
            </motion.div>
          </div>
        ) : (
          <>
            <div className={styles.diceContainer}>
              <Dice isRolling={isRolling} />
            </div>

        {isRolling && (
          <motion.div 
            className={styles.statusText}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            选一个.....
          </motion.div>
        )}

        {!isRolling && result && (
          <motion.div 
            className={styles.resultCard}
            initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <h3>去这里:</h3>
            <div className={styles.resultText}>
              <span className={styles.areaText}>{result.area}</span>
              {result.floor && <span className={styles.floorText}>{result.floor}</span>}
            </div>
            <button onClick={() => startRolling()} className={styles.randomButton}>
              <Sparkles size={18} /> 再来一次
            </button>
          </motion.div>
        )}
        </>
        )}
      </div>
    </div>
  );
}
