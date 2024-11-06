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

def getProjectsList():
    client = MongoClient(uri)
    db = client['Projects']
    colList = db.list_collection_names()

    print(colList)

    client.close()
    
    return  
    
def create_new_project(project_name, username):


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
            return 1

    membersList.append(username)
    proj = {"name": proj['name'],
            "members": membersList,
            "hardware": proj['hardware']}
    col.replace_one({}, proj)
    client.close()
    return 0

#print(addNewUser("erictu", "Project 1"))
#print(getUserProjects('erictu'))
create_new_project("test", "erictu")