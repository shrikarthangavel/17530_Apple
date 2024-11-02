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
          {Object.entries(updatedHardwareSets).map(([key, hw]) => (
          <HardwareSet name={key} val={hw} onCheckIn={(qty) => handleCheckIn(qty)} onCheckOut={(qty) => handleCheckOut(qty)}/>
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