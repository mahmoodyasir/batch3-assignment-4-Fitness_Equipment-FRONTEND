import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../Layout/GenericLayout/GenericLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";


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
        ]
    },

]);

export default router;