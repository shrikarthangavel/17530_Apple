import pymongo
from pymongo.mongo_client import MongoClient

'''
Structure of Hardware entry:
Hardware = {
    'name': name,
    'availability': #,
    'capacity': # 
}
'''



def getAvailible(name):
    uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        db = client["Hardware"]
        collection = db[name]

        availability_doc = collection.find_one({}, {"availability": 1, "_id": 0})
        
        if availability_doc and "availability" in availability_doc:
            return availability_doc["availability"]
        else:
            print("Availability field not found in Hardware collection.")
            return None

    except Exception as e:
        print(e)

    finally:
        client.close()
    

def getCapacity(name):
    uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        db = client["Hardware"]
        collection = db[name]

        availability_doc = collection.find_one({}, {"capacity": 1, "_id": 0})
        
        if availability_doc and "capacity" in availability_doc:
            return availability_doc["capacity"]
        else:
            print("Capacity field not found in Hardware collection.")
            return None

    except Exception as e:
        print(e)

    finally:
        client.close()

def checkOut(name, qty, projectname):
    uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        currentlyAvailable = getAvailible(name)
        db = client["Hardware"]
        collection = db[name]

        projDB = client["Projects"]
        projCollection = projDB[projectname]

        availability_doc = collection.find_one({}, {"availability": 1, "_id": 0})
        project_doc = projCollection.find_one({}, {"hardware" : 1, "_id": 0})
        
        if availability_doc and "availability" in availability_doc:
            if currentlyAvailable >= qty:
                newAvailability = currentlyAvailable - qty
                result = collection.update_one({}, {"$set": {"availability": newAvailability}})
                print(f"Checked out {qty} items. New capacity is {newAvailability}.")
                if project_doc and "hardware" in project_doc:
                    currentAmount = project_doc["hardware"][name]
                    resultx = projCollection.update_one({}, {"$set": {f"hardware.{name}": currentAmount + qty}})
                else:
                    print("Unable to find the specified project")
                return newAvailability
            else:
                print(f"Not enough items available. Only {currentlyAvailable} items available.")
                return None
        else:
            print("Availability field not found in Hardware collection.")
            return None

    except Exception as e:
        print(e)

    finally:
        client.close()

def checkIn(name, qty, projectname):
    uri = "mongodb+srv://user:pass2@cluster0.ebypffv.mongodb.net/"
    client = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
        currentlyAvailable = getAvailible(name)
        db = client["Hardware"]
        collection = db[name]

        projDB = client["Projects"]
        projCollection = projDB[projectname]

        availability_doc = collection.find_one({}, {"availability": 1, "_id": 0})
        project_doc = projCollection.find_one({}, {"hardware" : 1, "_id": 0})
        
        if availability_doc and "availability" in availability_doc and project_doc and "hardware" in project_doc:
            newAvailability = currentlyAvailable + qty
            currentAmount = project_doc["hardware"][name]
            if currentAmount >= qty:
                resultx = projCollection.update_one({}, {"$set": {f"hardware.{name}": currentAmount - qty}})
                result = collection.update_one({}, {"$set": {"availability": newAvailability}})
                print(f"Checked in {qty} items. You now have {currentAmount - qty} items.")
                return newAvailability
            else:
                print(f"You do not have enough items. Only {currentAmount} items in your project.")
                return None
        else:
            print("Availability or project field not found in Hardware collection.")
            return None

    except Exception as e:
        print(e)

    finally:
        client.close()

