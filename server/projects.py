import pymongo
from pymongo.mongo_client import MongoClient

import users
import hardware

'''
Structure of Project entry:
ProjectName = {
    'name': name,
    'members': [member1, member2, ...],
    'hardware': {"hardwareset1" : #, 
                "hardwareset2": #, ...},
    'description': "string description",
    'identifier': "unique string identifier"
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

def findIdentifier(identifier):
    client = MongoClient(uri)
    db = client['Projects']
    collectionsList = db.list_collection_names()

    for collectionName in collectionsList:
        col = db[collectionName]
        doc = col.find_one({'identifier': identifier})
        if doc:
            client.close()
            return True
        
    client.close()
    return False

def getProjectsList():
    client = MongoClient(uri)
    db = client['Projects']
    colList = db.list_collection_names()

    print(colList)

    client.close()
    
    return  
    
def create_new_project(project_name, username, description, identifier): #added description and identifier fields


    client = MongoClient(uri)
    """
    Creates a dict of all HW currently available
    """
    db = client['Hardware']
    hwColList = db.list_collection_names()
    HWDict = {}
    for hw in hwColList:
        HWDict[hw] = 0
    """
    Inserts a new project into the database.
    """
    # Define the new project structure
    new_project = {
        'name': project_name,
        'members': [username],  # Initial member who created the project
        'hardware': HWDict,
        'description': description,
        'identifier': identifier
    }
    
    # Insert the new project document into the MongoDB collection
    db = client['Projects']
    project_col = db[project_name]
    project_col.insert_one(new_project)
    client.close()
    return {"success": "Project created successfully.", "project_name": project_name}

def getUserProjects(username):
    client = MongoClient(uri)
    usersDB = client['Users']
    projectsDB = client['Projects']
    userCol = usersDB[username]
    user = userCol.find_one({'username': username})
    projectsList = user['projects']
    returnList = {}
    #print(projectsList)

    for p in projectsList:
        projDoc = projectsDB[p].find_one({}, {'_id': 0})
        returnList[p] = projDoc

    client.close()

    return returnList

def getProjectName(identifier):
    client = MongoClient(uri)
    projDB = client['Projects']
    collectionsList = projDB.list_collection_names()

    for collectionName in collectionsList:
        col = projDB[collectionName]
        doc = col.find_one({'identifier': identifier})
        if doc:
            return doc['name']

    return None


#adds new user to project's member list
#returns 1 if user is already in project
#returns 0 otherwise
def addNewUser(username, project):
    client = MongoClient(uri)
    projDB = client['Projects']
    col = projDB[project]
    proj = col.find_one({'name': project})
    membersList = proj['members']
    for name in membersList:
        if name == username:
            return 1      #user already in project

    col.update_one(
        {'name': project},
        {'$addToSet': {'members': username}}
    )
    client.close()
    users.joinProject(project, username)
    return 0

def removeUser(username, project):
    client = MongoClient(uri)
    projDB = client['Projects']
    col = projDB[project]
    col.update_one(
        {'name': project},
        {'$pull': {'members': username}}
    )

    #if no users left in project, call disbandProject()
    proj = col.find_one({'name': project})
    membersList = proj['members']
    client.close()
    if not membersList:
        disbandProject(project)

    return 0

#fully executes if no members are left in the project to return all hardware
def disbandProject(project):
    client = MongoClient(uri)
    projDB = client['Projects']
    col = projDB[project]
    proj = col.find_one({'name': project})
    hardwareDict = proj['hardware']

    for hwName, qty in hardwareDict.items():
        if qty > 0:
            hardware.checkIn(hwName, qty, project)

    col.drop()
    client.close()
    return 0

