import React, { useState } from 'react';
import Form from './Form';
import Dropdown from './Dropdown';
import ValueTable from './ValueTable';
import StringList from './StringList';
import Header from './Header';
import './CheckoutPage.css'
import { Link } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

// when page is visited, backend grabs relevant dictionaries
// from mongo and gives them to client to be displayed
function CheckoutPage() {
  const testOptions = [
    { value: "Option 1", label: "1"},
    { value: "Option2", label: "2"},
    { value: "Option3", label: "3"}
  ];

  const projectMembers = ["Amy", "Bob", "Cam"]

  const hardwareSets = [
    { value: "HWset1", label: "2"},
    { value: "HWset2", label: "4"}
  ];

  const [projects] = useState({
    1: {
      id: 1,
      name: 'Project Name 1',
      members: [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ],
      hardwareSets: [
        { id: 1, number: 1, status: '50/100' },
        { id: 2, number: 2, status: '0/100' },
      ],
    },
    2: {
      id: 2,
      name: 'Project Name 2',
      members: [
        { id: 3, name: 'x' },
        { id: 4, name: 'y' },
        { id: 5, name: 'z' }
      ],
      hardwareSets: [
        { id: 3, number: 1, status: '20/100' },
        { id: 4, number: 2, status: '30/100' },
      ],
    },
  });
  
    return (
    <div style={{textAlign:"center"}}>
      <Header />
      <h1>W</h1>
      <h1>ProjectName Information</h1>
      <div className = "hardware-container">
        <StringList title="Project Members" list={projectMembers} />
        <ValueTable valueName="HW set" labelName="Qty" db={hardwareSets} />
      </div>
      <Link to="/home/management/checkout/return">Return Page</Link>
      <div>
        <h1>Projects</h1>
          <div className="projects-container">
            {Object.values(projects).map((project) => (
              <ProjectDetails key={project.id} name={project.name} hardwareSets={project.hardwareSets} members={project.members} />
          ))}
          </div>
      </div>
    </div>
    );
}

export default CheckoutPage;