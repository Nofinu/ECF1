import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { BaseUrl, SignInUrl, SingUpUrl } from "../../accesApi";

export const signIn= createAsyncThunk(
  "auth/signIn",
  async (credentials)=>{
    const response = await fetch(SignInUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'authentification !")
    }

    const data = await response.json()

    return data
  }
)


export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials) => {
    const response = await fetch(SingUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'authentification !")
    }

    const data = await response.json()

    return data
  }
)


const AuthSlice= createSlice({
  name:"AuthSlice",
  initialState:{
    user:null,
    isLoading:false,
    error:null
  },
  reducers:{
    removeUser(state) {
      state.user = null
      state.userEmail = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(signIn.pending, (state) => {
      state.user = null
      state.userEmail = null
      state.isLoading = true
      state.error = null
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.user = action.payload
      localStorage.setItem('token', action.payload.idToken)
    })
    builder.addCase(signIn.rejected, (state) => {
      state.error="error"
      state.isLoading = false
      alert("Incorect Email or Password")
    })

    builder.addCase(signUp.pending, (state) => {
      state.user = null
      state.userEmail = null
      state.isLoading = true
      state.error = null
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.user = action.payload
      localStorage.setItem('token', action.payload.idToken)
    })

    builder.addCase(signUp.rejected, (state) => {
      state.error="error"
      state.isLoading = false
      alert("Incorect Email or Password")
    })

  }
})

export const {removeUser}=AuthSlice.actions

export default AuthSlice.reducer