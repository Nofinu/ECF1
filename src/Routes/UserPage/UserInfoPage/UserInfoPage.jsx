import { useState } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ModalComponent } from "../../../Shared/ModalComponent"
import { FormImc } from "./FormIMC"


export const UserinfoPage=()=>{
  const { id } = useParams()

  const [modalStatus,setModalStatus]=useState(false)
  const [modalIMCStatus,setModalIMCStatus]=useState(false)

  const userFound = useSelector(state=> state.user.users).find(user=> user.id === id)

  const onClickAddIMCHandler=()=>{
    setModalStatus(!modalStatus)
  }

  const onclickShowIMC=()=>{
    setModalIMCStatus(!modalIMCStatus)
  }


  return(
    <div className="infoUserContainer">
      {
        modalStatus && createPortal(<ModalComponent closeModal={onClickAddIMCHandler}>
          <FormImc closeModal={onClickAddIMCHandler} id={userFound.id}/>
        </ModalComponent>,document.getElementById('modalRoot'))
      }
      {
        modalIMCStatus && createPortal(<ModalComponent closeModal={onclickShowIMC}>
          <div className="modalShowImcContainer">
            <h2>Liste de tout les IMC :</h2>
            {
              userFound.IMC.map((imc,index)=><div className="IMCDisplay" key={index}><p>IMC du : {imc.date}</p><p>{(+imc.poids/Math.pow(+userFound.height, 2)).toFixed(2)}</p></div>)
            }
          </div>
        </ModalComponent>,document.getElementById('modalRoot'))
      }
      <h2>{userFound.firstname} {userFound.lastName}</h2>
      <hr />
      <div className="headerInfoUserImc">
        <h3>10 derniere IMC : </h3>
          <button className="btnShowIMC" onClick={onClickAddIMCHandler}>Ajouter un IMC</button>
      </div>
      <div>
        {
          userFound.IMC.length < 10? userFound.IMC.map((imc,index)=><div className="IMCDisplay" key={index}><p>IMC du : {imc.date}</p><p>{(+imc.poids/Math.pow(+userFound.height, 2)).toFixed(2)}</p></div>)
          :
          userFound.IMC.map((imc,index)=>{
            if(index > userFound.IMC.length-11)
          return <div className="IMCDisplay" key={index}><p>IMC du : {imc.date}</p><p>{(+imc.poids/Math.pow(+userFound.height, 2)).toFixed(2)}</p></div>
        })
        }
      </div>
        <button className="btnShowIMC" onClick={onclickShowIMC}>Afficher tout les IMC</button>
    </div>
  )
}