import "./index.scss";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../ui/Layout";
import Books from "../pages/Books";
import Users from "../pages/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

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

  return <>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          color: "#000",
        },
      }}
    />
  </QueryClientProvider>
  </>
}

export default App;
