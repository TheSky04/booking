import { Modal, Box, Typography,Button } from '@mui/material';
import { toast } from "react-hot-toast";


function ModalConfirm({open, handleClose,setConfirmModal}) {

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

    return (<Modal
        open={open}
        onClose={handleClose}
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
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: '#be4bdb' }}
          >
            No
          </Button>
        </Box>
    </Modal>)
  }
  
  export default ModalConfirm;


