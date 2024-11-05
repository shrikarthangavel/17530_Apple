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
  //
  const [projectId, setProjectId] = useState("");  // Holds the project ID input
  const [projectName, setProjectName] = useState("");  // Holds the project name input
  const [message, setMessage] = useState("");

  const createProject = async () => {
    try {
      const response = await fetch('/create_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, project_name: projectName, username })
      });
      const result = await response.json();
      setMessage(result.success || result.error);
    } catch (error) {
      setMessage("Error creating project");
    }
  };

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
    <div style={{ textAlign: "center" }}>
      <Header />
      <h1>Welcome, {username}</h1>
      {/* Project Creation Inputs and Button */}
      <div>
        <input
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button onClick={createProject}>Create New Project</button>
        <p>{message}</p>  {/* Display success or error message */}
      </div>
      
      <div className="hardware-container"></div>
      
      <Link to="/home/management/checkout/return">Return Page</Link>
      
      {/* Project List */}
      <div>
        <h1>Projects</h1>
        <div className="projects-container">
          {Object.values(projList).map((project, index) => (
            <ProjectDetails
              key={index}
              name={project.name}
              hardware={project.hardware}
              members={project.members}
            />
          ))}
        </div>
      </div>
      
      {/* Button to Test Get Singular Project */}
      <button onClick={getProject}>TEST GET SINGULAR PROJECT</button>
      <h1>{testProj.name} {testProj.members.join(", ")} {JSON.stringify(testProj.hardware)} {JSON.stringify(testProj.checkout)}</h1>
    </div>
  );
}

export default CheckoutPage;