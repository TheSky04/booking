import React from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Backdrop, Divider } from '@mui/material';

function UserDetailsModal({ open, handleClose, details }) {
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
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          {details ? `ID: ${details.id}, Name: ${details.name}` : 'User Details'}
        </Typography>

        {details && details.books.past.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Past Borrowed Books</Typography>
            <List>
              {details.books.past.map((book, index) => (
                <ListItem key={index} sx={itemStyle}>
                  <ListItemText
                    primary={<Typography sx={titleStyle}>{`${index + 1} - ${book.name}`}</Typography>}
                    secondary={
                      <div style={{ marginTop: '5px', color: '#616161' }}>
                        <div><strong>Rating:</strong> {book.userScore || 'N/A'}</div>
                      </div>
                    }
                  />
                  <Divider sx={{ marginTop: '10px' }} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography sx={{ mt: 2, color: '#757575' }}>No past borrowed books available.</Typography>
        )}

        {details && details.books.present.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Currently Borrowed Books</Typography>
            <List>
              {details.books.present.map((book, index) => (
                <ListItem key={index} sx={itemStyle}>
                  <ListItemText
                    primary={<Typography sx={titleStyle}>{`${index + 1} - ${book.name}`}</Typography>}
                  />
                  <Divider sx={{ marginTop: '10px' }} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography sx={{ mt: 2, color: '#757575' }}>No currently borrowed books available.</Typography>
        )}

        <Button onClick={handleClose} sx={{ mt: 3, display: 'block', margin: '0 auto' }} variant="contained" style={{ backgroundColor: '#be4bdb' }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;
