import Table from "../components/Table";
import "../src/index.scss";
import { useQuery } from "@tanstack/react-query";
import getAllBooks from "../services/getAllBooks";
import Loading from "../components/Loading";
import Button from '@mui/material/Button';
import { useState } from "react";
import showBookDetails from "../services/showBookDetails";
import BookDetailsModal from "../components/BookDetailsModal";
import { Modal, Box, Typography } from '@mui/material';
import { toast } from "react-hot-toast";

function Books() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Title', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 550,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#be4bdb" }}
            size="small"
            sx={{ marginRight: 1 }}
            onClick={() => handleShowDetails(params.row)}
          >
            Show Details
          </Button>
        </div>
      ),
    },
  ];

  const handleShowDetails = async (row) => {
    const details = await showBookDetails(row.id);
    setSelectedDetails(details);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedDetails(null);
  };

  const handleOpenConfirmModal = () => {
    setConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };

  const handleConfirmClearDB = async () => {
    try {
      const response = await fetch('http://localhost:3000/books/clear-bookings', {
        method: 'DELETE',
      });

      if(response.status !== 200) {
        toast.error('Failed to clear the database.');
        return;
      }

      toast.success('Database cleared successfully.');
    } catch (error) {
      toast.error('Failed to clear the database.');
    } finally{
      setConfirmModal(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {modalOpen && <BookDetailsModal open={modalOpen} handleClose={handleClose} details={selectedDetails} />}
      
      {confirmModal && (
        <Modal
          open={confirmModal}
          onClose={handleCloseConfirmModal}
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <Typography id="confirm-modal-title" variant="h6" component="h2" sx={{ mb: 2,fontSize:'2rem' }}>
              Are you sure to clear database?
            </Typography>
            <Button
              onClick={handleConfirmClearDB}
              variant="contained"
              style={{ backgroundColor: '#be4bdb', marginRight: '10px' }}
            >
              Yes
            </Button>
            <Button
              onClick={handleCloseConfirmModal}
              variant="contained"
              style={{ backgroundColor: '#be4bdb' }}
            >
              No
            </Button>
          </Box>
        </Modal>
      )}

      <div className="books">
        <div className="books--container">
          <div className="books--container--top">
            <p className="books--title">Books</p>
            <button className="books--clearBookings" onClick={handleOpenConfirmModal}>Clear Bookings</button>
          </div>
          <Table books={books} columns={columns} rows={books} />
        </div>
      </div>
    </>
  );
}

export default Books;
