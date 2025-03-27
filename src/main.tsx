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
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Login />,
        // loader: async() => {
        //   const token = localStorage.getItem("token")
        //   if(token) {
        //     try {
        //       await axios.get("http://localhost:3000/")
        //     } catch (error) {

        //     }
        //   }
        // },
      },
      {
        path: "/signup",
        element: <SignUp />,
        // loader: async() => {
        //   const token = localStorage.getItem("token")
        //   if(token) {
        //     try {
        //       await axios.get("http://localhost:3000/")
        //     } catch (error) {

        //     }
        //   }
        // },
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
              console.log(response.data);

              return await response.data;
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
