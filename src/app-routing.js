import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {HomePage} from "./Routes/HomePage/HomePage"
import {LogPage} from "./Routes/Auth/LogPage"
import { FormAddUser } from "./Routes/FormAddUser/FormAddUser";
import ProtectedRoute from "./Component/ProtectedRoute"


export const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
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
          path:"/userinformation",
          element:<ProtectedRoute><FormAddUser/></ProtectedRoute>
        }
    ]}
])