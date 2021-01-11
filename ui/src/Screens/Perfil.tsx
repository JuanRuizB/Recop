import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, MenuItem, Dialog, DialogContent } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import firebase from 'firebase'
import { useUser} from 'reactfire'
import cancel from '../assets/img/cancel.svg'
import check from '../assets/img/check.svg'


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorM: {
    background: theme.palette.secondary.main,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #bdbdbd',
    color: 'white',
    padding: '0 30px',
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
  list:{
    position: 'relative',
    overflow: 'auto',
    width: '100%',
  }
}));

const StyledCard = styled(Card)`
  
  margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 580px;
`


const Perfil = () => {
  const classes = useStyles();

  var user = useUser<firebase.User>();
 
 

    const [name, setName] = useState('');
    const [email, setEmail] = useState(user.email);
    const [newEmail, setNewEmail] = useState(user.email);
    const [universidad, setUniversidad] = useState('');
    const [grado, setGrado] = useState('');
    const [curso, setCurso] = useState('');
    const [errors, setErrors] = useState('')
    const [bool, setBool] = useState(false);
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [newpassword2, setNewpassword2] = useState('')
    const [openL, setOpenL] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [openX, setOpenX] = useState(false);
    const [correct, setCorrect] = useState('')
    const [mensaje, setMensaje] = useState(false);
    

  const handleChangeD = () => {
    setOpenD(!openD)
  }
  const handleChangeL = () => {
    setOpenL(!openL)
  }
  const handleChangeP = () => {
    setOpenP(!openP)
  }
  const handleChangeX = () => {
    setOpenX(!openX)
  }


    if(bool === false){
        firebase.database().ref('users/' + user.uid + '/curso').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setCurso(cadena);
        });

        firebase.database().ref('users/' + user.uid + '/grado').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setGrado(cadena);
        });

        firebase.database().ref('users/' + user.uid + '/nombre').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setName(cadena);
        });

        firebase.database().ref('users/' + user.uid + '/universidad').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setUniversidad(cadena);
        });
        setBool(true);
    }

     const writeUserData = () => {
 
        if(!(user.email == null)){
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                password
            );
            user.reauthenticateWithCredential(credential).then(function() {

              if(!(newEmail == null) && !(email === newEmail)){
                user.updateEmail(newEmail).then(function() {

                  setMensaje(true);
                  setCorrect("Cambios guardados correctamente");
                  handleChangeX();
                  handleChangeL();
                  setEmail(newEmail);
                    firebase.database().ref('users/' + user.uid ).update({
                      email: newEmail,
                    })
                  }).catch(function(error) {
                    var errorCode = error.code;
                    if (errorCode === 'auth/email-already-in-use') {
                  
                        setErrors("La dirección de correo electrónico ya está siendo utilizada por otra cuenta.");
                        handleChangeD();
              
                      } 
                      if (errorCode === 'auth/invalid-email') {
                  
                        setErrors("Dirección de correo electrónico invalida.");
                        handleChangeD();
              
                      }
        
                  });
                }

                if(!(newpassword === '')){
                  user.updatePassword(newpassword).then(function() {
                    setMensaje(true);
                    setCorrect("Contraseña actualizada correctamente");
                    handleChangeX();
                    handleChangeP();
                    setPassword('');
                    setNewpassword('');
                    setNewpassword2('');
                  }).catch(function(error){
                    var errorCode = error.code;
                    if (errorCode === 'auth/weak-password') {
                  
                        setErrors("La nueva contraseña es muy debil.");
                        handleChangeD();
              
                      } 
                      
                  })
                }


            }).catch(function(error) {
              var errorCode = error.code;
              if (errorCode === 'auth/wrong-password') {
          
                setErrors("Contraseña incorrecta.");
                handleChangeD();
      
              }
              if (errorCode === 'auth/invalid-email') {
          
                setErrors("Dirección de correo electrónico invalida.");
                handleChangeD();
      
              }
            });
        }
            
        firebase.database().ref('users/' + user.uid ).update({
            nombre: name,
            curso: curso,
            grado: grado,
            universidad: universidad,
          }).then(function(){
            if(mensaje === false){
              setCorrect("Cambios guardados correctamente");
              handleChangeX();
              handleChangeL();
            }
            setMensaje(false);
            
          })


      }


    const confirm = () => {
      var bool = Boolean(false)
      
      if (!name) { 
        bool = Boolean(true);
      }
      if (!newEmail) { 
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

    const confirmPassword = () => {
      var bool = Boolean(false)

      if(newpassword.length < 8 ){
        bool = Boolean(true);
      }
      if(!(newpassword === newpassword2)){
        bool = Boolean(true);
      }
      return (bool);
    }


    

  return (
    <Grid container component="main" >
      <CssBaseline />

      <Grid >
                <Dialog open={openP} onClose={handleChangeP}>
                <DialogContent >
                <Grid container justify="center" direction="column" alignItems="center">
                <Grid item >
                  <Typography component="h1" variant="h5">
                  Cambiar contraseña
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
                      required
                      fullWidth
                      type="password"
                      value={password}
                      label="Contraseña"
                      autoFocus
                      onChange={ (ev) => setPassword(ev.target.value) }
                      />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      value={newpassword}
                      label="Nueva contraseña"
                      autoFocus
                      onChange={ (ev) => setNewpassword(ev.target.value) }
                      />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      value={newpassword2}
                      label="Confirma nueva contraseña"
                      helperText="Si no son iguales no se activara el boton de continuar."
                      autoFocus
                      onChange={ (ev) => setNewpassword2(ev.target.value) }
                      />
                      <Button 
                    type="submit"
                    disabled={confirmPassword()}
                    variant="contained"
                    className={classes.buttBLUE}
                    onClick={writeUserData}
                    >
                      Guardar
                    </Button>
                  </DialogContent>
                </Dialog>
        </Grid>
      
      <Grid >
                <Dialog open={openD} onClose={handleChangeD}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  <img src={cancel} alt="Sidebar media" width='80%'/>
                    <Typography variant="h5" color="error" >
                    {errors}
                    </Typography>
                    </Grid>
                    
                  </DialogContent>
                </Dialog>
        </Grid>

        <Grid >
                <Dialog open={openX} onClose={handleChangeX}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  <img src={check} alt="Sidebar media" width='80%'/>
                    <Typography variant="h5" color="primary" >
                    {correct}
                    </Typography>
                    </Grid>
                    
                  </DialogContent>
                </Dialog>
        </Grid>
        

        <Grid >
                <Dialog open={openL} onClose={handleChangeL}>
                <DialogContent >
                <Grid container justify="center" direction="column" alignItems="center">
                <Grid item >
                  <Typography component="h1" variant="h5">
                  Vuelve a introducir tu contraseña.
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
                      required
                      fullWidth
                      type="password"
                      value={password}
                      label="Password"
                      autoFocus
                      onChange={ (ev) => setPassword(ev.target.value) }
                      />
                      <Button 
                    type="submit"
                    
                    variant="contained"
                    className={classes.buttBLUE}
                    onClick={writeUserData}
                    >
                      Continuar
                    </Button>
                  </DialogContent>
                </Dialog>
        </Grid>

      <Grid container justify='center' alignItems='center' >
      <StyledCard className={classes.list}>
        <CardContent>
        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Perfil
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
      value={newEmail}
      label="Email"
      autoFocus
      onChange={ (ev) => setNewEmail(ev.target.value) }
    />
       
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      value={name}
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

<Grid item >
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.buttBLUE}
      onClick={handleChangeP}
    >
          Cambiar contraseña

    </Button>
    </Grid>


  </Grid>
     <Grid container direction='row' justify="space-between" alignItems="center">     
    <Grid item >
    <Button
      type="submit"
      
      variant="contained"
      color="secondary"
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
      color="primary"
      className={classes.buttBLUE}
      disabled={confirm()}
      onClick={handleChangeL}
    >
          Guardar cambios

    </Button>
    </Grid>
    </Grid>

        </CardContent>
      </StyledCard>
          
      </Grid>
      
    </Grid>
  );
}

export default Perfil
