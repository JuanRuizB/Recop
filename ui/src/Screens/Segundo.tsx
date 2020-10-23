import React from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import Asignatura from '../components/asignatura'
import firebase from 'firebase';
import { useUser} from 'reactfire'

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

  }
}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;
min-height: 150px;
height: 580px;
  
`

const Segundo = () => {
  const classes = useStyles();
  var user  = useUser<firebase.User>();
 
  const confirm = () => {
    var bool = Boolean(false)
    firebase.database().ref('users/' + user.uid + '/segundo/').on('value', function(snapshot)
    {
     snapshot.forEach(function(childSnapshot) {
       var childData = childSnapshot.val();
       if(childData == ''){
         bool = Boolean(true);
       }
   });
    });

    return (bool);
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
    Asignaturas de segundo
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   
       
       
    
      <Asignatura id={"21714023"} nombre={"Sistemas Operativos"} curso={"segundo"}/>
      <Asignatura id={"21714013"} nombre={"Inteligencia Artificial"} curso={"segundo"}/>
      <Asignatura id={"21714019"} nombre={"Arquitectura de Computadores"} curso={"segundo"}/>
      <Asignatura id={"21714021"} nombre={"Redes de Computadores"} curso={"segundo"}/>
      <Asignatura id={"21714017"} nombre={"Programación Orientada a Objetos"} curso={"segundo"}/>
      <Asignatura id={"21714012"} nombre={"Ingeniería del Software"} curso={"segundo"}/>
      <Asignatura id={"21714011"} nombre={"Base de Datos"} curso={"segundo"}/>
      <Asignatura id={"21714016"} nombre={"Estructuras de Datos No Lineales"} curso={"segundo"}/>
      <Asignatura id={"21714014"} nombre={"Análisis de Algoritmos y Estructuras de Datos"} curso={"segundo"}/>
      <Asignatura id={"21714022"} nombre={"Sistemas Distribuidos"} curso={"segundo"}/>
      
      </Grid>
     <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item xs>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      component={RouterLink} to={routes.data.path}
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
      className={classes.submit}
      disabled={confirm()}
      component={RouterLink} to={routes.tercerocuarto.path}
    >
          Continuar

    </Button>
    </Grid>
    </Grid>

        </CardContent>
      </StyledCard>
          
      </Grid>
      
    </Grid>
  );
}

export default Segundo
