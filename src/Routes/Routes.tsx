import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../Layout/GenericLayout/GenericLayout";
import Home from "../pages/Home/Home";


const router = createBrowserRouter([

    {
        path: "/",
        element: <GenericLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
        ]
    },

]);

export default router;