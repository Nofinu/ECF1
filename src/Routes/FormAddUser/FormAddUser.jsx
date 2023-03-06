import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AddUser, EditUser, SuprUser } from "../HomePage/UserSlice"
import "./FormAddUser.css"

export const FormAddUser=()=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const mode = searchParams.get('mode')
  const { id } = useParams()

  const userFound = useSelector(state=> state.user.users).find(user=> user.id === id)

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const genderMRef = useRef()
  const genderFRef = useRef()
  const heightRef = useRef()
  const weightRef=useRef()


  const onSubmitHandler=(e)=>{
    e.preventDefault()

    let gender = ""
    if(genderMRef.current.checked){
      gender="Homme"
    }
    else if(genderFRef.current.checked) {
      gender="Femme"
    }

    let date = new Date
    date = date.toLocaleDateString()
    let user={}

    if(mode==="Add"){
      user = {
        firstname: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        gender,
        height: heightRef.current.value,
        IMC:[{poids:+weightRef.current.value,date}]
      }
    }
    else{
      user = {
        firstname: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        gender,
        height: heightRef.current.value,
        IMC: userFound.IMC
      }
    }
    if(mode =="Add"){
      dispatch(AddUser(user))
    }
    else if(mode === "Edit"){
      dispatch(EditUser({id:userFound.id,...user}))
    }
    else{
      dispatch(SuprUser(userFound.id))
    }
    navigate("/user")
  }

  return(
    <form className="FormAddUser" onSubmit={onSubmitHandler}>
      <h2>{mode === "Add"?"Ajouter un utilisateur" : mode === "Edit"? "Modiffier un utilisateur": "Supprimer un utilisateur"}</h2>

        <label htmlFor="inputFirstName">Prénom :</label>
        <input type="text" id="inputFirstName" ref={firstNameRef} required defaultValue={mode === "Add"? "":userFound.firstname} disabled={mode === "Supr"?true:false}/>
        <label htmlFor="inputLastName">Nom : </label>
        <input type="text" id="inputLastName" ref={lastNameRef} required defaultValue={mode === "Add"? "":userFound.lastName} disabled={mode === "Supr"?true:false}/>
      <div className="divRadioButton">
        <p className="textInput">selectioner votre genre :</p>
        <label htmlFor="genderM">Homme</label>
        <input className="Radiobtn" type="radio" name="Gender" id="genderM" ref={genderMRef} defaultChecked={mode==="Add"? true: userFound.gender ==="Homme"?true:false}/>
        <label htmlFor="genderF">Femme</label>
        <input type="radio" name="Gender" id="genderF" ref={genderFRef} defaultChecked={mode==="Add"? false: userFound.gender ==="Femme"?true:false}/>
      </div>
      <label htmlFor="inputHeight">entrer votre taille (en metres): </label>
      <input type="number" min="0" max="2.50" step="0.01" id="inputHeight" ref={heightRef}required defaultValue={mode === "Add"? "":userFound.height} disabled={mode === "Supr"?true:false}/>
      {
        mode === "Add" &&
        <>
          <label htmlFor="inputweight">entrer votre poids (en kilogrames): </label>
          <input type="number" min="0" max="300" step="0.1" id="inputweight" ref={weightRef}required defaultValue={mode === "Add"? "":userFound.weight} disabled={mode === "Supr"?true:false}/>
        </>
      }
      <div className="divButtonAddUser">
        <button>Send</button>
      </div>
    </form>
  )
}