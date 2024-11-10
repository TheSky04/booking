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

  if (isLoading) return <Loading/>

  return (
    <div className="books">
      <div className="books--container">
        <p className="books--title">Books</p>
        <Table books={books} />
      </div>
    </div>
  );
}

export default Books;
