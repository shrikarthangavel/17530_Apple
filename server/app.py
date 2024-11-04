from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json

import users
import projects

app = Flask(__name__, static_folder="./build", static_url_path="/")
CORS(app)

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

    res = users.login(username, password)
    return jsonify(res)

@app.route('/project/addUser', methods=['Post'])
def addUser():
    newUsername = request.json['username']
    projectName = request.json['project']
    res = projects.addNewUser(newUsername, projectName)
    return jsonify(res)
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
