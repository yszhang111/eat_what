'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CompanySelection.module.css';

interface CompanySelectionProps {
  onSelectJd: () => void;
}

export default function CompanySelection({ onSelectJd }: CompanySelectionProps) {
  return (
    <section className={styles.container} aria-labelledby="company-selection-title">
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />

      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className={styles.eyebrow}>今天吃啥呢？？？</span>
        <h1 id="company-selection-title">请选择你的公司</h1>
      </motion.header>

      <div className={styles.grid}>
        <motion.button
          type="button"
          className={`${styles.card} ${styles.jdCard}`}
          onClick={onSelectJd}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.logoBox}>
            <Image
              className={styles.jdLogo}
              src="/jd-joy-logo.svg"
              alt="京东"
              width={289}
              height={237}
              priority
            />
          </span>
          <span className={styles.cardContent}>
            <span className={styles.companyName}>京东</span>
            <span className={styles.companyDescription}>Beijing, CN</span>
          </span>
          <span className={styles.cardAction}>
            进入
            <ArrowRight size={19} aria-hidden="true" />
          </span>
        </motion.button>

        <motion.a
          href="https://dining.microsoft.com/cafe/b30838fc-e635-4971-894b-3fb0d1c28335"
          className={`${styles.card} ${styles.microsoftCard}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.logoBox}>
            <Image
              className={styles.microsoftLogo}
              src="/microsoft-logo.svg"
              alt="微软"
              width={224}
              height={64}
              priority
            />
          </span>
          <span className={styles.cardContent}>
            <span className={styles.companyName}>Microsoft</span>
            <span className={styles.companyDescription}>Mountain View, CA, USA</span>
          </span>
          <span className={styles.microsoftAction}>
            进入
            <ArrowRight size={19} aria-hidden="true" />
          </span>
        </motion.a>
      </div>


    </section>
  );
}
