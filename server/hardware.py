from flask import Blueprint, jsonify
from pymongo import MongoClient

# Define a blueprint for hardware-related routes
hardware_bp = Blueprint('hardware', __name__)

# MongoDB connection
uri = "mongodb+srv://andreswearden:1234@cluster0.zteylph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["HardwareSet"]
HWSet1 = "HWSet1"
HWSet2 = "HWSet2"
def create_hw_db(hw_set_name):
    collection = db[hw_set_name]
    initial_data = {
        "name": hw_set_name,
        "capacity": 100,  # Total capacity of the hardware set
        "available": 200  # Initially, all units are available
    }
    # Insert only if it does not already exist
    if collection.count_documents({"name": HWSet1}) == 0:
        collection.insert_one(initial_data)
def update_hardware_quantity(hwname, qty):
    # Your database update logic here, e.g., decrementing the hardware quantity
    # Replace with your actual database call
    print(f"Checking out {qty} of {hwname}")
    return True  # Return True if the database update was successful

@hardware_bp.route('/api/check-out', methods=['POST'])
def check_out():
    data = request.get_json()
    hwname = data['name']
    quantity = data['quantity']

    if update_hardware_quantity(hwname, quantity):
        return jsonify({"status": "success", "message": "Quantity updated"}), 200
    else:
        return jsonify({"status": "error", "message": "Failed to update"}), 500

@hardware_bp.route('/hardware/<name>/available', methods=['GET'])
def get_available(name):
    # Ensure both hardware databases are initialized
    create_hw_db(HWSet1)
    create_hw_db(HWSet2)
    
    # Access both hardware collections
    collection1 = db[HWSet1]
    collection2 = db[HWSet2]
    
    # Find the hardware set in both HWSet1 and HWSet2
    hardware_set1 = collection1.find_one({"name": name})
    hardware_set2 = collection2.find_one({"name": name})
    
    # Prepare response data for both sets
    response_data = None
    
    if hardware_set1:
        response_data = {"available": hardware_set1["available"]}
    else:
        response_data = {"available": hardware_set2["available"]} if hardware_set2 else None


    
    
    # Return the response with status 200 if either set is found, otherwise 404
    if hardware_set1 or hardware_set2:
        return jsonify(response_data), 200
    else:
        return jsonify({"error": "Hardware set not found"}), 404


def getCapacity(name):
    pass

def checkOut(qty):
    pass

def checkIn(qty):
    pass
