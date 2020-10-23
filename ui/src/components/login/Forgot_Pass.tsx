import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import 'firebase/auth'
import {useFirebaseApp, useUser} from 'reactfire'


const useStyles = makeStyles((theme) => ({
    
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function ForgotPass() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [openF, SetOpenF] = useState(false);
    const firebase = useFirebaseApp();

    const forgot = async () =>{
        await firebase.auth().sendPasswordResetEmail(email);
        SetOpenF(!openF)
    }

    const handleChange = () => {
        SetOpenF(!openF)
    }

    return (
    <Container component="main" >
    <CssBaseline />


    <div >

    <Link href="#" variant="body2" onClick={handleChange}>
          ¿Olvidaste tu contraseña? Recuperar contraseña
    </Link>

  <Dialog open={openF} onClose={handleChange}>

  
  <DialogContent>

  <Typography component="h1" variant="h5">
    Escribe el correo electronico de la cuenta: 
  </Typography>
          
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
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
      send
    </Button>
      
    </DialogActions>
  </Dialog>
  </div>

</Container>
    );
}



export default ForgotPass