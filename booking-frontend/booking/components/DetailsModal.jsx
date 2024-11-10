import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Backdrop, Divider } from '@mui/material';

function DetailsModal({ open, handleClose, details }) {
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

  const itemStyle = {
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    marginBottom: '10px',
    padding: '10px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    color: '#4a4a4a',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          {details ? `ID: ${details.id}, Name:${details.name}` : 'User Details'}
        </Typography>
        {details && details.borrowedBooks.length > 0 ? (
          <List>
            <p>Borrowed Books</p>
            {details.borrowedBooks.map((book, index) => (
              <ListItem key={index} sx={itemStyle}>
                <ListItemText
                  primary={
                    <Typography sx={titleStyle}>{`${index + 1} - ${book.book.title} by ${book.book.author}`}</Typography>
                  }
                  secondary={
                    <div style={{ marginTop: '5px', color: '#616161' }}>
                      <div><strong>Borrowed At:</strong> {new Date(book.borrowedAt).toLocaleString()}</div>
                      <div><strong>Returned At:</strong> {book.returnedAt ? new Date(book.returnedAt).toLocaleString() : 'Not returned'}</div>
                      <div><strong>Rating:</strong> {book.rating || 'N/A'}</div>
                    </div>
                  }
                />
                <Divider sx={{ marginTop: '10px' }} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ mt: 2, color: '#757575' }}>No borrowed books available.</Typography>
        )}
        <Button onClick={handleClose} sx={{ mt: 3, display: 'block', margin: '0 auto' }} variant="contained" style={{ backgroundColor: '#be4bdb' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default DetailsModal;
