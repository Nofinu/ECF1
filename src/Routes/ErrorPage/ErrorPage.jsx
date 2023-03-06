import { Link, useRouteError } from "react-router-dom"
import "./ErrorPage.css"


export const ErrorPage =()=>{

  const error = useRouteError()
  return(
  <div className="containerErrorPage">
    <h1>Error {error.status}</h1>
    <p>{error.data}</p>
    <Link className="LinkError" type="button" to="/">Home Page</Link>
  </div>
  )
}