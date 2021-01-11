import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, MenuItem } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import firebase from 'firebase'
import Register from './Register'


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttRED: {
    background: theme.palette.secondary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(2, 0, 2),
  },
  buttBLUE: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(2, 0, 2),
  },
}));

const StyledCard = styled(Card)`
  
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 150px;
  width: 900px;
  height: 500px;
`


const RegisterCont = () => {
  const classes = useStyles();

  var user = firebase.auth().currentUser;



  
  if((user != null)){
    // eslint-disable-next-line no-labels
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    var email = user.email;
    var userId = user.uid;
  }

  const [name, setName] = useState('');
    const [universidad, setUniversidad] = useState('');
    const [grado, setGrado] = useState('');
    const [curso, setCurso] = useState('');

    const writeUserData = () =>{
      firebase.database().ref('users/' + userId ).set({
        nombre: name,
        curso: curso,
        email: email,
        grado: grado,
        universidad: universidad,
        

      })

      firebase.database().ref('recomendaciones/' + userId ).set({
        especialidadRec: '',
        asigRecom: {
          1: '',
          2: '', 
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
        }
      })
    }

    const confirm = () => {
      var bool = Boolean(false)
      
      if (!name) {
        
        bool = Boolean(true);
      }
      if(!universidad){
        bool = Boolean(true);
      }
      if(!grado){
        bool = Boolean(true);
      }
      if(!curso){
        bool = Boolean(true);
      }
      
      return (bool);
    }
    

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Register/>
      <Grid container justify='center' alignItems='center' >
      <StyledCard>
        <CardContent>
        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Datos Personales
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   
       
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="name"
      label="Nombre Completo"
      name="name"
      autoFocus
      onChange={ (ev) => setName(ev.target.value) }
    />
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      select
      name="universidad"
      label="Universidad"
      value={universidad}

      id="universidad"
      onChange={(ev) => setUniversidad(ev.target.value)}
    >
      <MenuItem key={"Universidad de Cádiz"} value={"Universidad de Cádiz"}> Universidad de Cádiz </MenuItem>
      <MenuItem key={"Universidad de Sevilla"} value={"Universidad de Sevilla"}> Universidad de Sevilla </MenuItem>
      </TextField>
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      select
      name="grado"
      label="Grado"
      value={grado}

      id="grado"
      onChange={(ev) => setGrado(ev.target.value)}
    >
      <MenuItem key={"Grado en Ingeniería Informática"} value={"Grado en Ingeniería Informática"}> Grado en Ingeniería Informática </MenuItem>
      <MenuItem key={"Grado en Ingeniería Industrial"} value={"Grado en Ingeniería Industrial"}> Grado en Ingeniería Industrial </MenuItem>
      
      </TextField>

      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      select
      name="curso"
      label="Curso"
      value={curso}

      id="curso"
      onChange={(ev) => setCurso(ev.target.value)}
    >
      <MenuItem key={"Primero"} value={"Primero"}> Primero </MenuItem>
      <MenuItem key={"Segundo"} value={"Segundo"}> Segundo </MenuItem>
      <MenuItem key={"Tercero"} value={"Tercero"}> Tercero </MenuItem>
      <MenuItem key={"Cuarto"} value={"Cuarto"}> Cuarto </MenuItem>
      <MenuItem key={"Carrera finalizada"} value={"Carrera finalizada"}> Carrera finalizada </MenuItem>
      </TextField>



  </Grid>
     <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item >
    <Button
      type="submit"
      
      variant="contained"
      color="secondary"
      className={classes.buttRED}
      component={RouterLink} to={routes.register.path}
    >
          Volver

    </Button>
    </Grid>

    <Grid item >
    <Button
      type="submit"
      
      variant="contained"
      color="primary"
      className={classes.buttBLUE}
      disabled={confirm()}
      onClick={writeUserData}
      component={RouterLink} to={routes.data.path}
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

export default RegisterCont
