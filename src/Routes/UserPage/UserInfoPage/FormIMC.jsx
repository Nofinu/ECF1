import { useRef } from "react"
import { useDispatch } from "react-redux"
import { AddIMC } from "../../HomePage/UserSlice"
import "./FormIMC.css"

export const FormImc =(props)=>{

  const dispatch = useDispatch()

  const dateRef= useRef()
  const poidsRef=useRef()

  
  const onSubmitHandler=async (e)=>{
    e.preventDefault()

    let date = dateRef.current.value
    date = date.split("-").reverse().join("/")
  
    const IMCInfo ={
      date,
      poids : +poidsRef.current.value,
    }

    await dispatch(AddIMC({id:props.id,...IMCInfo}))

    props.closeModal()
  }

  return(
    <form className="FormIMC" onSubmit={onSubmitHandler}>
      <h2>Ajout d'un nouvel IMC : </h2>
      <hr />
      <label htmlFor="inputDateIMC"> entrer la date de la mesure :</label>
      <input type="date" id="inputDateIMC" ref={dateRef} />
      <label htmlFor="inputPoidsIMC">Entrer votre poids :</label>
      <input type="number" id="inputPoidsIMC" ref={poidsRef} />
      <button></button>
    </form>
  )
}