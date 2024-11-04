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

uri ="mongodb+srv://andreswearden:1234@cluster0.zteylph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

    return projectCollection

def createNewProject(projectName):
    client = MongoClient(uri)
    Project = {"name": projectName,
               "members": ["name1", "name2"],
               "hardware": {
                   "HWSet1": 0,
                   "HWSet2": 0
               }}
    
    projDB = client['Projects']
    col = projDB[projectName]
    col.insert_one(Project)

    client.close()

createNewProject("Project 2")