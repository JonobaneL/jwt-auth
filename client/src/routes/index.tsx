import App from "@/App";
import Layout from "@/pages/Layout";
import LogInPage from "@/pages/LogInPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/log-in",
        element: <LogInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);
