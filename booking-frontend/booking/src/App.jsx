import "./index.scss";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../ui/Layout";
import Books from "../pages/Books";
import Users from "../pages/Users";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/books" replace /> },
        { path: "/books", element: <Books /> },
        { path: "/users", element: <Users /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
