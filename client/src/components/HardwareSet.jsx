import React from 'react';

function HardwareSet(props) {
  return (
    <li className="hardware-set">
      <span>HWSet{props.number}: {props.status}</span>
      <button variant="contained" color="primary" onClick={props.onEnter}>Enter qty</button>
      <button variant="contained" color="secondary" onClick={props.onCheckIn}>Check In</button>
      <button variant="contained" color="secondary" onClick={props.onCheckOut}>Check Out</button>
    </li>
  );
}

export default HardwareSet;