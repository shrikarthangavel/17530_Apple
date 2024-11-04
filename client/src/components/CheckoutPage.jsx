import React, { useEffect, useState } from 'react';
import Header from './Header';
import './CheckoutPage.css'
import { Link, useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import HardwareComponent from './HardwareComponent';

// when page is visited, backend grabs relevant dictionaries
// from mongo and gives them to client to be displayed
function CheckoutPage() {
  const {username} = useParams();
  const [testProj, setTestProj] = useState({name: '', members: [], hardware: [], checkout: []})
  const [projList, setProjList] = useState({});


  const getProject = async () => {
    fetch('/home/getProject', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'name': 'Project 1'}) //replace with proper project name(s) or username to get all?
    }).then(response => response.json())
    .then(result => {
      setTestProj({
        "name": result.name,
        "members": result.members,
        "hardware": result.hardware,
        "checkout": result.checkout
        })
        handleAddProjectToList(testProj)
    })
  }

  const handleAddProjectToList = (newProj) => {
    setProjList({...projList, newProj});
  };

  const [projects] = useState({
    1: {
      name: 'Project Name 1',
      members: ["erictu", "testuser"],
      hardware: {
        "HWSet1": 0,
        "HWSet2": 10
      }
    },
    2: {
      name: 'Project Name 2',
      members: ["erictu"],
      hardware: {
        "HWSet1": 0,
        "HWSet2": 1
      }
    },
  });
  
  return (
    <div style={{ textAlign: "center", paddingTop: "80px" }}>
      <Header />
      <Link to="/home/management/checkout/return">Return Page</Link>
      <div className="main-content">
        <div className="projects-section">
          <h1>Projects</h1>
          <div className="projects-container">
            {Object.values(projects).map((project) => (
              <ProjectDetails
                key={project.name}
                name={project.name}
                hardware={project.hardware}
                members={project.members}
              />
            ))}
          </div>
        </div>
        <div class="hardware-section">
          <div className="hw-set1">
            <HardwareComponent hardwareName="HWSet1" />
          </div>
          <div className="hw-set2">
            <HardwareComponent hardwareName="HWSet1" />
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default CheckoutPage;