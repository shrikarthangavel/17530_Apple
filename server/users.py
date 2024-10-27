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
def findUser(username, db):
    colList = db.list_collection_names()
    if username in colList:
        return True
    return False

#return 0 if success
#return 1 if username already exists
def createUser(username, password):
    client = MongoClient(uri)
    db = client["Users"]

    if findUser(username, db) == False:
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
    client = MongoClient(uri)
    db = client["Users"]

    if not findUser(username, db):
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

