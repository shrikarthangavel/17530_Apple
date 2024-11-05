from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json

import users
from projects import create_new_project, getProject, getUserProjects 

app = Flask(__name__, static_folder="./build", static_url_path="/")
CORS(app)
uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/home/getProject', methods=['Post'])
def getProject():
    name = request.json['name']
    proj = projects.getProject(name)
    print(proj)
    return jsonify(proj)

@app.route('/home/getAllProjects', methods=['Post'])
def getUserProjects():
    username = request.json['username']
    projectsDB = projects.getUserProjects(username)
    return jsonify(projectsDB)

@app.route('/createUser', methods=['Post'])
def createUser():
    username = request.json['username']
    password = request.json['password']

    res = users.createUser(username, password)
    return jsonify(res)

@app.route('/loginUser', methods=['Post'])
def loginUser():
    username = request.json['username']
    password = request.json['password']
    print(password)

    res = users.login(username, password)
    return jsonify(res)

@app.route('/create_project', methods=['POST']) #Creates project!
def create_project():
    
    data = request.json
    project_id = data.get('project_id')
    project_name = data.get('project_name')
    username = data.get('username')
    
    # Check if project already exists
  
    # Establish a MongoDB connection to check if the project already exists
    from pymongo import MongoClient
    client = MongoClient(uri)
    db = client['Projects']

    # Check if a collection with the given project_id exists
    if project_id in db.list_collection_names():
        client.close()
        return jsonify({"error": "Project with this ID already exists."}), 400

    
    result = create_new_project(project_id, project_name, username) 
    return jsonify(result)
    


@app.route('/project/addUser', methods=['Post'])
def addUser():
    newUsername = request.json['username']
    projectName = request.json['project']
    res = projects.addNewUser(newUsername, projectName)
    return jsonify(res)
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
