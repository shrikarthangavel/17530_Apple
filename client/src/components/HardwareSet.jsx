import React from 'react';
import { useState } from "react"

function HardwareSet(props) {
  const [inputQty, setInputQty] = useState(0);

  const handleInputChange = (event) => {
    setInputQty(parseInt(event.target.value));
  };
  
  return (
    <li className="hardware-set">
      <span>HWSet{props.number}: {props.status}</span>
      <input type="number" value={inputQty} onChange={handleInputChange}></input>
      <button variant="contained" color="secondary" onClick={() => props.onCheckIn(inputQty)}>Check In</button>
      <button variant="contained" color="secondary" onClick={() => props.onCheckOut(inputQty)}>Check Out</button>
    </li>
  );
}

export default HardwareSet;