import Table from "../components/Table";
import "../src/index.scss";
import { useQuery } from "@tanstack/react-query";
import getAllUsers from "../services/getAllUsers";
import Loading from "../components/Loading";
import Button from '@mui/material/Button';
import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import showUserDetails from "../services/showUserDetails";

function Users() {
  const [modalOpen,setModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 250 },
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

  if (isLoading) return <Loading/>

  const handleShowDetails = async (row) => {

    const details = await showUserDetails(row.id);

    setSelectedDetails(details);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedDetails(null);
  };

  return (
    <>
        {modalOpen && <DetailsModal open={modalOpen} handleClose={handleClose} details={selectedDetails} />}
        <div className="users">
            <div className="users--container">
                <p className="users--title">Users</p>
                <Table users={users} columns={columns} rows={users} />
            </div>
        </div>
    </>
  );
}

export default Users;
