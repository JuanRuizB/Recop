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
import {useFirebaseApp, useUser} from 'reactfire'
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StyledCard = styled(Card)`
  
margin-top: 10px;
margin-bottom: 10px;
min-height: 150px;
height: 580px;
  
`

const Segundo = () => {
  const classes = useStyles();
  const [bool2, setBool2] = useState(true);
  const [asignaturasCod, setAsignaturasCod] = useState<string[]>([""]);
  
  const [asignaturasNom, setAsignaturasNom] = useState<string[]>([""]);

  const firebase = useFirebaseApp();
  var userKey = useUser<firebase.User>();

  if(bool2 === true){

    firebase.database().ref('users/' + userKey.uid + '/grado').once('value').then(function(snapshot)
    {
        var grado = snapshot.val() || '';
      

        firebase.database().ref('users/' + userKey.uid + '/universidad').once('value').then(function(snapshot)
    {
        var universidad = snapshot.val() || '';
        firebase.database().ref('asignaturas/'+ universidad + '/' + grado + '/codigosSegundo/').once('value').then(function(snapshot)
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
        setBool2(false);
    });

    });

    });


    
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
  <Grid item >
  <Typography  variant="h6" color="textSecondary" component="p">
              Por favor rellena todos los datos de las asignaturas que hayas cursado, 
              
              </Typography>
              <Typography  variant="h6" color="textSecondary" component="p">
              si hay algunas que no hayas cursado, pon los datos a 0.
              </Typography>
              </Grid>  

  {(bool2 === true) &&
   <>
   <Backdrop className={classes.backdrop} open={bool2}>
           <CircularProgress color="inherit" />
         </Backdrop>
   
         </>


  }
      
       
    {(bool2 === false) &&
      <>
    <Asignatura id={asignaturasCod[0]} nombre={asignaturasNom[0]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[1]} nombre={asignaturasNom[1]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[2]} nombre={asignaturasNom[2]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[3]} nombre={asignaturasNom[3]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[4]} nombre={asignaturasNom[4]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[5]} nombre={asignaturasNom[5]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[6]} nombre={asignaturasNom[6]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[7]} nombre={asignaturasNom[7]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[8]} nombre={asignaturasNom[8]} curso={"segundo"} />
    <Asignatura id={asignaturasCod[9]} nombre={asignaturasNom[9]} curso={"segundo"} />
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
