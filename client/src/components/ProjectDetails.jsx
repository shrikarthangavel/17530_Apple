import React, { useState } from 'react';
import HardwareSet from './HardwareSet';

/*
Structure of a Project entry
Project = {
  'name': name,
  'members': [list of members by username],
  'hardware': [list of hardware objects (each instance created by a project is its own and not shared between projects)]
  'checkout': [list of values mapped to hardware]
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

  const handleCheckIn = (qty) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      return { ...set, status: set.status + qty };
    })
    setUpdatedHardwareSets(updatedSets);
  };

  const handleCheckOut = (qty) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      return { ...set, status: set.status - qty };
    })
    setUpdatedHardwareSets(updatedSets);
  };

  return (
    <div className="project">
      <h3>{props.name}</h3>
      <div className="hardware-container">
        {(updatedHardwareSets).map((hw) => (
          <HardwareSet name={hw} onCheckIn={(qty) => handleCheckIn(qty)} onCheckOut={(qty) => handleCheckOut(qty)}/>
        ))}
      </div>
      <h4>Members:</h4>
      <list>
        {props.members.map((member) => (
          <li>
            {member.name}
            <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
          </li>
        ))}
      </list>
      <input type="text" value={newMember} onChange={(e) => setNewMember(e.target.value)} />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
}

export default ProjectDetails;