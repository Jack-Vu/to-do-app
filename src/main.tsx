import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Login, SignUp, Tasks } from "./pages";

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
        path: "/sign-up",
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
        path: "/tasks",
        element: <Tasks />,
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
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
