import React from 'react';
import { motion } from 'framer-motion';

const CollectionAreaSkeleton = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="rn-collection-area rn-section-gapTop"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <motion.div 
              key={index} 
              className="col-lg-3 col-md-6 col-sm-6 col-12"
              variants={itemVariants}
            >
              <motion.div 
                className="collection-wrapper" 
                style={{ 
                  backgroundColor: "#f0f0f0", 
                  borderRadius: "8px", 
                  padding: "20px", 
                  marginBottom: "30px",
                  overflow: "hidden",
                  position: "relative"
                }}
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
                <motion.div className="skeleton-image" style={{ width: "100%", height: "200px", backgroundColor: "#e0e0e0", marginBottom: "15px", borderRadius: "8px" }} />
                <motion.div className="skeleton-title" style={{ width: "70%", height: "20px", backgroundColor: "#e0e0e0", marginBottom: "10px" }} />
                <motion.div className="skeleton-description" style={{ width: "100%", height: "15px", backgroundColor: "#e0e0e0", marginBottom: "5px" }} />
                <motion.div className="skeleton-description" style={{ width: "80%", height: "15px", backgroundColor: "#e0e0e0" }} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionAreaSkeleton;