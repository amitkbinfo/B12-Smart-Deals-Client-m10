import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from "../pages/AllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails";
import MyBids from "../pages/MyBids";
import CreateProduct from "../pages/CreateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/productDetails/:id",
        loader: ({params}) => fetch(`https://smart-deals-server-eight-xi.vercel.app/products/${params.id}`),
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "/my-bids", 
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "create-product",
        element: <PrivateRoute><CreateProduct></CreateProduct></PrivateRoute>
      }
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);
