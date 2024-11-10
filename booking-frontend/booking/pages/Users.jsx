import Table from "../components/Table";
import "../src/index.scss";
import { useQuery } from "@tanstack/react-query";
import getAllUsers from "../services/getAllUsers";
import Loading from "../components/Loading";

function Users() {
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 250 },
  ];

  if (isLoading) return <Loading/>

  return (
    <div className="users">
      <div className="users--container">
        <p className="users--title">Users</p>
        <Table users={users} columns={columns} rows={users} />
      </div>
    </div>
  );
}

export default Users;
