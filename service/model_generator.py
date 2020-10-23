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

def filtrado_colab(data_notas, data_interes, data_gustado, data_suspensos, data_sinCursar, userNum):
    

    user_notas_similarity = pairwise_distances(data_notas, metric='cosine')
    user_prediction_notas = predict(data_notas, user_notas_similarity)

    user_interes_similarity = pairwise_distances(data_interes, metric='cosine')
    user_prediction_interes = predict(data_interes, user_interes_similarity)

    user_gustado_similarity = pairwise_distances(data_gustado, metric='cosine')
    user_prediction_gustado = predict(data_gustado, user_gustado_similarity)

    user_suspensos_similarity = pairwise_distances(data_suspensos, metric='cosine')
    user_prediction_suspensos = predict(data_suspensos, user_suspensos_similarity)
    
    data_prediction_total = np.zeros((1,47))

    for y in range(47):
        if(data_sinCursar[0][y] == 1):
            data_prediction_total[0][y] = user_prediction_notas[userNum][y+24] + user_prediction_gustado[userNum][y+24] + user_prediction_interes[userNum][y+24] + user_prediction_suspensos[userNum][y+24]

    return data_prediction_total
            

def algoritmo(user):

    ref = firebase.get('users','')
    cont_users = 0
    userNum = 0
    for key in ref:
        if(user == key):
            userNum = cont_users
        cont_users += 1
    data_notas = np.zeros((cont_users,71))
    data_interes = np.zeros((cont_users,71))
    data_gustado = np.zeros((cont_users,71))
    data_suspensos = np.zeros((cont_users,71))
    asignaturas = ["21714031",
          "21714030",
          "21714027",
          "21714026",
          "21714029",
          "21714028",
          "21714024",
          "21714025",
          "21714035",
          "21714036",
          "21714039",
          "21714037",
          "21714038",
          "21714032",
          "21714034",
          "21714033",
          "21714040",
          "21714047",
          "21714043",
          "21714044",
          "21714041",
          "21714046",
          "21714042",
          "21714045",
          "21714048",
          "21714053",
          "21714049",
          "21714051",
          "21714052",
          "21714050",
          "21714054",
          "21714055",
          "21714056",
          "21714058",
          "21714080",
          "21714061",
          "21714057",
          "21714062",
          "21714063",
          "21714085",
          "21714075",
          "21714076",
          "21714077",
          "21714078",
          "21714079",
          "21714081",
          "21714082"]

    data_sinCursar = np.zeros((1,47))
    classifier_aux = np.zeros((1,47))
    classifier = ["", "", "", "", "", "", "", "", "", "",]

    k = 0
    for key in ref:
        i = 0
        results = firebase.get('users/' + key + '/primero','')
        for key2, value in results.items():
            
            data_notas[k, i] = float(value[0:2])
            data_interes[k, i] = float(value[2])
            data_gustado[k, i] = float(value[3])
            data_suspensos[k, i] = float(value[4])*(-1)
            i += 1

        results = firebase.get('users/' + key + '/segundo','')

        for key2, value in results.items():
            
            
            data_notas[k, i] = float(value[0:2])
            data_interes[k, i] = float(value[2])
            data_gustado[k, i] = float(value[3])
            data_suspensos[k, i] = float(value[4])*(-1)
            i += 1

        results = firebase.get('users/' + key + '/tercerocuarto','')
        for key2, value in results.items():

            if(value == ''):
                if(k == userNum):
                    data_sinCursar[0][i-24] = 1;
                
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
        k += 1

    data_prediction_total = filtrado_colab(data_notas, data_interes, data_gustado, data_suspensos, data_sinCursar, userNum)

    for y in range(47):
        if(data_sinCursar[0][y] == 1):
            classifier_aux[0][y] = data_prediction_total[0][y]
    


    for x in range(10):
        result = np.where(classifier_aux == np.amax(classifier_aux))
        listOfCordinates = list(zip(result[0], result[1]))
        classifier[x] = asignaturas[listOfCordinates[0][1]]
        classifier_aux[0][listOfCordinates[0][1]] = 0



    joblib.dump(classifier, 'classifier.joblib')




