import React, {useState} from 'react'
import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Dialog, DialogContent, ListItem, TextField, MenuItem } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'
import routes from '../routes/routes'
import firebase from 'firebase'
import check from '../assets/img/check.svg'
import { putData } from '../services/api';
import { patchData } from '../services/api';
import Autocomplete from '@material-ui/lab/Autocomplete';



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
  buttList: {
    background: theme.palette.secondary.main,
    border: 0,
    borderRadius: 3,
    height: 40,
    boxShadow: '0 3px 5px 2px #212121',
    color: 'black',
    padding: '0 30px',
    margin: theme.spacing(2, 0, 2),
  },
  list:{
    position: 'relative',
    overflow: 'auto',
    width: '100%',
  },
  letras: {
    color: theme.palette.primary.dark,
  }
}));

const StyledCard = styled(Card)`
  
  margin-top: 10px;
  min-height: 150px;
  width: 900px;
  height: 580px;
`


const Administrador = () => {
  const classes = useStyles();

 
 


    const [bool, setBool] = useState(true);
    const [openL, setOpenL] = useState(false);
    const [openX, setOpenX] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [openQ, setOpenQ] = useState(false);
    const [openO, setOpenO] = useState(false);
    const [correct, setCorrect] = useState('')
    const [data, setData] = useState<string[]>([]);
    const [dataUID, setDataUID] = useState<string[]>([]);
    const [Uid, setUid] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newpassword, setNewpassword] = useState('')
    const [newpassword2, setNewpassword2] = useState('')
    const [universidad, setUniversidad] = useState('');
    const [grado, setGrado] = useState('');
    const [curso, setCurso] = useState('');
    const [valueEmail, setValueEmail] = React.useState<string | null>(null);

    



  const handleChangeL = (email: any) => {
    setUid(dataUID[data.indexOf(email)])
    setOpenL(!openL)
    setEmail(email)
    setNewEmail(email)
  }


  const handleChangeX = () => {
    setOpenX(!openX)
  }

  const handleChangeO = () => {
    setOpenO(!openO)
  }

  const handleChangeP = () => {
    setOpenP(!openP)
  }

  const handleChangeQ = () => {
    firebase.database().ref('users/' + Uid + '/curso').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setCurso(cadena);
        });

        firebase.database().ref('users/' + Uid + '/grado').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setGrado(cadena);
        });

        firebase.database().ref('users/' + Uid + '/nombre').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setName(cadena);
        });

        firebase.database().ref('users/' + Uid + '/universidad').once('value').then(function(snapshot)
        {
            var cadena = snapshot.val() || '';
            setUniversidad(cadena);
        });
    setOpenQ(!openQ)
  }


    if(bool === true){
        firebase.database().ref('users/').on('value', function(snapshot)
        {
          var aux_e = [""]
          var aux_uid = [""]
          aux_uid.pop()
          aux_e.pop()
            snapshot.forEach(function(childSnapshot) {
                aux_e.push(childSnapshot.val().email);
                if(!(childSnapshot.key == null)){
                  aux_uid.push(childSnapshot.key);
                }
            });
            
          setData(aux_e)
          setDataUID(aux_uid)
        });
       
        
        
        setBool(false);
    }

    const DataItem = (props: any) => {
      return <ListItem className={classes.buttList} button onClick={() => handleChangeL(props.value)}>{props.value}</ListItem>;
    }
    
    const DataList = (props: any) => {
      const data = props.data;
      const listItems = data.map((data: any) =>
        <DataItem key={data.toString()} value={data} />
      );
      return (
        <>
          {listItems}
        </>
      );
    }

    const eliminar = () =>{
     
      setOpenL(!openL)
      ;(async () => {
        const newData = await putData(Uid)
        setCorrect(newData.result)
      })()

      firebase.database().ref('users/' + Uid).remove();
      setBool(true)
      handleChangeX()
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

    const update = () => {
   
      firebase.database().ref('users/' + Uid ).update({
        nombre: name,
        curso: curso,
        grado: grado,
        universidad: universidad,
      })
      setCorrect("Datos actualizados correctamente")
      if(!(newEmail == email)){
        ;(async () => {
          const newData = await patchData(Uid, newEmail, "")
          setCorrect(newData.result)
        })()
        firebase.database().ref('users/' + Uid ).update({
          email: newEmail
        })
      }
      handleChangeX()
    }

    const changePassword = () =>{
      handleChangeO();
      ;(async () => {
        const newData = await patchData(Uid, "", newpassword)
        setCorrect(newData.result)
      })()
      handleChangeX()
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
    
  return (
    <Grid container component="main" >
      <CssBaseline />

  <Grid >
        <Dialog open={openQ} onClose={handleChangeQ}>
        <DialogContent >
                    
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
                      onClick={handleChangeO}
                    >
                          Cambiar contraseña

                    </Button>
                    </Grid>


                 
                    <Grid container direction='row' justify="space-between" alignItems="center">     
                    <Grid item >
                    <Button
                      type="submit"
                      
                      variant="contained"
                      color="secondary"
                      className={classes.buttRED}
                      onClick={handleChangeQ}
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
                      onClick={update}
                    >
                          Guardar cambios

                    </Button>
                    </Grid>
                    </Grid>
    
                    
                  </DialogContent>
                </Dialog>
        </Grid>

        <Grid >
                <Dialog open={openO} onClose={handleChangeO}>
                <DialogContent >
                <Grid container justify="center" direction="column" alignItems="center">
                <Grid item >
                  <Typography component="h1" variant="h5">
                  Cambiar contraseña
                </Typography>
                </Grid>
                    
                </Grid>
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
                    onClick={changePassword}
                    >
                      Continuar
                    </Button>
                  </DialogContent>
                </Dialog>
        </Grid>

      
      <Grid >
                <Dialog open={openP} onClose={handleChangeP}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  
                    <Typography variant="h5" >
                    {"¿Esta seguro de que desea eliminar el ususario " + email + "?"}
                    </Typography>
                    </Grid>
                    <Grid container justify="space-between" direction="row" alignItems="center">
                <Grid item>
                    <Button
                      type="submit"
                      
                      variant="contained"
                      color="secondary"
                      className={classes.buttRED}
                      onClick={handleChangeP}
                    >
                        Volver

                    </Button>

                    </Grid>

                    <Grid item>
                    <Button
                      type="submit"
                      
                      variant="contained"
                      color="secondary"
                      className={classes.buttBLUE}
                      onClick={eliminar}
                    >
                      Continuar

                    </Button>

                    </Grid>
                    </Grid>
                    
                  </DialogContent>
                </Dialog>
        </Grid>


        <Grid >
                <Dialog open={openL} onClose={handleChangeL}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  
                    <Typography variant="h5" className={classes.letras} >
                    {"¿Que desea hacer con este usuario?"}
                    </Typography>
                    <Grid container justify="space-between" direction="row" alignItems="center">
                     
                    <Grid item>

                    <Button
                      type="submit"
                      
                      variant="contained"
                      color="secondary"
                      className={classes.buttRED}
                      onClick={handleChangeP}
                    >
                        Eliminar

                    </Button>

                    </Grid>

                    <Grid item>
                    <Button
                      type="submit"
                      
                      variant="contained"
                      color="secondary"
                      className={classes.buttBLUE}
                      onClick={handleChangeQ}
                    >
                      Modificar

                    </Button>

                    </Grid>
                    </Grid>

                    </Grid>
                    
                  </DialogContent>
                </Dialog>
        </Grid>

        <Grid >
                <Dialog open={openX} onClose={handleChangeX}>
                <DialogContent >
                    <Grid container justify="center" direction="column" alignItems="center">
                  <img src={check} alt="Sidebar media" width='60%'/>
                    <Typography variant="h5" color="primary" >
                    {correct}
                    </Typography>
                    </Grid>
                    
                  </DialogContent>
                </Dialog>
        </Grid>
        


      <Grid container justify='center' alignItems='center' >
      <StyledCard className={classes.list}>
        <CardContent>
        <Grid container justify="center" direction="column" alignItems="center">
  <Grid item >
    <Typography component="h1" variant="h5">
    Administrar usuarios
  </Typography>
  </Grid>
  <Grid item >
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
    </Avatar>
  </Grid>   

      <Grid item>
      <Autocomplete
        id="users-select-demo"

        options={data}
        getOptionLabel={(option: any) => option}
        style={{ width: 800 }}
        onChange={(event: any, newValue: string | null) => {
          setValueEmail(newValue);
        }}
        renderInput={(params: any) =>
          <TextField {...params} onChange={(ev) => setEmail(ev.target.value)} label="Buscador de usuarios" variant="outlined" />
      }
    />
      </Grid>

        {(valueEmail == null) &&
        <Grid item>
          
        <Typography>
          <DataList data={data} />
        </Typography>

        </Grid>
}

{!(valueEmail == null) &&
        <Grid item>
          
        <Typography>
        <ListItem className={classes.buttList} button onClick={() => handleChangeL(valueEmail)}>{valueEmail}</ListItem>
        </Typography>

        </Grid>
}

        


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

    
    </Grid>

        </CardContent>
      </StyledCard>
          
      </Grid>
      
    </Grid>
  );

}



export default Administrador
