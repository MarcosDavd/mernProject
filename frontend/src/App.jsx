import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },{
    path: "/home",
    element: <Home />,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
