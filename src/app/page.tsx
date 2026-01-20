'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ModeSelection from '@/components/ModeSelection';
import RouletteView from '@/components/RouletteView';
import CanteenView from '@/components/CanteenView';
import { FAST_FOOD_OPTIONS, ORDERING_OPTIONS, BEVERAGE_OPTIONS } from '@/data/options';
import ChatBot from '@/components/ChatBot';

type ViewMode = 'home' | 'canteen' | 'fast-food' | 'ordering' | 'beverage';

export default function Home() {
  const [mode, setMode] = useState<ViewMode>('home');

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top center, #1e293b 0%, #0f172a 100%)',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {mode === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ModeSelection onSelectMode={setMode} />
          </motion.div>
        )}

        {mode === 'fast-food' && (
          <motion.div
            key="fast-food"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RouletteView
              title="快餐模式 (Fast Food)"
              options={FAST_FOOD_OPTIONS}
              onBack={() => setMode('home')}
            />
          </motion.div>
        )}

        {mode === 'ordering' && (
          <motion.div
            key="ordering"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RouletteView
              title="点餐模式 (Ordering)"
              options={ORDERING_OPTIONS}
              onBack={() => setMode('home')}
            />
          </motion.div>
        )}

        {mode === 'beverage' && (
          <motion.div
            key="beverage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RouletteView
              title="饮料模式 (Beverage)"
              options={BEVERAGE_OPTIONS}
              onBack={() => setMode('home')}
            />
          </motion.div>
        )}

        {mode === 'canteen' && (
          <motion.div
            key="canteen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CanteenView onBack={() => setMode('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot />
    </main>
  );
}
