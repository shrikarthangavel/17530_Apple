userDB = {"user1" : "pass1", "user2" : "pass2"}

def findUser(username):
    for existingUsername in userDB:
        if existingUsername == username:
            return True
    return False

def createUser(username, password):
    if findUser(username) == False:
        userDB.update({username : password})
    else:
        print(username, "already registered")

# will likely pull DB from mongo
# check for existing users
# create user if doesn't exist
# fail if does exist
# update DB on mongo if success

print(userDB)
createUser("user3", "pass3")
print(userDB)
createUser("user1", "null")
print(userDB)