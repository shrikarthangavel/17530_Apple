import React, { useState } from 'react';
import HardwareSet from './HardwareSet';

function ProjectDetails(props) {
  const [updatedHardwareSets, setUpdatedHardwareSets] = useState(props.hardwareSets);

  const handleEnter = (hardwareSetId) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      if (set.id === hardwareSetId) {
        return { ...set, status: 'Updated status' };
      }
      return set;
    });
    setUpdatedHardwareSets(updatedSets);
  };

  const handleCheckIn = (hardwareSetId) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      if (set.id === hardwareSetId) {
        return { ...set, status: 'Checked In' };
      }
      return set;
    });
    setUpdatedHardwareSets(updatedSets);
  };

  const handleCheckOut = (hardwareSetId) => {
    const updatedSets = updatedHardwareSets.map((set) => {
      if (set.id === hardwareSetId) {
        return { ...set, status: 'Checked Out' };
      }
      return set;
    });
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
            onEnter={() => handleEnter(hardwareSet.id)}
            onCheckIn={() => handleCheckIn(hardwareSet.id)}
            onCheckOut={() => handleCheckOut(hardwareSet.id)}
          />
        ))}
      </ul>
      <h4>Members:</h4>
      <list>
        {props.members.map((member) => (
          <li key={member.id}>
            <list primary={member.name} />
          </li>
        ))}
      </list>
    </div>
  );
}

export default ProjectDetails;