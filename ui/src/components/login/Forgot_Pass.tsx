import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import 'firebase/auth'
import {useFirebaseApp} from 'reactfire'
import cancel from '../../assets/img/cancel.svg'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    errorM: {
      color: theme.palette.primary.dark,
    },
  }));


function ForgotPass() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [openF, SetOpenF] = useState(false);
    const [openD, SetOpenD] = useState(false);
    const [errors, setErrors] = useState('')
    const firebase = useFirebaseApp();

    const forgot = async () =>{
        var promise = await firebase.auth().sendPasswordResetEmail(email).catch(function(error){
          var errorCode = error.code;
          if(errorCode === 'auth/invalid-email') {
            setErrors("Dirección de correo electrónico invalida.");
            handleChangeD();
          }

          if(errorCode === 'auth/user-not-found') {
            setErrors("No existe cuenta con este email");
            handleChangeD();
          }

        });
        if(!(promise == null)){
          handleChange()
        }
        
    }

    const handleChange = () => {
        SetOpenF(!openF)
    }

    const handleChangeD = () => {
      SetOpenD(!openD)
    }

    return (
    <Container component="main" >
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

    <div >

    <Link href="#" variant="body2" onClick={handleChange}>
          ¿Olvidaste tu contraseña? Recuperar contraseña
    </Link>

  <Dialog open={openF} onClose={handleChange}>

  
  <DialogContent>

  <Typography component="h1" variant="h5">
    Escribe el correo electrónico de la cuenta: 
  </Typography>
          
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Correo electrónico"
      name="email"
      autoComplete="email"
      autoFocus
      onChange={ (ev) => setEmail(ev.target.value) }
    />

    </DialogContent>

    <DialogActions>
    
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      onClick={forgot}
    >
      enviar
    </Button>
      
    </DialogActions>
  </Dialog>
  </div>

</Container>
    );
}



export default ForgotPass