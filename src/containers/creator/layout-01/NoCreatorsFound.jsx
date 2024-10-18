// // components/NoCreatorsFound.js
// import React from 'react';
// import styles from './NoCreatorsFound.module.css';

// const NoCreatorsFound = ({ onRefresh }) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           <path d="M18 8L6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//         <h2 className={styles.title}>No Creators Found</h2>
//         <p className={styles.message}>
//           We couldn't find any creators for this time frame. Don't worry, great artists are always emerging!
//           Try adjusting your filters or check back later for exciting new additions to our creative community.
//         </p>
//         <button className={styles.refreshButton} onClick={onRefresh}>
//           <svg className={styles.refreshIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M20.49 9C19.2986 6.74943 17.2764 5.01771 14.8065 4.11805C12.3366 3.21839 9.61549 3.20806 7.13858 4.08882C4.66167 4.96958 2.62577 6.68362 1.41 8.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M3.51 15C4.70139 17.2506 6.72362 18.9823 9.19352 19.882C11.6634 20.7816 14.3845 20.7919 16.8614 19.9112C19.3383 19.0304 21.3742 17.3164 22.59 15.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           Refresh Results
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NoCreatorsFound;


import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const NoData = ({ message }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '456px',
    textAlign: 'center',
    color: '#9ca3af',
    backgroundColor: '#24243557',
    borderRadius: '8px',
    padding: '24px',
    marginTop: '16px'
  };

  const headingStyle = {
    marginTop: '16px',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#d1d5db'
  };

  const messageStyle = {
    marginTop: '8px',
    color: '#9ca3af'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
      >
        <AlertCircle size={48} color="#eab308" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={headingStyle}
      >
        No Data Available
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={messageStyle}
      >
        {message || "There are no past collections to display."}
      </motion.p>
    </motion.div>
  );
};

export default NoData;