from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json

from . import users #efdfsdfds
from . import projects
from . import hardware

app = Flask(__name__, static_folder="build", static_url_path="/")
CORS(app)
uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"

# @app.route("/",defaults = {"path" : ''})
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(app.static_folder+ '/' +path):  # Heroku ?
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')
    
@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/home/getProject', methods=['Post'])
def getProject():
    name = request.json['name']
    proj = projects.getProject(name)

    return jsonify(proj)

@app.route('/home/getAllProjects', methods=['Post'])
def getUserProjects():
    username = request.json['username']
    projectsDB = projects.getUserProjects(username)
    return jsonify(projectsDB)

@app.route('/home/getAllHardware')
def getHardware():
    list = hardware.getHardwareList()
    return jsonify(list)

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

@app.route('/create_project', methods=['POST']) #Creates project!
def create_project():
    
    data = request.json
    project_name = data.get('project_name')
    username = data.get('username')
    identifier = data.get('identifier')
    description = data.get('description')
    
    # Check if project already exists
    if projects.getProject(project_name):
        return jsonify({"error": "Project with this Name already exists."}), 400
    
    if projects.findIdentifier(identifier):
        return jsonify({"error": "Project with this ID already exists."}), 400
    
    result = projects.create_new_project(project_name, username, description, identifier) 
    users.joinProject(project_name, username)
    return jsonify(result)
    

@app.route('/project/addUser', methods=['Post'])
def addUser():
    newUsername = request.json['username']
    projectIdentifier = request.json['identifier']

    if not users.findUser(newUsername):
        return jsonify(3)
    if not projects.findIdentifier(projectIdentifier):
        return jsonify(2)
    
    projectName = projects.getProjectName(projectIdentifier)

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

@app.route('/hardware/<name>/available')
def getAvailable(name):
    qty = hardware.getAvailible(name)
    return jsonify(qty)

@app.route('/home/<username>')      # fixes refreshing page, forces page to jsonified?
def usernameRoute(username):
    return app.send_static_file("index.html")

@app.route('/project/checkIn', methods=['Post'])
def checkIn():
    project = request.json['project']
    hardwareName = request.json['hardware']
    qty = request.json['qty']

    result = hardware.checkIn(hardwareName, qty, project)
    return jsonify(result)

@app.route('/project/checkOut', methods=['Post'])
def checkOut():
    project = request.json['project']
    hardwareName = request.json['hardware']
    qty = request.json['qty']

    result = hardware.checkOut(hardwareName, qty, project)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
