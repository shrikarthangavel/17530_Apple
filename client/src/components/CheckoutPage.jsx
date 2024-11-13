import React, { useState, useEffect } from 'react';
import Header from './Header';
import './CheckoutPage.css'
import { useParams } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import HardwareComponent from './HardwareComponent';

// when page is visited, backend grabs relevant dictionaries
// from mongo and gives them to client to be displayed
function CheckoutPage() {
  const {username} = useParams();
  const [projList, setProjList] = useState({});
  //
  const [projectIdentifer, setProjectIdentifer] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState("");  // Holds the project name input for join
  const [projectNameCreate, setProjectNameCreate] = useState(""); //Holds project name for creating
  const [message, setMessage] = useState("");

  const createProject = async () => {
    try {
      if (projectIdentifer == "" || projectNameCreate == "") {
        setMessage("Project identifier and name cannot be empty")
        return
      }
      const response = await fetch('/create_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_name: projectNameCreate, username: username, description: projectDescription, identifier: projectIdentifer })
      });
      const result = await response.json();
      setMessage(result.success || result.error);
    } catch (error) {
      setMessage("Error creating project");
    } finally {
      setProjectNameCreate("")
      setProjectIdentifer("")
      setProjectDescription("")
    }
  };

  const joinProject = async () => {
    try {
      const response = await fetch('/project/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'username': username, 'project': projectName})
      });
      const result = await response.json();
      if (result == 2) {setMessage("Project does not exist")}
      else if (result == 1) {setMessage("User already in project")}
      else {setMessage("Success")}
    } catch (error) {
      setMessage("Error joining project");
    } finally {
      setProjectName("")
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
  });
  
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h1>Spacer text, do not delete</h1>
      <h1>Welcome, {username}</h1>
      {/* Project Creation Inputs and Button */}
      <div>
        <input type="text" placeholder="Project ID" value={projectIdentifer} onChange={(e) => setProjectIdentifer(e.target.value)}/>
        <input type="text" placeholder="Project Name" value={projectNameCreate} onChange={(e) => setProjectNameCreate(e.target.value)}/>
        <input type="text" placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
        <button onClick={createProject}>Create New Project</button>
      </div>

      {/* Project Join Inputs and Button */}
      <div>
        <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
        <button onClick={joinProject}>Join Project</button>
      </div>
      <p>{message}</p> {/* Display success or error message */}
      
      {/* Project List */}
      <div>
        <h1>Projects</h1>
        <div className="projects-container">
          {Object.values(projList).map((project) => (
            <ProjectDetails
              name={project.name}
              hardware={project.hardware}
              members={project.members}
              description={project.description}
              identifier={project.identifier}
              changeMessage={(msg) => setMessage(msg)}
            />
          ))}
        </div>
      </div>
      {/* Hardware Availability */}
      <div class="hardware-section">
        <div className="hw-set1">
          <HardwareComponent hardwareName="Hammers" />
          <HardwareComponent hardwareName="Nails" />
          <HardwareComponent hardwareName="Screwdrivers" />
          <HardwareComponent hardwareName="Screws" />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;