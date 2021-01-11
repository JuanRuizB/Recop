# Import libraries
import numpy as np
from firebase import firebase
from sklearn.metrics.pairwise import pairwise_distances
import joblib

firebase = firebase.FirebaseApplication("https://recommended-app-bffe3.firebaseio.com/", None)


## Modelo de filtrado colaborativo usuario-usuario
#--------------------------------------------------------------------------------------------------------------

def predict(ratings, similarity):
    mean_user_rating = ratings.mean(axis=1)
    #Usamos np.newaxis para que mean_user_rating tenga el mismo formato que ratings
    ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
    pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    return pred

def filtrado_colab(data_notas, data_interes, data_gustado, data_suspensos, data_sinCursar, userNum, cont_op):
    

    user_notas_similarity = pairwise_distances(data_notas, metric='cosine')
    user_prediction_notas = predict(data_notas, user_notas_similarity)

    user_interes_similarity = pairwise_distances(data_interes, metric='cosine')
    user_prediction_interes = predict(data_interes, user_interes_similarity)

    user_gustado_similarity = pairwise_distances(data_gustado, metric='cosine')
    user_prediction_gustado = predict(data_gustado, user_gustado_similarity)

    user_suspensos_similarity = pairwise_distances(data_suspensos, metric='cosine')
    user_prediction_suspensos = predict(data_suspensos, user_suspensos_similarity)
    
    data_prediction_total = np.zeros((1,cont_op))

    for y in range(cont_op):
        if(data_sinCursar[0][y] == 1):
            data_prediction_total[0][y] = user_prediction_notas[userNum][y] + user_prediction_gustado[userNum][y] + user_prediction_interes[userNum][y] + user_prediction_suspensos[userNum][y]

    return data_prediction_total
            

def algoritmo(user,universidad, grado):

    ref = firebase.get('users','')
    cont_users = 0
    matriz_users = []
    userNum = 0
    for key in ref:
        if(user == key):
            userNum = cont_users
            matriz_users.append(1)
        
       

        if(universidad == firebase.get('users/' + key + '/universidad','')):
            if(grado == firebase.get(('users/' + key + '/grado'),'')):
                matriz_users.append(1)
                cont_users += 1
            else:
                matriz_users.append(0)
        else:
            
            matriz_users.append(0)


    ref2 = firebase.get('asignaturas/' + universidad + '/' + grado + '/codigosPrimero', '')
    ref3 = firebase.get('asignaturas/' + universidad + '/' + grado + '/codigosSegundo', '')
    ref4 = firebase.get('asignaturas/' + universidad + '/' + grado + '/codigosTercero', '')
    ref5 = firebase.get('asignaturas/' + universidad + '/' + grado + '/codigos', '')
    

    asignaturas = []
    cont = 0
    cont_op = 0

    for key in ref5:
        asignaturas.append(key)
        cont += 1
    cont_op = cont
    for key in ref4:
        cont += 1
    for key in ref3:
        cont += 1
    for key in ref2:
        cont += 1
    

    data_notas = np.zeros((cont_users,cont))
    data_interes = np.zeros((cont_users,cont))
    data_gustado = np.zeros((cont_users,cont))
    data_suspensos = np.zeros((cont_users,cont))

    data_sinCursar = np.zeros((1,cont_op))
    classifier_aux = np.zeros((1,cont_op))
    classifier = ["", "", "", "", "", "", "", "", "", "",]
    
    k = 0
    for key in ref:
        i = 0
        if(matriz_users[k] == 1):
            results = firebase.get('asignaturas/' + key + '/primero','')
            for key2, value in results.items():
                if(value == ''):
                    data_notas[k, i] = 0.0
                    data_interes[k, i] = 0.0
                    data_gustado[k, i] = 0.0
                    data_suspensos[k, i] = 0.0
                else:
                    data_notas[k, i] = float(value[0:2])
                    data_interes[k, i] = float(value[2])
                    data_gustado[k, i] = float(value[3])
                    data_suspensos[k, i] = float(value[4])*(-1)
                    
                i += 1
            
            results = firebase.get('asignaturas/' + key + '/segundo','')

            for key2, value in results.items():
                if(value == ''):
                    data_notas[k, i] = 0.0
                    data_interes[k, i] = 0.0
                    data_gustado[k, i] = 0.0
                    data_suspensos[k, i] = 0.0
                else:
                    data_notas[k, i] = float(value[0:2])
                    data_interes[k, i] = float(value[2])
                    data_gustado[k, i] = float(value[3])
                    data_suspensos[k, i] = float(value[4])*(-1)
                i += 1

            results = firebase.get('asignaturas/' + key + '/tercerocuarto','')
            

            aux = 0
            aux_b = False
            for key2, value in results.items():
                
                if(value == ''):
                    if(k == userNum):
                        data_sinCursar[0][aux] = 1;
                    
                    data_notas[k, i] = 0.0
                    data_interes[k, i] = 0.0
                    data_gustado[k, i] = 0.0
                    data_suspensos[k, i] = 0.0
                else:
                    if(value == '00000'):
                        if(k == userNum):
                            data_sinCursar[0][aux] = 1;
                    data_notas[k, i] = float(value[0:2])
                    data_interes[k, i] = float(value[2])
                    data_gustado[k, i] = float(value[3])
                    data_suspensos[k, i] = float(value[4])*(-1)
                for key3 in ref4:
                    if(key3 == key2):
                        aux_b = True
                if(aux_b == True):
                    aux_b = False
                else:
                    aux += 1
                i += 1
        k += 1

    data_prediction_total = filtrado_colab(data_notas, data_interes, data_gustado, data_suspensos, data_sinCursar, userNum, cont_op)


    for y in range(cont_op):
        if(data_sinCursar[0][y] == 1):
            classifier_aux[0][y] = data_prediction_total[0][y]
    


    for x in range(10):
        result = np.where(classifier_aux == np.amax(classifier_aux))
        listOfCordinates = list(zip(result[0], result[1]))
        classifier[x] = asignaturas[listOfCordinates[0][1]]
        classifier_aux[0][listOfCordinates[0][1]] = 0

    print(classifier)
    joblib.dump(classifier, 'classifier.joblib')

# algoritmo('TAqZxyN0sUZEYME3R6KF5yW1QVM2', 'Universidad de Cádiz', 'Grado en Ingeniería Informática')