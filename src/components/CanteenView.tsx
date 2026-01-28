import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Building2,
  Disc,
  Filter,
  X,
  Check,
  Play,
} from "lucide-react";
import { CANTEEN_DATA, CanteenArea } from "@/data/options";
import Dice from "./Dice";
import RouletteWheel from "./RouletteWheel";
import styles from "./CanteenView.module.css";

interface CanteenViewProps {
  onBack: () => void;
}

type SubMode = "none" | "area-only" | "area-floor" | "roulette-wheel";

export default function CanteenView({ onBack }: CanteenViewProps) {
  const [subMode, setSubMode] = useState<SubMode>("none");
  const [result, setResult] = useState<{ area: string; floor?: string } | null>(
    null,
  );
  const [isRolling, setIsRolling] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Flattened options for filter and selection
  const allOptions = useMemo(() => {
    const opts: { area: string; floor: string; id: string }[] = [];
    Object.entries(CANTEEN_DATA).forEach(([area, floors]) => {
      floors.forEach((floor) => {
        opts.push({ area, floor, id: `${area}-${floor}` });
      });
    });
    return opts;
  }, []);

  // Initialize selected IDs with all options
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(allOptions.map((o) => o.id)),
  );

  // Memoize the flattened options for the roulette wheel (string representation)
  const rouletteOptions = useMemo(() => {
    return allOptions.map((o) => `${o.area} - ${o.floor}`);
  }, [allOptions]);

  const handleSubModeSelect = (mode: SubMode) => {
    setSubMode(mode);
    setResult(null);
  };

  const startRolling = (mode: SubMode = subMode) => {
    // Basic validation
    if (mode === "area-floor") {
      const availableOptions = allOptions.filter((o) => selectedIds.has(o.id));
      if (availableOptions.length === 0) {
        alert("请至少选择一个选项 (Please select at least one option)");
        setShowFilter(true);
        return;
      }
    }

    setIsRolling(true);
    setResult(null);

    // Roll for 2.5 seconds then show result
    setTimeout(() => {
      if (mode === "area-floor") {
        // Pick from filtered options
        const availableOptions = allOptions.filter((o) =>
          selectedIds.has(o.id),
        );
        const randomOption =
          availableOptions[Math.floor(Math.random() * availableOptions.length)];
        setResult({ area: randomOption.area, floor: randomOption.floor });
      } else {
        // Area only - keep original logic or filter?
        // User asked for filter "In Canteen choosing Canteen+Floor option".
        // So Area Only mode remains unchanged (random area).
        const areas = Object.keys(CANTEEN_DATA) as CanteenArea[];
        const randomArea = areas[Math.floor(Math.random() * areas.length)];
        setResult({ area: randomArea });
      }

      setIsRolling(false);
    }, 2500);
  };

  const toggleOption = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    setSelectedIds(new Set(allOptions.map((o) => o.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
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
        {subMode === "none" ? (
          <div className={styles.selectionGrid}>
            <motion.div
              className={styles.selectionCard}
              onClick={() => handleSubModeSelect("area-only")}
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
              onClick={() => handleSubModeSelect("area-floor")}
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

            <motion.div
              className={styles.selectionCard}
              onClick={() => handleSubModeSelect("roulette-wheel")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Disc size={48} className="text-pink-400" />
              <h3>大转盘</h3>
              <p>Spin the Wheel</p>
            </motion.div>
          </div>
        ) : subMode === "roulette-wheel" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <RouletteWheel items={rouletteOptions} />
          </motion.div>
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

            {!isRolling && !result && (
              <motion.button 
                className={styles.randomButton}
                onClick={() => startRolling()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} fill="currentColor" /> 开始 (Start)
              </motion.button>
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
                  {result.floor && (
                    <span className={styles.floorText}>{result.floor}</span>
                  )}
                </div>

                <button
                  onClick={() => startRolling()}
                  className={styles.randomButton}
                >
                  <Sparkles size={18} /> 再来一次
                </button>
              </motion.div>
            )}

            {/* Filter Toggle Button - Only for Area+Floor mode */}
            {subMode === "area-floor" && !isRolling && (
              <motion.button
                className={styles.filterToggleButton}
                onClick={() => setShowFilter(true)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter size={18} /> 过滤楼层选项
              </motion.button>
            )}
          </>
        )}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            className={styles.filterOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilter(false)}
          >
            <motion.div
              className={styles.filterModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.filterHeader}>
                <h3>过滤楼层选项 Filter Options</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowFilter(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.filterActions}>
                <button className={styles.actionButton} onClick={selectAll}>
                  Select All
                </button>
                <button className={styles.actionButton} onClick={deselectAll}>
                  Deselect All
                </button>
                <div style={{ flex: 1 }} />
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    alignSelf: "center",
                  }}
                >
                  Selected: {selectedIds.size} / {allOptions.length}
                </span>
              </div>

              <div className={styles.filterContent}>
                {allOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`${styles.filterItem} ${selectedIds.has(option.id) ? styles.selected : ""}`}
                    onClick={() => toggleOption(option.id)}
                  >
                    <div className={styles.checkbox}>
                      {selectedIds.has(option.id) && <Check size={14} />}
                    </div>
                    <span className={styles.filterItemLabel}>
                      {option.area} - {option.floor}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className={styles.filterActions}
                style={{ justifyContent: "center", border: "none" }}
              >
                <button
                  className={styles.confirmButton}
                  onClick={() => setShowFilter(false)}
                >
                  Confirm ({selectedIds.size})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
