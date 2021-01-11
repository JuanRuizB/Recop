import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property
from flask import Flask, request, jsonify, make_response
from firebase import firebase
from flask_restplus import Api, Resource, fields
import joblib
import numpy as np
import sys
from model_generator import algoritmo
from flask_cors import CORS
import firebase_admin
from firebase_admin import auth


# source bin/activate
# export GOOGLE_APPLICATION_CREDENTIALS="/mnt/c/Users/wen/Desktop/TFG/service-account-file.json"
# FLASK_APP=app.py flask run


flask_app = Flask(__name__)
CORS(flask_app)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Recomendador asignaturas", 
		  description = "Recomienda asignaturas segun las asignaturas cursadas")

name_space = app.namespace('recommendation', description='Recommendation APIs')

model_rec = app.model('Recommendation params', 
					{'User': fields.String(required = True, 
				  							   description="Usuario", 
    					  				 	   help="id del usuario"),
					'Universidad': fields.String(required = True, 
				  							   description="Universidad", 
    					  				 	   help="universidad del usuario"),							  
					'Grado': fields.String(required = True, 
				  							   description="Grado", 
    					  				 	   help="grado del usuario"),
												  
												  
												  })

model = app.model('Elimination params', 
					{'User': fields.String(required = True, 
				  							   description="Usuario", 
    					  				 	   help="id del usuario"),										  
												  
												  })

model_email = app.model('Modify params', 
					{'User': fields.String(required = True, 
				  							   description="Usuario", 
    					  				 	   help="id del usuario"),
					'Email': fields.String(required = True, 
				  							   description="Email", 
    					  				 	   help="email del usuario"),
					'Password': fields.String(required = True, 
				  							   description="Password", 
    					  				 	   help="password del usuario")})

default_app = firebase_admin.initialize_app()

classifier = joblib.load('classifier.joblib')

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)
	def put(self):
		
		try: 
			userKey = request.json
			data = [val for val in userKey.values()]
			
			auth.delete_user(data[0])
			response = jsonify({
				"statusCode": 200,
				"status": "Elimination made",
				"result": "Usuario eliminado con exito"
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make the action",
				"error": str(error)
			})

	@app.expect(model_email)
	def patch(self):
		
		try: 
			userKey = request.json
			data = [val for val in userKey.values()]
			
			if(data[1] != ''):
				auth.update_user(
					data[0],
					email=data[1],
				)
				response = jsonify({
					"statusCode": 200,
					"status": "Modification made",
					"result": "Email actualizado con exito"
				})
			if(data[2] != ''):
				auth.update_user(
					data[0],
					password=data[2],
				)
				response = jsonify({
					"statusCode": 200,
					"status": "Modification made",
					"result": "Contraseña actualizada con exito"
				})

			
			
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make the action",
				"error": str(error)
			})

	@app.expect(model_rec)		
	def post(self):
		
		try: 
			userKey = request.json
			data = [val for val in userKey.values()]
			algoritmo(str(data[0]), str(data[1]), str(data[2]))
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