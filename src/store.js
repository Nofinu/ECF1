import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Routes/Auth/AuthSlice";
import UserSlice from "./Routes/HomePage/UserSlice";



const store = configureStore({
  reducer:{
    auth:AuthSlice,
    user:UserSlice,
  }
})

export default store