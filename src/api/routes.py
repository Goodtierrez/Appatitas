"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Animal
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#ANIMAL ENDPOINT -------------------------------------------------------------------
#GET
@api.route('/animal', methods=['GET'])
def get_animals():
    allAnimals = Animal.query.all()
    result = [element.serialize() for element in allAnimals]
    return jsonify(result), 200

#POST
@api.route('/animal', methods=['POST'])
def post_animal():

    data = request.get_json()

    animal = Animal(nombre=data['nombre'], raza=data['raza'], edad=data['edad'], genero=data['genero'], descripcion=data['descripcion'])

    db.session.add(animal)
    db.session.commit()

    response_body = {"msg": "El animal fué añadido exitosamente"}
    return jsonify(response_body), 200