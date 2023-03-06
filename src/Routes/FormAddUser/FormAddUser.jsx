import "./FormAddUser.css"

export const FormAddUser=()=>{

  return(
    <form className="FormAddUser">
      <h2>First time on eIMC please enter some information:</h2>
      <div className="divRadioButton">
        <p className="textInput">Select your gender :</p>
        <label htmlFor="genderM">Men</label>
        <input className="Radiobtn" type="radio" name="Gender" id="genderM"/>
        <label htmlFor="genderF">Women</label>
        <input type="radio" name="Gender" id="genderF" />
      </div>
      <label htmlFor="inputHeight">enter your height (in meter): </label>
      <input type="number" min="0" max="2.50" step="0.01" id="inputHeight"/>
      <div className="divButtonAddUser">
        <button>Send</button>
      </div>
    </form>
  )
}