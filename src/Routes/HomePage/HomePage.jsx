import { useRef, useState } from "react"
import "./HomePage.css"

export const HomePage=()=>{

  const TailleRef= useRef()
  const PoidsRef = useRef()

  const [IMC,setIMC]=useState(0)
  const [msg,setMsg]=useState("")

  const onSubmitHandler=(e)=>{  
    e.preventDefault()
    const imc = (+PoidsRef.current.value/Math.pow(+TailleRef.current.value, 2)).toFixed(2)
    setIMC(imc)
    switch(true){
      case imc<16.5:
        setMsg("Denutrition")
        break;
      case imc<18.5:
        setMsg("maigreur")
        break;
      case imc<25:
        setMsg("poids idéal")
        break;
      case imc<30:
        setMsg("surpoids")
        break;
      case imc<35:
        setMsg("obesité modérée")
        break;
      case imc<40:
        setMsg("obésité sévère")
        break;
      default:
        setMsg("obésité morbide")
        break
    }
  }

  return (
    <div className="HomePageContainer">
      <h2>Bienvenue sur eIMC !</h2>
      <hr />
      <p>
        eIMC est un site qui vous permet de calculer et de suivre votre Indice de Masse Corporelle.
      </p>
      <p>
      L’indice de masse corporelle ou IMC est une grandeur qui permet d'estimer la corpulence d’une personne. Inventé par Adolphe Quetelet,
      Il se calcule en fonction de la taille et de la masse corporelle. Il a été conçu, au départ, pour les adultes de 18 à 65 ans
      il constitue une indication et intervient dans le calcul de l'indice de masse grasse (IMG)
      </p>
      <h4>Graphique de l'indice de masse corporelle :</h4>
      <div className="divImgImc">
        <img className="ImgImc" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/BMI_grid.svg/langfr-1280px-BMI_grid.svg.png" alt="graphImc" />
      </div>
      <div className="testIMC">
        <h5>vous pouvez faire un test pour voir votre IMC ici :</h5>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="inputTaille">Entrer votre taille :</label>
          <input type="number" id="inputTaille" min="0"  max="2.5" step="0.01" ref={TailleRef}/>
          <label htmlFor="inputPoids">entrer votre poids : </label>
          <input type="number" id="inputPoids" min="0" max="300" step="0.1" ref={PoidsRef}/>
          <button>Calculer</button>
        </form>
        <div>
          <p>IMC: {IMC}</p>
          <p>vous etes en : <b className={msg}>{msg}</b></p>
        </div>
      </div>
    </div>
  )
}