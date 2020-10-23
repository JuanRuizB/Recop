import React, {useState} from 'react'
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
  
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
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

const Primero = () => {
  const classes = useStyles();
  var user  = useUser<firebase.User>();
    
  const confirm = () => {
    var bool = Boolean(false)
    firebase.database().ref('users/' + user.uid + '/primero/').on('value', function(snapshot)
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
    Asignaturas de primero
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   

       
    
      <Asignatura id={"21714006"} nombre={"Introducción a la Programacion"} curso={"primero"}/>
      <Asignatura id={"21714005"} nombre={"Informática General"} curso={"primero"} />
      <Asignatura id={"21714010"} nombre={"Matemática Discreta"} curso={"primero"} />
      <Asignatura id={"21714004"} nombre={"Fundamentos de Estructura de Computadores"} curso={"primero"} />
      <Asignatura id={"21714002"} nombre={"Estadística"} curso={"primero"} />
      <Asignatura id={"21714009"} nombre={"Cálculo"} curso={"primero"} />
      <Asignatura id={"21714008"} nombre={"Álgebra"} curso={"primero"} />
      <Asignatura id={"21714001"} nombre={"Organización y Gestión de Empresas"} curso={"primero"} />
      <Asignatura id={"21714007"} nombre={"Metodología de la Programación"} curso={"primero"} />
      <Asignatura id={"21714003"} nombre={"Fundamentos Físicos y Electrónicos de la Informática"} curso={"primero"} />
      
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
      disabled={confirm()}
      className={classes.submit}
      component={RouterLink} to={routes.segundo.path}
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

export default Primero
