import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../Layout/GenericLayout/GenericLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductCart from "../pages/ProductCart/ProductCart";
import Checkout from "../pages/Checkout/Checkout";
import AboutUs from "../pages/AboutUs/AboutUs";
import ProductManagement from "../pages/ProductManagement/ProductManagement";


const router = createBrowserRouter([

    {
        path: "/",
        element: <GenericLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/products",
                element: <Products/>
            },
            {
                path: "/product_details/:id",
                element: <ProductDetails/>
            },
            {
                path: "/product_cart",
                element: <ProductCart/>
            },
            {
                path: "/checkout",
                element: <Checkout/>
            },
            {
                path: "/about_us",
                element: <AboutUs/>
            },
            {
                path: "/product_management",
                element: <ProductManagement/>
            },
        ]
    },

]);

export default router;