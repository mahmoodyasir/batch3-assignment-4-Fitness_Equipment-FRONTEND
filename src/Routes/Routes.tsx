import { createBrowserRouter } from "react-router-dom";
import GenericLayout from "../Layout/GenericLayout/GenericLayout";


const router = createBrowserRouter([

    {
        path: "/",
        element: <GenericLayout/>
    },

]);

export default router;