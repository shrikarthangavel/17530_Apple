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
  const [projectName] = useState(props.name)
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    fetch('/project/addUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': newMember, 'project': projectName})
    }).then(response => response.json())
    .then(result => {
      if (result == 0) {
        const updatedMembers = [...projectMembers, newMember]
        setProjectMembers(updatedMembers);
        //more feedback, sendmsg?
      } else {
        //feedback that add new member failed (user does not exist, already in proj)
      }
      setNewMember('');
    })
  };

  const handleRemoveMember = (toRemove) => {
    const updatedMembers = projectMembers.filter(member => member !== toRemove);
    setProjectMembers(updatedMembers);
  };

  const handleCheckIn = (hwname, qty) => {
    const val = updatedHardwareSets[hwname]
    const updatedHardwareSetsCopy = { ...updatedHardwareSets };
    updatedHardwareSetsCopy[hwname] = val + qty
    setUpdatedHardwareSets(updatedHardwareSetsCopy)

  };

  const handleCheckOut = (hwname, qty) => {
    const val = updatedHardwareSets[hwname]
    const updatedHardwareSetsCopy = { ...updatedHardwareSets };
    updatedHardwareSetsCopy[hwname] = val - qty
    setUpdatedHardwareSets(updatedHardwareSetsCopy)
  };

  return (
    <div className="project">
      <h3>{projectName}</h3>
      <div className="hardware-container">
          {Object.entries(updatedHardwareSets).map(([key, hw]) => (
          <HardwareSet name={key} val={hw} onCheckIn={(qty) => handleCheckIn(key, qty)} onCheckOut={(qty) => handleCheckOut(key, qty)}/>
        ))}
      </div>
      <h4>Members:</h4>
      <list>
        {projectMembers.map((member) => (
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