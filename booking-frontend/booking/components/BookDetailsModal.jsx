import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

function BookDetailsModal({ open, handleClose, details }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          {details ? `Book Details` : 'Book Details Not Available'}
        </Typography>

        {details ? (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>ID: {details.id}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>Name: {details.name}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Score: {details.score != "-1" ? details.score : 'No ratings available'}
            </Typography>
          </>
        ) : (
          <Typography sx={{ mt: 2, color: '#757575' }}>No book details available.</Typography>
        )}

        <Button onClick={handleClose} sx={{ mt: 3, display: 'block', margin: '0 auto' }} variant="contained" style={{ backgroundColor: '#be4bdb' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default BookDetailsModal;
