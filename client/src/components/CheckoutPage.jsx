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
  const [hwList, setHWList] = useState([]);
  //
  const [projectIdentifer, setProjectIdentifer] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectIdentifierJoin, setProjectIdentifierJoin] = useState("");  // Holds the project name input for join
  const [projectNameCreate, setProjectNameCreate] = useState(""); //Holds project name for creating
  const [message, setMessage] = useState("");

  const createProject = async () => {
    try {
      if (projectIdentifer === "" || projectNameCreate === "") {
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
        body: JSON.stringify({'username': username, 'identifier': projectIdentifierJoin})
      });
      const result = await response.json();
      if (result === 2) {setMessage("Project does not exist")}
      else if (result === 1) {setMessage("User already in project")}
      else {setMessage("Success")}
    } catch (error) {
      setMessage("Error joining project");
    } finally {
      setProjectIdentifierJoin("")
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await fetch('/home/getAllProjects', {method:'Post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({'username': username})});
      const projectjsonData = await projectResponse.json();
      setProjList(projectjsonData)
    }
    const fetchData2 = async () => {
      const hardwareResponse = await fetch('/home/getAllHardware',
        {headers:{'Content-Type': 'application/json'}}
      );
      const hardwarejsonData = await hardwareResponse.json();
      setHWList(hardwarejsonData)
    }
    
    const intervalId = setInterval(() => {
      fetchData();
      fetchData2();
    }, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId);
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
        <input type="text" placeholder="Project ID" value={projectIdentifierJoin} onChange={(e) => setProjectIdentifierJoin(e.target.value)}/>
        <button onClick={joinProject}>Join Project</button>
      </div>
      <p>{message}</p> {/* Display success or error messages */}
      
      {/* Project List */}
      <div>
        <h1>Projects</h1>
        <div className="projects-container">
          {projList && Object.values(projList).map((project) => (
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
          {hwList.map((hwset) => (
            <HardwareComponent hardwareName={hwset} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;