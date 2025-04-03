import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { Login, SignUp, Profile } from "./pages";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/:username",
        element: <Profile />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = await axios.get(
                `http://localhost:4000/auth/${params.username}`,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              );
              return response.data;
            } catch (error) {
              console.error(error);
              return redirect("/");
            }
          } else {
            return redirect("/");
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
