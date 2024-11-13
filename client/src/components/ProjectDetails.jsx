import React, { useState } from 'react';
import HardwareSet from './HardwareSet';

/*
Structure of a Project entry
ProjectName = {
    'name': name,
    'members': [member1, member2, ...],
    'hardware': {"hardwareset1" : #, 
                "hardwareset2": #, ...},
    'description': "string description",
    'identifier': "unique string identifier"
}
*/

function ProjectDetails(props) {
  const [updatedHardwareSets, setUpdatedHardwareSets] = useState(props.hardware);
  const [projectMembers, setProjectMembers] = useState(props.members);
  const [projectDescription] = useState(props.description);
  const [projectIdentifer] = useState(props.identifier);
  const [projectName] = useState(props.name);
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
        props.changeMessage(`${newMember} has been added`)
      } else {
        //feedback that add new member failed (user does not exist, already in proj)
        props.changeMessage(`could not add ${newMember} to project`)
      }
      setNewMember('');
    })
  };

  const handleRemoveMember = (toRemove) => {
    fetch('/project/removeUser', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': toRemove, 'project': projectName})
    }).then(response => response.json())
    .then(result => {
      if (result == 0) {
        const updatedMembers = projectMembers.filter(member => member !== toRemove);
        setProjectMembers(updatedMembers);
        props.changeMessage(`${toRemove} has been removed`)
      } else {
        props.changeMessage(`could not remove ${newMember} from project`)
      }
    })
  };

  const handleCheckIn = (hwname, qty) => { 
    fetch('/project/checkIn', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'project': projectName, 'hardware': hwname, 'qty': qty})
    }).then(response => response.json())
    .then(result => {
      if (result == 0) { //success
        const val = updatedHardwareSets[hwname]
        const updatedHardwareSetsCopy = { ...updatedHardwareSets };
        updatedHardwareSetsCopy[hwname] = val - qty
        setUpdatedHardwareSets(updatedHardwareSetsCopy)
        props.changeMessage(`successfully checked in ${qty} ${hwname}`)
      } else {  //failure
        props.changeMessage(`could not check in ${qty} of ${hwname}`)
      }
    })
  };

  const handleCheckOut = (hwname, qty) => {
    fetch('/project/checkOut', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'project': projectName, 'hardware': hwname, 'qty': qty})
    }).then(response => response.json())
    .then(result => {
      if (result == 0) { //success
        const val = updatedHardwareSets[hwname]
        const updatedHardwareSetsCopy = { ...updatedHardwareSets };
        updatedHardwareSetsCopy[hwname] = val + qty
        setUpdatedHardwareSets(updatedHardwareSetsCopy)
        props.changeMessage(`successfully checked out ${qty} ${hwname}`)
      } else {  //failure
        props.changeMessage(`could not check out ${qty} of ${hwname}`)
      }
    })
  };

  return (
    <div className="project">
      <h3>Name: {projectName}</h3>
      <h4>Identifier: {projectIdentifer}</h4>
      <p>Description: {projectDescription}</p>
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