import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Routes/Auth/AuthSlice";



const store = configureStore({
  reducer:{
    Auth:AuthSlice,
  }
})

export default store