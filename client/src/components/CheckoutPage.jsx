import React, { useState, useEffect } from 'react';
import Header from './Header';
import './CheckoutPage.css'
import { Link, useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

// when page is visited, backend grabs relevant dictionaries
// from mongo and gives them to client to be displayed
function CheckoutPage() {
  const {username} = useParams();
  const [testProj, setTestProj] = useState({name: '', members: [], hardware: []})
  const [projList, setProjList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/home/getAllProjects', {method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})});
      const jsonData = await response.json();
      setProjList(jsonData)
    }
    fetchData();
  }, []);


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
        })
        handleAddProjectToList(testProj)
    })
  }

  const handleAddProjectToList = (newProj) => {
    setProjList({...projList, newProj});
  };
  
    return (
    <div style={{textAlign:"center"}}>
      <Header />
      <h1>W</h1>
      <h1>{username}</h1>
      <div className = "hardware-container">
      </div>
      <div>
        <h1>Projects</h1>
          <div className="projects-container">
            {Object.values(projList).map((project) => (
              <ProjectDetails name={project.name} hardware={project.hardware} members={project.members}/>
          ))}
          </div>
      </div>
      <button onClick={getProject}>TEST GET SINGULAR PROJECT</button>
      <h1>{testProj.name} {testProj.members} {testProj.hardware} {testProj.checkout}</h1>
    </div>
    );
}

export default CheckoutPage;