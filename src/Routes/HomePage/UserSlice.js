import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../accesApi";

export const AddUser = createAsyncThunk(
  "User/AddUser",
  async (credentials,{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch(`${BaseUrl}user.json?auth=${token}`,{
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

      return {id:data.name,...credentials}
    }
  }
)

export const AddIMC = createAsyncThunk(
  "User/AddIMC",
  async ({id,...IMCValue},{getState})=>{
    const token = getState().auth.user.idToken
    const users = getState().user.users
    const userFound = {...users.find(user=> user.id === id)}
    if(userFound){
      let usertmp = {...userFound}
      usertmp.IMC=[...userFound.IMC,{...IMCValue}].sort((a,b)=>new Date(a.date) - new Date(b.date))
      //sort a revoir
      if(token){
        const response = await fetch(`${BaseUrl}user/${id}.json?auth=${token}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify(usertmp)
        })
        if(!response.ok){
          throw new Error('error when adding the emailUser')
        }
  
        const data = await response.json()
  
        return {id,...data}
      }
    }

  }
)

export const EditUser = createAsyncThunk(
  "user/EditUser",
  async ({id,...userValue},{getState})=>{
    const token = getState().auth.user.idToken
    if(token){
      const response = await fetch (`${BaseUrl}user/${id}.json?auth=${token}`,{
        method:"PATCH",
        Headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(userValue)
      })
      if(!response.ok){
        throw new Error("error when editing user")
      }
      const data = await response.json()
    return {id,...data}
    }
  }
)

export const SuprUser = createAsyncThunk(
  "user/SuprUser",
  async (id,{getState})=>{
    const token = getState().auth.user.idToken
    const response = await fetch(`${BaseUrl}/user/${id}.json?auth=${token}`,{
      method:"DELETE"
    })
    if(!response.ok){
      throw new Error("Error during the deletion of the weapon")
    }

    return id
  }
)

export const FetchUser = createAsyncThunk(
  "User/FetchUser",
  async()=>{
      const response = await fetch(`${BaseUrl}user.json`)
      if(!response.ok){
        throw new Error ('error when fetchin user Information')
      }
      const data = await response.json()
      const tmpTab=[]
      for(let key in data){
        tmpTab.push({id:key,...data[key]})
      }
  
      return tmpTab
    }
)

const UserSlice = createSlice({
  name:"UserSlice",
  initialState:{
    users:[]
  },
  reducers:{

  },
  extraReducers:(builder)=>{
    builder.addCase(AddUser.fulfilled,(state,action)=>{
      state.users.push(action.payload)
      state.users = state.users.sort((a,b)=>a.firstname.localeCompare(b.firstname))
    })
    builder.addCase(FetchUser.fulfilled,(state,action)=>{
      state.users = action.payload
      state.users = state.users.sort((a,b)=>a.firstname.localeCompare(b.firstname))
    })
    builder.addCase(EditUser.fulfilled, (state, action) => {
      const { id } = action.payload
      const userFound = state.users.find(user => user.id === id)
      if (userFound) {
        state.users = [...state.users.filter(a => a !== userFound), action.payload].sort((a,b)=>a.firstname.localeCompare(b.firstname))
      }
    })
    builder.addCase(SuprUser.fulfilled, (state, action) => {
      const userFound = state.users.find(a => a.id === action.payload)
      if (userFound) {
        state.users = [...state.users.filter(a => a !== userFound)].sort((a,b)=>a.firstname.localeCompare(b.firstname))
      }
    })
    builder.addCase(AddIMC.fulfilled,(state,action)=>{
      state.users = [...state.users.filter(user=> user.id !== action.payload.id),{...action.payload}].sort((a,b)=>a.firstname.localeCompare(b.firstname))
    })
  }
})

export const {setSearchDoAction,resetSearchAction} = UserSlice.actions


export default UserSlice.reducer