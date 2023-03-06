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

    return {data:data,email:credentials.email}
  }
)

export const AddUserEmail = createAsyncThunk(
  "auth/AddUserEmail",
  async (credentials,{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch(`${BaseUrl}emailuser.json?auth=${token}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(credentials)
      })
      if(!response.ok){
        throw new Error('error when adding the emailUser')
      }

      const data = await response.json()

      return data
    }
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

export const FetchUserEmail = createAsyncThunk(
  "auth/FetchUserEmail",
  async () =>{
    const response = await fetch(`${BaseUrl}emailuser.json`)
    
    if(!response.ok){
      throw new Error('error xhen fetching userEmail')
    }

    const data = await response.json()
    const tmpTab=[]
    for(let key in data){
      tmpTab.push({id:key,...data[key]})
    }

    return tmpTab
  }
)

const AuthSlice= createSlice({
  name:"AuthSlice",
  initialState:{
    user:null,
    userEmail:null,
    userId:null,
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
      state.user = action.payload.data
      state.userEmail = action.payload.email
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
      state.user = action.payload.data
      state.userEmail = action.payload.email
      localStorage.setItem('token', action.payload.idToken)
    })

    builder.addCase(signUp.rejected, (state) => {
      state.error="error"
      state.isLoading = false
      alert("Incorect Email or Password")
    })

    builder.addCase(AddUserEmail.fulfilled,(state,action)=>{
      state.userId = action.payload.name
    })

    builder.addCase(FetchUserEmail.fulfilled,(state,action)=>{
      const emailFound = action.payload.find(email=> email.email === state.userEmail)
      if(emailFound){
        state.userId = emailFound.id
      }
    })
  }
})

export const {removeUser}=AuthSlice.actions

export default AuthSlice.reducer