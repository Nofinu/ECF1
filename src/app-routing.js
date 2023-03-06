import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {HomePage} from "./Routes/HomePage/HomePage"
import {LogPage} from "./Routes/Auth/LogPage"
import { FormAddUser } from "./Routes/FormAddUser/FormAddUser";
import ProtectedRoute from "./Component/ProtectedRoute"
import { UserPage } from "./Routes/UserPage/UserPage";
import { UserinfoPage } from "./Routes/UserPage/UserInfoPage/UserInfoPage";
import { ErrorPage } from "./Routes/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
        {
        path:"/",
        element:<HomePage/>
        },
        {
          path:"/auth",
          element:<LogPage/>
        },
        {
          path:"/user",
          element:<ProtectedRoute><UserPage/></ProtectedRoute>
        },
        {
          path:"/user/form/:id",
          element:<ProtectedRoute><FormAddUser/></ProtectedRoute>
        },
        {
          path:"/user/:id",
          element:<ProtectedRoute><UserinfoPage/></ProtectedRoute>
        }
    ]}
])