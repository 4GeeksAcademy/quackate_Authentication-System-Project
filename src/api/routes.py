"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

#Create flask app
api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None :
        return jsonify({"msg": "Wrong email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/registration', methods=['POST'])
def signUp():
    username = request.json.get("username", None)
    firstname = request.json.get("firstname", None)
    lastname = request.json.get("lastname", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "Seems like you may have an account already! Try to sign in!"}), 401
    
    user = User(
        username=username,
        firstname=firstname,
        lastname=lastname,
        email=email,
        password=password
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Registration Successful!"}), 200

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    id = get_jwt_identity()

    user = User.query.filter_by(id = id).first()

    print(f"Username from JWT: {user}")

    if user is None:
        return jsonify({"message": "User not found"}), 404

    firstname = user.firstname
    
    message = {
        "message": "Welcome back, " + str(firstname)
    }
    
    return jsonify(message)
