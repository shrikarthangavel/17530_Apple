import pymongo
from pymongo.mongo_client import MongoClient

'''
Structure of User entry:
User = {
    'username': username,
    'password': password,
    'projects': [project1_ID, project2_ID, ...]
}
'''

uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"

#checks if user is already in db, assumes username === collection name
def findUser(username):
    client = MongoClient(uri)
    db = client["Users"]
    colList = db.list_collection_names()
    if username in colList:
        client.close()
        return True
    client.close()
    return False

#return 0 if success
#return 1 if username already exists
def createUser(username, password):
    userExists = findUser(username)

    client = MongoClient(uri)
    db = client["Users"]

    if userExists == False:
        newUser = {'username': username, 'password': password, 'projects': []}
        col = db[username]
        col.insert_one(newUser)
        print(username, "account created")
        client.close()
        return 0
    else:
        print(username, "already registered")
        client.close()
        return 1
    
#return 0 if success
#return 1 if login does not exist
def login(username, password):
    userExists = findUser(username)
    client = MongoClient(uri)
    db = client["Users"]

    if not userExists:
        print("login not found")
        client.close()
        return 1

    col = db[username]
    query = {"username": username, "password": password}

    if col.count_documents(query) > 0:
        print("found login")
        return 0
    else:
        print("login not found")
        return 1

def joinProject(projectName, username):
    client = MongoClient(uri)
    db = client["Users"]
    col = db[username]
    user = col.find_one({'username': username})
    projectList = user['projects']
    projectList.append(projectName)
    user = {"username": user['username'],
            "password": user['password'],
            "projects": projectList}
    col.replace_one({}, user)
    client.close()

    return

def leaveProject(project, username):
    client = MongoClient(uri)
    db = client["Users"]
    col = db[username]
    user = col.find_one({'username': username})
    projectList = user['projects']
    projectList.remove(project)
    user = {"username": user['username'],
            "password": user['password'],
            "projects": projectList}
    col.replace_one({}, user)
    client.close()

    return
