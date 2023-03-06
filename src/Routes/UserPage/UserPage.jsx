import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FetchUser } from "../HomePage/UserSlice"
import { DisplayUser } from "./DisplayUser/DisplayUser"
import "./UserPage.css"


export const UserPage =()=>{

  const dispatch = useDispatch()

  const users = useSelector(state=>state.user.users)

  useEffect(()=>{
    dispatch(FetchUser())
  },[])


  return(
    <div className="containerUserPage">
      <div className="containerUserPageHeader">
        <h2>Page des utilisateurs :</h2>
        <Link className="LinkAdd" to="/user/form/Add?mode=Add"><img className="imgSvgAdd" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" /> Add</Link>
      </div>
      <hr />
      {
        users.length !== 0? users.map(user=> <DisplayUser key={user.id} id={user.id}/>)
        :
        <Link className="LinkAdd" to="/user/form/Add?mode=Add"><img className="imgSvgAdd" src="https://icons.getbootstrap.com/assets/icons/plus-circle.svg" alt="plus" /> Add</Link>
      }
    </div>
  )
}