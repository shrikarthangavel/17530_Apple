from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import json
import os
import datetime

app = Flask(__name__, static_folder="./build", static_url_path="/")
CORS(app)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/home/management/checkout/<int:projectID>')
def getProjectInfo(projectID):
    #if methods == "Get":
    # Simulated project data
    project_data = {
        "projectID": projectID,
        "name": f"Project {projectID}",
        "description": f"Description for project {projectID}",
        "status": "In Progress",
        "last_updated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "inc" : 8
        }
    
    #if methods == "Post":


    return jsonify(project_data)  # Return data as JSON

@app.route('/test', methods=['Post'])
def testIncrement():
    print("connected")
    int = request.json['int']
    int += 1

    return jsonify(int)
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
