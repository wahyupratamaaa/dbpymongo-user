from flask import Flask, jsonify, request ,render_template
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

# Konfigurasi URI MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydatabase"
mongo = PyMongo(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json
        mongo.db.users.insert_one(data)
        return jsonify({"message": "User added successfully"}), 201
    except Exception as e: 
        return jsonify({"message": "Failed to add user", "error": str(e)}), 500

@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        users = mongo.db.users.find()
        users_list = []
        for user in users:
            user['_id'] = str(user['_id'])
            users_list.append(user)
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch users", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)







