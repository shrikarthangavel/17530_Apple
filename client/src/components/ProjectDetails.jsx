import React, { useState } from 'react';
import HardwareSet from './HardwareSet';

function ProjectDetails(props) {
  const [updatedHardwareSets, setUpdatedHardwareSets] = useState(props.hardwareSets);
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

  const handleCheckIn = (hardwareSetId, qty) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      if (set.id === hardwareSetId) {
        return { ...set, status: set.status + qty };
      }
      return set;
    })
    setUpdatedHardwareSets(updatedSets);
  };

  const handleCheckOut = (hardwareSetId, qty) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      if (set.id === hardwareSetId) {
        return { ...set, status: set.status - qty };
      }
      return set;
    })
    setUpdatedHardwareSets(updatedSets);
  };

  return (
    <div className="project">
      <h3>{props.name}</h3>
      <ul>
        {updatedHardwareSets.map((hardwareSet) => (
          <HardwareSet
            key={hardwareSet.id}
            number={hardwareSet.number}
            status={hardwareSet.status}
            onCheckIn={(qty) => handleCheckIn(hardwareSet.id, qty)}
            onCheckOut={(qty) => handleCheckOut(hardwareSet.id, qty)}
          />
        ))}
      </ul>
      <h4>Members:</h4>
      <list>
        {props.members.map((member) => (
          <li key={member.id}>
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