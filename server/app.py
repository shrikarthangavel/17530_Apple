from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json

import users
import projects

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
    project_name = data.get('project_name')
    username = data.get('username')
    
    # Check if project already exists
    if projects.getProject(project_name):
        return jsonify({"error": "Project with this ID already exists."}), 400
    
    result = projects.create_new_project(project_name, username) 
    users.joinProject(project_name, username)
    return jsonify(result)
    


@app.route('/project/addUser', methods=['Post'])
def addUser():
    newUsername = request.json['username']
    projectName = request.json['project']

    if not users.findUser(newUsername):
        return jsonify(3)
    if not projects.getProject(projectName):
        return jsonify(2)

    res = projects.addNewUser(newUsername, projectName)
    return jsonify(res)

#should only be called when user and project exist
@app.route('/project/removeUser', methods=['Post'])
def removeUser():
    toRemove = request.json['username']
    projectName = request.json['project']

    projects.removeUser(toRemove, projectName)
    users.leaveProject(projectName, toRemove)

    return jsonify(0)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
