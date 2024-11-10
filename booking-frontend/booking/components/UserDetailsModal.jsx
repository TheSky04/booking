import React, { useState } from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Backdrop, Divider, Select, MenuItem, FormControl, InputLabel, Rating } from '@mui/material';
import { toast } from "react-hot-toast";

function UserDetailsModal({ open, handleClose, details }) {
  const [selectedBook, setSelectedBook] = useState('');
  const [rating, setRating] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReturnBook = async () => {
    if (!selectedBook) {
      alert('Please select a book to return');
      return;
    }

    if (rating === 0) {
      alert('Please provide a rating before returning the book');
      return;
    }

    const selectedBookObj = details?.books?.present?.find(book => book?.name === selectedBook);

    if (!selectedBookObj || !selectedBookObj?.id) return;

    const selectedBookId = selectedBookObj.id;

    try {
      const response = await fetch(`http://localhost:3000/users/${details.id}/return/${selectedBookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to return the book');
      }

      toast.success("The book was returned successfully.");
      handleClose();
    } catch (error) {
      console.error('Error returning the book:', error);
      toast.error("An error occurred while returning the book.");
    }
  };

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
          {details ? `Name: ${details.name}` : 'User Details'}
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
                      <Typography variant="body2" sx={{ marginTop: '5px', color: '#616161' }}>
                        <strong>Rating:</strong> {book.userScore || 'N/A'}
                      </Typography>
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

        {/* Currently Borrowed Books */}
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

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="select-book-label" sx={{ color: '#be4bdb' }}>Select Book</InputLabel>
              <Select
                labelId="select-book-label"
                value={selectedBook}
                label="Select Book"
                onChange={handleSelectChange}
                sx={{
                  color: '#be4bdb',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#be4bdb',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#be4bdb',
                  },
                  '.MuiSvgIcon-root': {
                    color: '#be4bdb',
                  },
                }}
              >
                {details.books.present.map((book, index) => (
                  <MenuItem key={index} value={book.name}>{book.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" sx={{ mt: 2 }}>Rate the Book</Typography>
            <Rating
              name="book-rating"
              value={rating}
              onChange={handleRatingChange}
              max={10}
              precision={1}
              sx={{ color: '#be4bdb' }}
            />

          </>
        ) : (
          <Typography sx={{ mt: 2, color: '#757575' }}>No currently borrowed books available.</Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          
          {details && details.books.present.length !== 0 && <Button
            onClick={handleReturnBook}
            sx={{ mt: 2,mr:2, backgroundColor: '#be4bdb' }}
            variant="contained"
          >
            Return Book
          </Button>}
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#be4bdb' }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserDetailsModal;
