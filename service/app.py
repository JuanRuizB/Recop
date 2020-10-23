from flask import Flask, request, jsonify, make_response
from firebase import firebase
from flask_restplus import Api, Resource, fields
import joblib
import numpy as np
import sys
from model_generator import algoritmo
from flask_cors import CORS



flask_app = Flask(__name__)
CORS(flask_app)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Recomendador asignaturas", 
		  description = "Recomienda asignaturas segun las asignaturas cursadas")

name_space = app.namespace('recommendation', description='Recommendation APIs')

model = app.model('Recommendation params', 
					{'User': fields.Float(required = True, 
				  							   description="Usuario", 
    					  				 	   help="id del usuario")})


classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

			
	def get(self):
		
		try: 
			# userKey = request.json
			# algoritmo(str(userKey))
			response = jsonify({
				"statusCode": 200,
				"status": "Recommendation made",
				"result":  classifier
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})

	@app.expect(model)		
	def post(self):
		
		try: 
			userKey = request.json
			algoritmo(str(userKey))
			response = jsonify({
				"statusCode": 200,
				"status": "Recommendation made",
				"result":  classifier
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})