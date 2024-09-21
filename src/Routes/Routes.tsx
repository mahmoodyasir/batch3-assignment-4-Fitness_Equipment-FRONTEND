import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../Layout/GenericLayout/GenericLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";


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
        ]
    },

]);

export default router;