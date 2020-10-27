import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase'
import { Card, CardContent, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import {useFirebaseApp, useUser} from 'reactfire'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import { getData } from '../services/api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  list:{
    position: 'relative',
    overflow: 'auto',
    width: '100%',

  },

  gold: {
    background: 'linear-gradient(45deg, #EABE3F 30%, #FFD700 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'black',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },

  silver: {
    background: 'linear-gradient(45deg, #848482 30%, #BEBEBE 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'black',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },

  cobre: {
    background: 'linear-gradient(45deg, #D07131 30%, #B87333 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'black',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },

  resto: {
    background: 'linear-gradient(45deg, #e0e0e0 30%, #90a4ae 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'black',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },


}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;
min-height: 150px;
width: 800px;
height: 470px;
  
`


const Recomendaciones = () => {
  const classes = useStyles();
  const [data, setData] = useState<string[]>(["", "", "", "", "", "", "", "", "", "",]);
  const [asignaturasCod, setAsignaturasCod] = useState<string[]>(["21714031",
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
  "21714082"]);

  const [asignaturasNom, setAsignaturasNom] = useState<string[]>([
  "Sistemas Inteligentes",
  "Reconocimiento de Patrones",
  "Teoría de Autómatas y Lenguajes Formales",
  "Procesadores de Lenguajes",
  "Percepción",
  "Aprendizaje Computacional",
  "Complejidad Computacional",
  "Modelos de Computación",

  "Diseño Basado en Microprocesadores",
  "Diseño de Computadores Empotrados",
  "Diseño de Redes de Computadores",
  "Técnicas de Diseño de Computadores",
  "Administración y Seguridad de Redes de Computadores",
  "Arquitectura de Computadores Paralelos y Distribuidos",
  "Diseño Avanzado de Arquitectura de Computadores",
  "Programación Paralela y Distribuida",

  "Diseño de Sistemas Software",
  "Implementación e Implantación de Sistemas Software",
  "Calidad del Software",
  "Dirección y Gestión de Proyectos Software",
  "Ingeniería de Requisitos",
  "Evolución del Software",
  "Verificación y Validación de Software",
  "Metodologías y Procesos Software",

  "Desarrollo de Sistemas Hipermedia",
  "Administración de Bases de Datos",
  "Programación en Internet",
  "Ingeniería de Sistemas de Información",
  "Sistemas de Información en la Empresa",
  "Recuperación de la Información",
  "Tecnologías Avanzadas de Bases de Datos",
  "Tecnologías de Inteligencia de Negocio",

  "Administración de Servidores",
  "Calidad de los Sistemas Informáticos",
  "Interacción Persona-Ordenador",
  "Ingeniería Web",
  "Interconexión de Redes",
  "Internet y Negocio Electrónico",
  "Programación Web",
  "Virtualización de Sistemas",

  "Ampliación de Lógica Matemática",
  "Control Estadístico de Calidad y Fiabilidad",
  "Control por Computador",
  "Diseño de Videojuegos ",
  "Inglés Técnico",
  "Métodos Numéricos para la Ingeniería Informática",
  "Técnicas Avanzadas de Optimización"]);

  const [isLoading, setIsLoading] = useState(false);
  const [bool, setBool] = useState(false);
  const firebase = useFirebaseApp();
  var userKey = useUser<firebase.User>();
    
  const handlePredictClick = () => {
    setIsLoading(true);   
    ;(async () => {
      const newData = await getData(userKey.uid)
      setData(newData.result)
      setIsLoading(false);
      
    })()
    
    
  }
  if(bool === false){
    firebase.database().ref('users/' + userKey.uid + '/recomendaciones/').once('value').then(function(snapshot)
     {
       var cadena = [snapshot.child("1").val(), snapshot.child("2").val() ,
       snapshot.child("3").val(), snapshot.child("4").val(), 
       snapshot.child("5").val(), snapshot.child("6").val(),
       snapshot.child("7").val(), snapshot.child("8").val(),
       snapshot.child("9").val(), snapshot.child("10").val()]
      
        setData(cadena)

       
       
       setBool(true);
    });
  }

  if(!(data[0] == "")){
    firebase.database().ref('users/' + userKey.uid + '/recomendaciones').set({
      1: (data[0]),
      2: (data[1]),
      3: (data[2]),
      4: (data[3]),
      5: (data[4]),
      6: (data[5]),
      7: (data[6]),
      8: (data[7]),
      9: (data[8]), 
      10: (data[9])
    })
  }

  const asigNom = (num: number) => {
    var index = asignaturasCod.indexOf(data[num]);
    return asignaturasNom[index]
  }

  
  return (
    <Grid container component="main"  >
      <CssBaseline />
      <Grid container justify='center' alignItems='center' >
      <StyledCard className={classes.list}>
        <CardContent>
        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
        Recomendaciones
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   

    {(data[0] == "") && 
      <Grid>
        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              ¿A que esperas? ¡Obtén tus primeras recomendaciones!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    }

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

    {!(data[0] == "") && 
      <Grid>
        <Card className={classes.gold}>
          <CardContent>
            <Typography>
              {data[0] + " " + asigNom(0)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.silver}>
          <CardContent>
            <Typography>
              {data[1] + " " + asigNom(1)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.cobre}>
          <CardContent>
            <Typography>
              {data[2] + " " + asigNom(2)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[3] + " " + asigNom(3)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[4] + " " + asigNom(4)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[5] + " " + asigNom(5)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[6] + " " + asigNom(6)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[7] + " " + asigNom(7)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[8] + " " + asigNom(8)}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              {data[9] + " " + asigNom(9)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

     }
          

    
      </Grid>
     <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item xs>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      component={RouterLink} to={routes.baseUrl.path}
    >
          Volver

    </Button>
    </Grid>

    <Grid item xs>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={isLoading}
      className={classes.submit}
      onClick={handlePredictClick}>
    { isLoading ? 'Haciendo algunos calculos...' : 'Recomendar' }

    </Button>
    </Grid>
    </Grid>

        </CardContent>
      </StyledCard>
          
      </Grid>
      
    </Grid>
  );
}

export default Recomendaciones
