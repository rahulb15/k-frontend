import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './CreateNFTPage.module.css';
import CreateNewArea from '@containers/create-new';
import MarketplaceCreateCollectionWrapper from '@containers/collection-create-marketplace';
import Breadcrumb from "@components/breadcrumb";

const CreateNFTPage = () => {
  const [currentView, setCurrentView] = useState('main');

  const renderMainView = () => (
    <>
      <motion.div 
        className={styles.leftSection}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Create</h1>
        <motion.button 
          className={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('createCollection')}
        >
          Create Collection
        </motion.button>
        <motion.button 
          className={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('createSingleNFT')}
        >
          Create Single NFT
        </motion.button>
        <p className={styles.learnMore}>Learn more about each option.</p>
      </motion.div>
      <motion.div 
        className={styles.rightSection}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/assets-images/AI-nft/New-NFT/nft2.png"
          alt="NFT Example"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div>
      </motion.div>
    </>
  );

  const renderCreateSingleNFTView = () => (
    <div className={styles.createContainer}>
      <CreateNewArea />
    </div>
  );

  const renderCreateCollectionView = () => (
    <div className={styles.createContainer}>
      <MarketplaceCreateCollectionWrapper />
    </div>
  );

  return (
    <div className={styles.container}>
      {currentView === 'main' && renderMainView()}
      {currentView === 'createSingleNFT' && renderCreateSingleNFTView()}
      {currentView === 'createCollection' && renderCreateCollectionView()}
    </div>
  );
};

export default CreateNFTPage;