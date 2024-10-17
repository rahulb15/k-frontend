import React from 'react';
import { motion } from 'framer-motion';

const HeroAreaSkeleton = () => {
  const shimmer = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: '100%', 
      opacity: 1,
      transition: { 
        repeat: Infinity, 
        repeatType: "loop", 
        duration: 1.5, 
        ease: "linear" 
      }
    }
  };

  return (
    <div className="rn-banner-area rn-section-gapTop">
      <div className="container" style={{ width: "90%", marginTop: "-70px" }}>
        <motion.div 
          className="slide" 
          style={{ 
            height: "500px", 
            position: "relative", 
            backgroundColor: "#f0f0f0", 
            borderRadius: "8px",
            overflow: "hidden"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            }}
            variants={shimmer}
            initial="hidden"
            animate="visible"
          />
          <div className="banner-read-thumb-lg" style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px" }}>
            <motion.div className="skeleton-title" style={{ width: "70%", height: "40px", backgroundColor: "#e0e0e0", marginBottom: "20px" }} />
            <motion.div className="skeleton-description" style={{ width: "100%", height: "20px", backgroundColor: "#e0e0e0", marginBottom: "10px" }} />
            <motion.div className="skeleton-description" style={{ width: "80%", height: "20px", backgroundColor: "#e0e0e0", marginBottom: "10px" }} />
            <motion.div className="skeleton-info" style={{ width: "40%", height: "15px", backgroundColor: "#e0e0e0", marginBottom: "5px" }} />
            <motion.div className="skeleton-info" style={{ width: "40%", height: "15px", backgroundColor: "#e0e0e0", marginBottom: "5px" }} />
            <motion.div className="skeleton-info" style={{ width: "40%", height: "15px", backgroundColor: "#e0e0e0", marginBottom: "20px" }} />
            <motion.div className="skeleton-button" style={{ width: "120px", height: "40px", backgroundColor: "#e0e0e0", display: "inline-block", marginRight: "10px" }} />
            <motion.div className="skeleton-button" style={{ width: "120px", height: "40px", backgroundColor: "#e0e0e0", display: "inline-block" }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroAreaSkeleton;