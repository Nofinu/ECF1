import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./HomePage.css"

export const HomePage=()=>{

  const userId = useSelector(state=>state.auth.userId)

  console.log(userId)

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
    </div>
  )
}