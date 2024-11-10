import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from "react-hot-toast";

function BookDetailsModal({ open, handleClose, details }) {
  const [lendModalOpen, setLendModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLendBook = () => {
    setLendModalOpen(true);
  };

  const handleLend = async () => {
    if (!selectedUser) {
      toast.error('Please select a user to lend the book');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser}/borrow/${details.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser }),
      });

      if (!response.ok) {
        throw new Error('Failed to lend the book');
      }

      toast.success("The Book successfully lent.");
      setLendModalOpen(false);
      handleClose();
    } catch (error) {
      console.error('Error lending the book:', error);
      toast.error("The same user has already borrowed this book before.");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
            {details ? 'Book Details' : 'Book Details Not Available'}
          </Typography>

          {details ? (
            <>
              <Typography variant="h6" sx={{ mt: 1 }}>Name: {details?.name}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Year: {details?.year}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Author: {details?.author}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>Current Owner: {details?.currentOwner?.name ? details?.currentOwner?.name : "No one"} </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Score: {details.score != "-1" ? details.score : 'No ratings available'}
              </Typography>
            </>
          ) : (
            <Typography sx={{ mt: 2, color: '#757575' }}>No book details available.</Typography>
          )}

          <div className='button--container'>
            <Button disabled={details?.currentOwner?.name} onClick={handleLendBook} sx={{ mr: 1, display: 'block' }} variant="contained" style={{ backgroundColor: '#be4bdb' }}>
              Lend Book
            </Button>
            <Button onClick={handleClose} sx={{ display: 'block' }} variant="contained" style={{ backgroundColor: '#be4bdb' }}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={lendModalOpen}
        onClose={() => setLendModalOpen(false)}
        aria-labelledby="lend-modal-title"
        aria-describedby="lend-modal-description"
      >
        <Box sx={style}>
          <Typography id="lend-modal-title" variant="h5" component="h2" sx={{ mb: 2 }} style={{color:"#be4bdb"}}>
            Select User to Lend the Book
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-user-label">Select User</InputLabel>
            <Select
              labelId="select-user-label"
              value={selectedUser}
              label="Select User"
              onChange={(event) => setSelectedUser(event.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleLend} sx={{ mt: 2,mr:2, backgroundColor: '#be4bdb' }} variant="contained">
            Confirm Lend
          </Button>
          <Button onClick={() => setLendModalOpen(false)} sx={{ mt: 2, backgroundColor: '#be4bdb' }} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default BookDetailsModal;
