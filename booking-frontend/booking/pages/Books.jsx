import Table from "../components/Table";
import "../src/index.scss";
import { useQuery } from "@tanstack/react-query";
import getAllBooks from "../services/getAllBooks";
import Loading from "../components/Loading";
import Button from '@mui/material/Button';
import { useState } from "react";
import showBookDetails from "../services/showBookDetails";
import BookDetailsModal from "../components/BookDetailsModal";

function Books() {
  const [modalOpen,setModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
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
            style={{backgroundColor:"#be4bdb"}}
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


  if (isLoading) return <Loading/>

  return (
    <>
      {modalOpen && <BookDetailsModal open={modalOpen} handleClose={handleClose} details={selectedDetails} />}
      <div className="books">
        <div className="books--container">
          <p className="books--title">Books</p>
          <Table books={books} columns={columns} rows={books} />
        </div>
      </div>
    </>
  );
}

export default Books;
