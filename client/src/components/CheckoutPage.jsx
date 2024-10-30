import React, { useState } from 'react';
import Header from './Header';
import './CheckoutPage.css'
import { Link, useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

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

  const [projects] = useState({   //replace to fill with project data from DB
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
      <h1>{username}</h1>
      <div className = "hardware-container">
      </div>
      <Link to="/home/management/checkout/return">Return Page</Link>
      <div>
        <h1>Projects</h1>
          <div className="projects-container">
            {Object.values(projList).map((project) => (
              <ProjectDetails name={project.name} hardware={project.hardware} members={project.members} />
          ))}
          </div>
      </div>
      <button onClick={getProject}>TEST GET SINGULAR PROJECT</button>
      <h1>{testProj.name} {testProj.members} {testProj.hardware} {testProj.checkout}</h1>
    </div>
    );
}

export default CheckoutPage;