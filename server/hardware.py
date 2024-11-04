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
def createDB(hw_set_name):
    collection = db[HWSet1]
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
    createDB(HWSet1)  # Ensure database is initialized
    collection = db[HWSet1]
    hardware_set = collection.find_one({"name": name})
    if hardware_set:
        return jsonify({"available": hardware_set["available"]}), 200
    else:
        return jsonify({"error": "Hardware set not found"}), 404

def getCapacity(name):
    pass

def checkOut(qty):
    pass

def checkIn(qty):
    pass
