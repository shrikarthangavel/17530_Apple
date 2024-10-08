import React, { useState } from 'react';

function Form(props) {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return(
    <div>
      <center>
      <form>
        <label>
          {props.fieldTitle}: 
          <input type="text" value={inputValue} onChange={handleInputChange}/>
          
        </label>
        <p>Your name is: {inputValue}</p>
      </form>
      </center>
      
    </div>
  )
}

export default Form;

  