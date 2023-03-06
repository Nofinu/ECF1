import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Routes/Auth/AuthSlice";



const store = configureStore({
  reducer:{
    auth:AuthSlice,
  }
})

export default store