import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal, Box, Typography, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import FullScreenImage from './FullScreenImage';

const NftDetailModal = ({ open, onClose, data }) => {
    console.log("🚀 ~ file: NftDetailModal.jsx ~ line 6 ~ NftDetailModal ~ data", data);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleImageClick = () => {
    setShowFullImage(true);
  };

  const handleCloseFullImage = () => {
    setShowFullImage(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '95%',
              maxWidth: 1200,
              bgcolor: '#ffffff',
              boxShadow: 24,
              borderRadius: 2,
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: '#ffffff',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Box 
              sx={{ 
                flex: 1, 
                position: 'relative',
                height: { xs: '50vh', md: 'auto' },
                overflow: 'hidden',
                cursor: 'pointer',
                '&:hover .image-overlay': {
                  opacity: 1,
                },
              }}
              onClick={handleImageClick}
            >
              <Image
                src={data.tokenImage}
                alt={data.collectionName}
                layout="responsive"
                width={500}
                height={500}
                objectFit="contain"
              />
              <Box
                className="image-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Typography variant="h6" color="white">
                  View Full Image
                </Typography>
              </Box>
            </Box>
            
            <Box 
            sx={{ 
              flex: 1, 
              p: 4, 
              overflowY: 'auto', 
              maxHeight: { xs: '50vh', md: '90vh' },
              borderLeft: { md: '1px solid #e0e0e0' },
              bgcolor: '#f5f5f5',
            }}
          >
            <Typography variant="h4" gutterBottom>
              {data.collectionName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">
              Token ID: {data.tokenId}
            </Typography>
            <Typography variant="body1" paragraph>
              Creator: <strong>{data.creatorName}</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Collection Type: <strong>{data.collectionType}</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Price: <strong>{data.nftPrice > 0 ? `${data.nftPrice} ETH` : 'Not for sale'}</strong>
            </Typography>
            <Box mt={3}>
              <Chip label={data.isRevealed ? 'Revealed' : 'Not Revealed'} color={data.isRevealed ? 'success' : 'default'} sx={{ mr: 1, mb: 1 }} />
              <Chip label={data.onMarketplace ? 'On Marketplace' : 'Not on Marketplace'} sx={{ mr: 1, mb: 1 }} />
              <Chip label={data.onSale ? 'On Sale' : 'Not for Sale'} sx={{ mb: 1 }} />
            </Box>
            {data.properties && data.properties.length > 0 && (
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  Properties
                </Typography>
                {data.properties.map((prop, index) => (
                  <Box key={index} mt={2}>
                    <Typography variant="body1">
                      Collection: <strong>{prop.collection.name}</strong> ({prop.collection.family})
                    </Typography>
                    <Typography variant="body1">
                      Authors: <strong>{prop.authors.map(author => author.name).join(', ')}</strong>
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          </Box>
        </motion.div>
      </Modal>

      {showFullImage && (
        <FullScreenImage
          src={data.tokenImage}
          alt={data.collectionName}
          onClose={handleCloseFullImage}
        />
      )}
    </>
  );
};

export default NftDetailModal;