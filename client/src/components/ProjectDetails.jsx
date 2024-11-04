import React, { useState } from 'react';
import HardwareSet from './HardwareSet';

/*
Structure of a Project entry
Project = {
  'name': name,
  'members': [list of members by username],
  'hardware': {"HWSET": #, ...}
  }
*/

function ProjectDetails(props) {
  const [updatedHardwareSets, setUpdatedHardwareSets] = useState(props.hardware);
  const [projectMembers, setProjectMembers] = useState(props.members)
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    const newMem = { id: 999, name: newMember };
    const updatedMembers = [...projectMembers, newMem]
    setProjectMembers(updatedMembers);
    setNewMember('');
    console.log(projectMembers);
  };

  const handleRemoveMember = (toRemove) => {
    setProjectMembers(projectMembers.filter((member) => member.id !== toRemove))
    console.log(projectMembers);
  };

  const handleCheckIn = (hwname, qty) => {
    const val = updatedHardwareSets[hwname]
    const updatedHardwareSetsCopy = { ...updatedHardwareSets };
    updatedHardwareSetsCopy[hwname] = val + qty
    setUpdatedHardwareSets(updatedHardwareSetsCopy)

  };

  const handleCheckOut = (hwname, qty) => {
    const val = updatedHardwareSets[hwname];
    const newQty = val - qty;
  
    // Send the update request to the server
    fetch('/api/check-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: hwname,
        quantity: qty
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to update hardware count in the database");
        }
        return response.json();
      })
      .then(data => {
        // Update the hardware set in the front end only if the database update was successful
        const updatedHardwareSetsCopy = { ...updatedHardwareSets };
        updatedHardwareSetsCopy[hwname] = newQty;
        setUpdatedHardwareSets(updatedHardwareSetsCopy);
      })
      .catch(error => console.error("Error:", error));
  };
  
  

  return (
    <div className="project">
      <h3>{props.name}</h3>
      <div className="hardware-container">
          {Object.entries(updatedHardwareSets).map(([key, hw]) => (
          <HardwareSet name={key} val={hw} onCheckIn={(qty) => handleCheckIn(key, qty)} onCheckOut={(qty) => handleCheckOut(key, qty)}/>
        ))}
      </div>
      <h4>Members:</h4>
      <list>
        {props.members.map((member) => (
          <li>
            {member}
            <button onClick={() => handleRemoveMember(member)}>Remove</button>
          </li>
        ))}
      </list>
      <input type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)} />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}

export default ProjectDetails;