import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, X, Play, Sparkles } from 'lucide-react';
import Dice from './Dice';
import styles from './ManualView.module.css';

interface ManualViewProps {
  onBack: () => void;
}

export default function ManualView({ onBack }: ManualViewProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const [hasStarted, setHasStarted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [displayOption, setDisplayOption] = useState<string>('Ready?');
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const handleAddOption = () => {
    if (inputValue.trim() && !options.includes(inputValue.trim())) {
      setOptions([...options, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddOption();
    }
  };

  const startDraw = () => {
    if (options.length === 0) return;
    setHasStarted(true);
    spin();
  };

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
        手动模式 (Manual Mode)
      </motion.h2>

      <div className={styles.content}>
        {!hasStarted ? (
          <motion.div 
            className={styles.setupContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入想吃的地方 (Enter a place)..."
                className={styles.input}
              />
              <button onClick={handleAddOption} className={styles.addButton}>
                <Plus size={20} /> 添加 (Add)
              </button>
            </div>

            <div className={styles.optionsList}>
              <AnimatePresence>
                {options.map((option, index) => (
                  <motion.div 
                    key={option + index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={styles.optionItem}
                  >
                    <span className={styles.optionText}>{option}</span>
                    <button 
                      onClick={() => handleRemoveOption(index)}
                      className={styles.removeButton}
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {options.length === 0 && (
                <div className={styles.emptyText}>暂时没有选项，请输入后添加。</div>
              )}
            </div>

            <button 
              onClick={startDraw} 
              className={styles.startButton}
              disabled={options.length === 0}
            >
              <Play size={20} fill="currentColor" /> 开始随机抽 (Start)
            </button>
          </motion.div>
        ) : (
          <div className={styles.rouletteContainer}>
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
                 <h3>去这里:</h3>
                 <div className={styles.resultText}>{finalResult}</div>
                 <div className={styles.actionButtons}>
                   <button onClick={spin} className={styles.spinButton}>
                     <Sparkles size={20} /> 再来一次 (Again)
                   </button>
                   <button onClick={() => setHasStarted(false)} className={styles.editButton}>
                     返回编辑 (Edit Options)
                   </button>
                 </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
