import React, { useState } from 'react';
import Header from './Header';
import './CheckoutPage.css'
import { Link } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

// when page is visited, backend grabs relevant dictionaries
// from mongo and gives them to client to be displayed
function CheckoutPage() {

  const [projects] = useState({
    1: {
      id: 1,
      name: 'Project Name 1',
      members: [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ],
      hardwareSets: [
        { id: 1, number: 1, status: 50 },
        { id: 2, number: 2, status: 0 },
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
        { id: 3, number: 1, status: 20 },
        { id: 4, number: 2, status: 30 },
      ],
    },
  });
  
    return (
    <div style={{textAlign:"center"}}>
      <Header />
      <h1>W</h1>
      <div className = "hardware-container">
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