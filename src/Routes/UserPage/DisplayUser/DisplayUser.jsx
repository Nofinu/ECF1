import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


export const DisplayUser=(props)=>{

  const userFound = useSelector(state=> state.user.users).find(user=> user.id === props.id)

  return(
    <div className="displayUserContainer">
      <div className="displayUserHeader">
        <h4>{userFound.firstname} {userFound.lastName}</h4>
        <div>
        <Link className="LinkEdit" to={`/user/form/${userFound.id}?mode=Edit`}> <img className="imgSvgEdit" src="https://icons.getbootstrap.com/assets/icons/pencil-square.svg" alt="plus" /> Edit</Link>
        <Link className="LinkSupr" to={`/user/form/${userFound.id}?mode=Supr`}> <img className="imgSvgSupr" src="https://icons.getbootstrap.com/assets/icons/trash-fill.svg" alt="plus" />Supr</Link>
        </div>
      </div>
      <hr />
      <p>taille : {userFound.height}</p>
      <p> dernier IMC : {(+userFound.IMC[userFound.IMC.length-1].poids/Math.pow(+userFound.height, 2)).toFixed(2)}</p>
      <Link className="linkDisplayUserinfo" to={`/user/${userFound.id}`}>Afficher les infos</Link>
    </div>
  )
}