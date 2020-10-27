import React, {useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import 'firebase/auth'
import { useUser} from 'reactfire'
import firebase from 'firebase';
import cancel from '../assets/img/cancel.svg'


const useStyles = makeStyles((theme) => ({
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorM: {
    color: theme.palette.primary.dark,
  },
  buttRED: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(2, 2, 2),
  },
  buttBLUE: {
    background: theme.palette.secondary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(2, 2, 2),
  },
}));



const Register = () => {
  const classes = useStyles();
  var user  = useUser<firebase.User>();
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState('')
    const [openL, SetOpenL] = useState(true);
    const [openD, SetOpenD] = useState(false);
    const [aux, SetAux] = useState(true);
    

  const handleChangeD = () => {
    SetOpenD(!openD)
  }
  const handleChange = () => {
    SetOpenL(!openL)
  }

    const submit = async () => {
      SetAux(false)
      var promise = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          
          setErrors("La dirección de correo electrónico ya está siendo utilizada por otra cuenta.");
          handleChangeD();

         
        } 
        if(errorCode === 'auth/weak-password'){
          setErrors('La contraseña es muy debil.')
          handleChangeD()
        }
        if (errorCode === 'auth/invalid-email') {
          
          setErrors("Dirección de correo electrónico invalida.");
          handleChangeD();

        }

      });
      if(!(promise == null)){
        handleChange();
      }

      }

      const logout = async () => {
        await firebase.auth().signOut();
    }

      if(!(user == null) && aux){
        logout()
        SetAux(false)
      }


    const confirm = () => {
      var bool = Boolean(false)
      if (!email) {
        
        bool = Boolean(true);
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      ) {
        bool = Boolean(true);
      }
      if(password.length < 8 ){
        bool = Boolean(true);
      }
      if(!(password === password2)){
        bool = Boolean(true);
      }
      return (bool);
    }
    

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Grid >
                <Dialog open={openD} onClose={handleChangeD}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  <img src={cancel} alt="Sidebar media" width='80%'/>
                    <Typography variant="h5" color="error" className={classes.errorM}>
                    {errors}
                    </Typography>
                    </Grid>
                    <Button 
                    type="submit"
                    
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleChangeD}
                    >
                      Cerrar
                    </Button>
                  </DialogContent>
                </Dialog>
        </Grid>
      

      <Dialog open={openL} disableBackdropClick={true} onClose={handleChange}>

  
      <DialogContent>
     

        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Crear cuenta
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   
       
  </Grid>
  
    
  
  
<TextField
      variant="outlined"
      margin="normal"
      value={email}
      required
      fullWidth
      id="email"
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
      onChange={ (ev) => setEmail(ev.target.value) }
    />

 

    <TextField
      variant="outlined"
      margin="normal"
      value={password}
      required
      fullWidth
      name="password"
      label="Contraseña"
      type="password"
      id="password"
      onChange={(ev) => setPassword(ev.target.value)}
    />


    <TextField
      variant="outlined"
      margin="normal"
      value={password2}
      required
      fullWidth
      name="password"
      label="Confirmar contraseña"
      type="password"
      helperText="Si no son iguales no se activara el boton de continuar."
      id="password"
      onChange={(ev) => setPassword2(ev.target.value)}
    />



         
  </DialogContent>
  <DialogActions>
  <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item >
    <Button
      type="submit"
      
      variant="contained"
      className={classes.buttRED}
      component={RouterLink} to={routes.baseUrl.path}
    >
          Volver

    </Button>
    </Grid>

    <Grid item >
    <Button
      type="submit"
      
      variant="contained"
      
      
      className={classes.buttBLUE}
      disabled={confirm()}
      onClick={submit}
      
    >
          Continuar

    </Button>
    </Grid>
 
    
    </Grid>
       
    </DialogActions>
          
    </Dialog>
    </Grid>

  );
}

export default Register
