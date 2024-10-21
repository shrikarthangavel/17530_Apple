from flask import Flask, send_from_directory,request,json
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
    return 'Project ID from backend: %d' % (projectID)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)