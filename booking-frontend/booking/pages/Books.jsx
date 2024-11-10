import Table from "../components/Table";
import "../src/index.scss";
import { useQuery } from "@tanstack/react-query";
import getAllBooks from "../services/getAllBooks";
import Loading from "../components/Loading";

function Books() {
  const { isLoading, data: books } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'author', headerName: 'Author', width: 250 },
    { field: 'year', headerName: 'Year', width: 90}
  ];

  if (isLoading) return <Loading/>

  return (
    <div className="books">
      <div className="books--container">
        <p className="books--title">Books</p>
        <Table books={books} columns={columns} rows={books} />
      </div>
    </div>
  );
}

export default Books;
