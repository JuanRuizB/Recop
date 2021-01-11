import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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
  letras: {
    color: theme.palette.primary.dark,
  }


}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;

  min-height: 150px;
  width: 900px;
  height: 580px;
  
`


const Recomendaciones = () => {
  const classes = useStyles();
  const [data, setData] = useState<string[]>([""]);




  const [asignaturasCod, setAsignaturasCod] = useState<string[]>([""]);

  const [asignaturasNom, setAsignaturasNom] = useState<string[]>([""]);

  const [especialidadNom, setEspecialidadNom] = useState<string[]>([""])

  const [isLoading, setIsLoading] = useState(false);
  const [bool, setBool] = useState(false);
  const [universidad, setUniversidad] = useState('');
    const [grado, setGrado] = useState('');
  const [especialidad, setEspecialidad] = useState("");
  const [espCont, setEspCont] = useState<number[]>([0, 0 ,0 ,0 ,0])

  const firebase = useFirebaseApp();
  var userKey = useUser<firebase.User>();

      
  if(bool === false){


    firebase.database().ref('users/' + userKey.uid + '/grado').once('value').then(function(snapshot)
    {
        var grado = snapshot.val() || '';
        setGrado(grado)

        firebase.database().ref('users/' + userKey.uid + '/universidad').once('value').then(function(snapshot)
    {
        var universidad = snapshot.val() || '';
        setUniversidad(universidad)


        firebase.database().ref('asignaturas/'+ universidad + '/' + grado + '/codigos/').once('value').then(function(snapshot)
      {
       var cont = 0;
       var aux1 = [""]
       var aux2 = [""]

       
       
        snapshot.forEach(function(datasnapshot){
          
          if(datasnapshot.key != null){
            
            aux1[cont] = datasnapshot.key
            aux2[cont] = datasnapshot.val()
            cont += 1
            
          }
        })

        setAsignaturasCod(aux1)
        setAsignaturasNom(aux2) 
        
    });


    firebase.database().ref('asignaturas/'+ universidad + '/' + grado + '/especialidades/').once('value').then(function(snapshot)
      {
       var cont = 0;
       var aux1 = [""]

       
       
        snapshot.forEach(function(datasnapshot){
          
          if(datasnapshot.key != null){
            
            aux1[cont] = datasnapshot.key
            cont += 1
            
          }
        })

        setEspecialidadNom(aux1)
        
    });

    });

    });


    firebase.database().ref('recomendaciones/' + userKey.uid + '/especialidadRec/').once('value').then(function(snapshot)
     {
       if(!(snapshot.val() === null)){
       var cadena = snapshot.val();
        
       setEspecialidad(cadena);
       }
       
    });
    firebase.database().ref('recomendaciones/' + userKey.uid + '/asigRecom/').once('value').then(function(snapshot)
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

  const confirmPrimero = () => {
    var bool = Boolean(true)
    firebase.database().ref('asignaturas/' + userKey.uid + '/primero/').on('value', function(snapshot)
     {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData === ''){
          bool = Boolean(false);
        }
        if(childData.length < 5){
          bool = Boolean(false);
        }
    });
     });
  
    return (bool);
  }

  const confirmSegundo = () => {
    var bool = Boolean(true)
    firebase.database().ref('asignaturas/' + userKey.uid + '/segundo/').on('value', function(snapshot)
     {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData === ''){
          bool = Boolean(false);
        }
        if(childData.length < 5){
          bool = Boolean(false);
        }
    });
     });
  
    return (bool);
  }

  const confirmTercero = () => {
    var bool = Boolean(true)
    firebase.database().ref('asignaturas/' + userKey.uid + '/tercerocuarto/').on('value', function(snapshot)
     {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.length < 5 && childData !== ''){
          bool = Boolean(false);
        }
    });
     });
  
    return (bool);
  }

  if(!(data[0] === "")){
    firebase.database().ref('recomendaciones/' + userKey.uid + '/asigRecom').update({
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

  if(!(especialidad === "")){
    firebase.database().ref('recomendaciones/' + userKey.uid).update({
      especialidadRec: especialidad,
    })
  }

  const asigNom = (num: number) => {
    var index = asignaturasCod.indexOf(data[num]);
    return asignaturasNom[index]
  }


  const handlePredictClick = () => {
    setIsLoading(true);   

    ;(async () => {
      const newData = await getData(userKey.uid, universidad, grado)
      setData(newData.result)
      setIsLoading(false);
      
    })()
    
  }

  const handlePredictClickEspecialidad = () => {
    setIsLoading(true);
  

    if((data[0] === "")){
    ;(async () => {
      const newData = await getData(userKey.uid, universidad, grado)
      setData(newData.result)
      
    data.forEach(function(value){
      var aux = asignaturasCod.indexOf(value);
      var aux_2 = [0, 0 , 0, 0, 0]
      if(aux < 8){
        aux_2[0] += 1
      }

      if(aux > 7 && aux < 16){
        aux_2[1] += 1
      }

      if(aux > 15 && aux < 24){
        aux_2[2] += 1
      }

      if(aux > 23 && aux < 32){
        aux_2[3] += 1
      }

      if(aux > 31 && aux < 40){
        aux_2[4] += 1
      }
      setEspCont(aux_2)
    })
    var maximo = Math.max(espCont[0], espCont[1], espCont[2], espCont[3], espCont[4])

    
    
    setEspecialidad(especialidadNom[espCont.indexOf(maximo)]);
    setIsLoading(false);
  })()
}else{
  var aux_2 = [0, 0 , 0, 0, 0]
    data.forEach(function(value){
      var aux = asignaturasCod.indexOf(value);
      

      if(aux < 8){
        aux_2[0] += 1
      }

      if(aux > 7 && aux < 16){
        aux_2[1] += 1
      }

      if(aux > 15 && aux < 24){
        aux_2[2] += 1
      }

      if(aux > 23 && aux < 32){
        aux_2[3] += 1
      }

      if(aux > 31 && aux < 40){
        aux_2[4] += 1
      }
      setEspCont(aux_2)
    })
    var maximo = Math.max(espCont[0], espCont[1], espCont[2], espCont[3], espCont[4])

    
    
    setEspecialidad(especialidadNom[espCont.indexOf(maximo)]);
    setIsLoading(false);
  }

  
    
    
    
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

  {!(confirmPrimero() && confirmSegundo() && confirmTercero()) && 
<> 
<Grid>
        <Card className={classes.resto}>
          <CardContent>
            <Typography>
              Tienes los datos de alguna asignatura incomletos o alguna asignatura de primero o segundo sin rellenar,
               por favor rellena con 0 si aun no la has cursado.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  </>}

  {(confirmPrimero() && confirmSegundo() && confirmTercero()) && 
<> 
    {(data[0] === "") && 
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


    {!(data[0] === "") && 
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


{!(especialidad === "") &&
      <Grid item >
        <Card >
          <CardContent>
            <Typography variant="h4" align="center" className={classes.letras}>
              {"La especialidad que más se ajusta a tu perfil es " + especialidad}
            </Typography>
            </CardContent>
            </Card>
            </Grid >
      }
          
          </>}
    
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
      onClick={handlePredictClickEspecialidad}>
    { isLoading ? 'Haciendo algunos calculos...' : 'Recomendar especialidad' }

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
    { isLoading ? 'Haciendo algunos calculos...' : 'Recomendar optativas' }

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
