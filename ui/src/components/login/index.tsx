import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ForgotPass from './Forgot_Pass'
import { Link as RouterLink } from 'react-router-dom'
import 'firebase/auth'
import {useFirebaseApp} from 'reactfire'
import routes from '../../routes/routes'
import cancel from '../../assets/img/cancel.svg'


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
    height: 48,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'white',
    padding: '0 30px',
    margin: theme.spacing(3, 1, 3),

  },
  errorM: {
    color: theme.palette.primary.dark,
  },
}));



function SignIn() {
  const [openL, SetOpenL] = useState(false);
  const classes = useStyles();
  const [errors, setErrors] = useState('')
  const [openD, SetOpenD] = useState(false);

  const handleChangeD = () => {
    SetOpenD(!openD)
}
  
      const handleChange = () => {
          SetOpenL(!openL)
      }
  
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
  
      const firebase = useFirebaseApp();
  
      
  
      
  
      const login = async () =>{
        
        var promise = await firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
          var errorCode = error.code;
          if(errorCode === 'auth/invalid-email') {
            setErrors("Dirección de correo electrónico incorrecta.");
            handleChangeD();
          }

          if(errorCode === 'auth/user-not-found') {
            setErrors("No existe cuenta con este email");
            handleChangeD();
          }

          if(errorCode === 'auth/wrong-password') {
            setErrors("Contraseña incorrecta");
            handleChangeD();
          }

        });
      }


  return (
    

<>

  <Button
    type="submit"
    
    variant="contained"
    className={classes.buttRED}
    onClick={handleChange}
    >
      Iniciar sesión
  </Button>

  <Grid xs>
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
                    className={classes.buttRED}
                    onClick={handleChangeD}
                    >
                      Cerrar
                    </Button>
                  </DialogContent>
                </Dialog>
        </Grid>

  <Dialog open={openL} onClose={handleChange}>

  
  <DialogContent>
<Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Iniciar sesión
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
      required
      fullWidth
      name="password"
      label="Contraseña"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={(ev) => setPassword(ev.target.value)}
    />
    
  </Grid>
    </DialogContent>

    <DialogActions>
    <Grid container  justify="space-between" >
      
    
      <Grid item xs={5}>
        <ForgotPass/>
      </Grid>
      <Grid item xs={5}>
        <Link component={RouterLink} to={routes.registerCont.path} onClick={handleChange} variant="body2">
          {"¿No tienes una cuenta? Registrate"}
        </Link>
      </Grid>
      
      <Grid item xs >
      <Button
      type="submit"
     
      variant="contained"
      className={classes.buttRED}
      onClick={login}
    >
      Iniciar sesión
    </Button>
    </Grid>

    </Grid>
    </DialogActions>
  
  </Dialog>
  </>
      
  );
}



export default SignIn;