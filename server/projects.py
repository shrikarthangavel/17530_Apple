import pymongo
from pymongo.mongo_client import MongoClient

'''
Structure of Project entry:
Project = {
    'name': name,
    'members': [member1, member2, ...],
    'hardware': [hardwareset1, hardwareset2, ...]
    'checkedout': [#, #, ...]
}
'''

uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"

def getProject(name):
    client = MongoClient(uri)
    db = client['Projects']
    col = db[name]
    doc = col.find_one({}, {'_id': 0})

    client.close()

    return doc

def getProjects():
    client = MongoClient(uri)
    db = client['Projects']
    colList = db.list_collection_names()

    print(colList)

    client.close()
    
    return

def project_exists():
    client = MongoClient(uri)
    db = client['Projects']
    colList = db.list_collection_names()
    client.close()
    
    # Return True if the project_id exists, False otherwise
    return project_id in colList
    
    


def create_new_project(project_id, project_name, username):
    """
    Inserts a new project into the database.
    """
    # Define the new project structure
    client = MongoClient(uri)
    db = client['Projects']
    new_project = {
        'name': project_name,
        'members': [username],  # Initial member who created the project
        'hardware': [],
        'checkout': []
    }
    
    # Insert the new project document into the MongoDB collection
    project_col = db[project_id]
    project_col.insert_one(new_project)
    client.close()
    return {"success": "Project created successfully.", "project_id": project_id}

def getUserProjects(username):
    client = MongoClient(uri)
    usersDB = client['Users']
    projectsDB = client['Projects']
    userCol = usersDB[username]
    user = userCol.find_one({'username': username})
    projectsList = user['projects']
    projectCollection = {}

    for p in projectsList:
        projectCollection[p] = projectsDB[p]

    client.close()
    #print(projectCollection)

    return projectCollection

getUserProjects('erictu')
print(getProject('Project 1'))